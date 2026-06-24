import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify } from '../common/slug';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto, ProductSort } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductVariant } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async findAll(query: ProductQueryDto, includeInactive = false) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 12;
    const qb = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.category', 'category');

    if (!includeInactive)
      qb.andWhere('product.isActive = :isActive', { isActive: true });
    if (query.search) {
      qb.andWhere('LOWER(product.name) LIKE LOWER(:search)', {
        search: `%${query.search}%`,
      });
    }
    if (query.brand) qb.andWhere('brand.slug = :brand', { brand: query.brand });
    if (query.category)
      qb.andWhere('category.slug = :category', {
        category: query.category,
      });
    if (query.gender)
      qb.andWhere('product.gender = :gender', { gender: query.gender });
    if (query.type)
      qb.andWhere('product.fragranceType = :type', { type: query.type });
    if (query.volume) {
      qb.andWhere(
        '(product.volume = :volume OR product.variants @> CAST(:volumeVariant AS jsonb))',
        {
          volume: query.volume,
          volumeVariant: JSON.stringify([{ volume: query.volume }]),
        },
      );
    }
    if (query.minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', {
        minPrice: query.minPrice,
      });
    }
    if (query.maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', {
        maxPrice: query.maxPrice,
      });
    }

    switch (query.sort) {
      case ProductSort.PriceAsc:
        qb.orderBy('product.price', 'ASC');
        break;
      case ProductSort.PriceDesc:
        qb.orderBy('product.price', 'DESC');
        break;
      case ProductSort.Popular:
        qb.orderBy('product.isFeatured', 'DESC').addOrderBy(
          'product.createdAt',
          'DESC',
        );
        break;
      case ProductSort.New:
      default:
        qb.orderBy('product.createdAt', 'DESC');
    }

    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(slug: string) {
    const product = await this.productsRepository.findOne({
      where: { slug, isActive: true },
      relations: { brand: true, category: true },
    });
    if (!product) throw new NotFoundException('Product not found');

    const related = await this.productsRepository.find({
      where: {
        categoryId: product.categoryId,
        isActive: true,
      },
      relations: { brand: true, category: true },
      take: 4,
      order: { createdAt: 'DESC' },
    });

    return {
      ...product,
      relatedProducts: related.filter((item) => item.id !== product.id),
    };
  }

  async findById(id: string) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: { brand: true, category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  create(dto: CreateProductDto) {
    const variants = this.normalizeVariants(dto);
    const primaryVariant = this.getPrimaryVariant(variants);
    const product = this.productsRepository.create({
      ...dto,
      slug: dto.slug || slugify(dto.name),
      price: String(primaryVariant.price),
      oldPrice:
        primaryVariant.oldPrice === undefined
          ? dto.oldPrice === undefined
            ? undefined
            : String(dto.oldPrice)
          : String(primaryVariant.oldPrice),
      volume: primaryVariant.volume,
      isAvailable: primaryVariant.isAvailable,
      stockStatus: this.availabilityLabel(primaryVariant.isAvailable),
      variants,
      galleryImages: dto.galleryImages ?? [],
    });
    return this.productsRepository.save(product);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findById(id);
    const variants = this.normalizeVariants(dto, product);
    const primaryVariant = this.getPrimaryVariant(variants);
    Object.assign(product, dto, {
      slug: dto.slug || (dto.name ? slugify(dto.name) : product.slug),
      price: String(primaryVariant.price),
      oldPrice:
        primaryVariant.oldPrice === undefined
          ? dto.oldPrice === undefined
            ? product.oldPrice
            : String(dto.oldPrice)
          : String(primaryVariant.oldPrice),
      volume: primaryVariant.volume,
      isAvailable: primaryVariant.isAvailable,
      stockStatus: this.availabilityLabel(primaryVariant.isAvailable),
      variants,
      galleryImages: dto.galleryImages ?? product.galleryImages,
    });
    return this.productsRepository.save(product);
  }

  private normalizeVariants(
    dto: Partial<CreateProductDto>,
    existing?: Product,
  ): ProductVariant[] {
    const rawVariants = dto.variants?.length
      ? dto.variants
      : existing?.variants?.length
        ? existing.variants
        : [
            {
              volume: dto.volume ?? existing?.volume ?? '100ml',
              price: Number(dto.price ?? existing?.price ?? 0),
              oldPrice:
                dto.oldPrice === undefined && existing?.oldPrice === undefined
                  ? undefined
                  : Number(dto.oldPrice ?? existing?.oldPrice),
              isAvailable: dto.isAvailable ?? existing?.isAvailable ?? true,
              stockStatus: dto.stockStatus ?? existing?.stockStatus,
            },
          ];

    const variants = rawVariants
      .filter((variant) => variant.volume && Number(variant.price) >= 0)
      .map((variant) => ({
        volume: variant.volume,
        price: Number(variant.price),
        oldPrice:
          variant.oldPrice === undefined ? undefined : Number(variant.oldPrice),
        isAvailable: Boolean(variant.isAvailable),
        stockStatus: this.availabilityLabel(Boolean(variant.isAvailable)),
      }));

    return variants.length
      ? variants
      : [
          {
            volume: dto.volume ?? existing?.volume ?? '100ml',
            price: Number(dto.price ?? existing?.price ?? 0),
            oldPrice:
              dto.oldPrice === undefined && existing?.oldPrice === undefined
                ? undefined
                : Number(dto.oldPrice ?? existing?.oldPrice),
            isAvailable: dto.isAvailable ?? existing?.isAvailable ?? true,
            stockStatus: this.availabilityLabel(
              dto.isAvailable ?? existing?.isAvailable ?? true,
            ),
          },
        ];
  }

  private getPrimaryVariant(variants: ProductVariant[]) {
    return [...variants].sort((a, b) => Number(a.price) - Number(b.price))[0];
  }

  private availabilityLabel(isAvailable: boolean) {
    return isAvailable ? 'В наличии' : 'Нет в наличии';
  }

  async remove(id: string) {
    const product = await this.findById(id);
    await this.productsRepository.remove(product);
    return { ok: true };
  }

  async dashboard() {
    const [
      totalProducts,
      availableProducts,
      unavailableProducts,
      featuredProducts,
      newProducts,
    ] = await Promise.all([
      this.productsRepository.count(),
      this.productsRepository.count({ where: { isAvailable: true } }),
      this.productsRepository.count({ where: { isAvailable: false } }),
      this.productsRepository.count({ where: { isFeatured: true } }),
      this.productsRepository.count({ where: { isNew: true } }),
    ]);

    const latestProducts = await this.productsRepository.find({
      take: 6,
      order: { createdAt: 'DESC' },
      relations: { brand: true, category: true },
    });

    return {
      totalProducts,
      availableProducts,
      unavailableProducts,
      featuredProducts,
      newProducts,
      latestProducts,
    };
  }
}
