import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { slugify } from '../common/slug';
import { Product } from '../products/entities/product.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

const PROTECTED_CATEGORY_SLUGS = new Set(['cosmetics', 'accessoires']);

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(includeInactive = false) {
    return this.categoriesRepository.find({
      where: includeInactive ? {} : { isActive: true },
      relations: { products: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(slug: string) {
    const category = await this.categoriesRepository.findOne({
      where: { slug, isActive: true },
      relations: { products: true },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async create(dto: CreateCategoryDto) {
    const category = this.categoriesRepository.create({
      ...dto,
      slug: dto.slug || slugify(this.getSlugSource(dto)),
    });

    try {
      return await this.categoriesRepository.save(category);
    } catch (error) {
      this.rethrowConstraintError(error, dto.name);
    }
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');

    const isProtectedCategory = PROTECTED_CATEGORY_SLUGS.has(category.slug);

    Object.assign(category, dto, {
      slug: isProtectedCategory
        ? category.slug
        : dto.slug ||
          (dto.name || dto.nameRu || dto.nameEn
            ? slugify(this.getSlugSource(dto, category))
            : category.slug),
    });
    try {
      return await this.categoriesRepository.save(category);
    } catch (error) {
      this.rethrowConstraintError(error, dto.name ?? category.name);
    }
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');

    if (PROTECTED_CATEGORY_SLUGS.has(category.slug)) {
      throw new BadRequestException('Protected category cannot be removed');
    }

    const productCount = await this.productsRepository.count({
      where: { categoryId: id },
    });
    if (productCount > 0) {
      throw new BadRequestException(
        `Cannot delete category "${category.name}" because ${productCount} product(s) still use it`,
      );
    }

    await this.categoriesRepository.remove(category);
    return { ok: true };
  }

  private rethrowConstraintError(error: unknown, fallbackName: string) {
    if (
      error instanceof QueryFailedError &&
      (error as QueryFailedError & { driverError?: { code?: string } }).driverError
        ?.code === '23505'
    ) {
      throw new ConflictException(
        `Category "${fallbackName}" already exists. Use a different name or slug.`,
      );
    }

    throw error;
  }

  private getSlugSource(dto: Partial<CreateCategoryDto>, existing?: Category) {
    return (
      dto.nameEn?.trim() ||
      dto.nameRu?.trim() ||
      dto.name?.trim() ||
      existing?.nameEn?.trim() ||
      existing?.nameRu?.trim() ||
      existing?.name?.trim() ||
      'category'
    );
  }
}
