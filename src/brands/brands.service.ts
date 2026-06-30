import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { slugify } from '../common/slug';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAll(includeInactive = false) {
    return this.brandsRepository.find({
      where: includeInactive ? {} : { isActive: true },
      relations: { products: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(slug: string) {
    const brand = await this.brandsRepository.findOne({
      where: { slug, isActive: true },
      relations: { products: true },
    });
    if (!brand) throw new NotFoundException('Brand not found');
    return brand;
  }

  async create(dto: CreateBrandDto) {
    const brand = this.brandsRepository.create({
      ...dto,
      slug: dto.slug || slugify(dto.name),
    });

    try {
      return await this.brandsRepository.save(brand);
    } catch (error) {
      this.rethrowConstraintError(error, dto.name);
    }
  }

  async update(id: string, dto: UpdateBrandDto) {
    const brand = await this.brandsRepository.findOneBy({ id });
    if (!brand) throw new NotFoundException('Brand not found');

    Object.assign(brand, dto, {
      slug: dto.slug || (dto.name ? slugify(dto.name) : brand.slug),
    });

    try {
      return await this.brandsRepository.save(brand);
    } catch (error) {
      this.rethrowConstraintError(error, dto.name ?? brand.name);
    }
  }

  async remove(id: string) {
    const brand = await this.brandsRepository.findOneBy({ id });
    if (!brand) throw new NotFoundException('Brand not found');

    const productCount = await this.productsRepository.count({
      where: { brandId: id },
    });
    if (productCount > 0) {
      throw new BadRequestException(
        `Cannot delete brand "${brand.name}" because ${productCount} product(s) still use it`,
      );
    }

    await this.brandsRepository.remove(brand);
    return { ok: true };
  }

  private rethrowConstraintError(error: unknown, fallbackName: string) {
    if (
      error instanceof QueryFailedError &&
      (error as QueryFailedError & { driverError?: { code?: string } }).driverError
        ?.code === '23505'
    ) {
      throw new ConflictException(
        `Brand "${fallbackName}" already exists. Use a different name or slug.`,
      );
    }

    throw error;
  }
}
