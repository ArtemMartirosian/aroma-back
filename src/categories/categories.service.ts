import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify } from '../common/slug';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

const PROTECTED_CATEGORY_SLUGS = new Set(['cosmetics', 'accessoires']);

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
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

  create(dto: CreateCategoryDto) {
    const category = this.categoriesRepository.create({
      ...dto,
      slug: dto.slug || slugify(dto.name),
    });
    return this.categoriesRepository.save(category);
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');

    const isProtectedCategory = PROTECTED_CATEGORY_SLUGS.has(category.slug);

    Object.assign(category, dto, {
      slug: isProtectedCategory
        ? category.slug
        : dto.slug || (dto.name ? slugify(dto.name) : category.slug),
    });
    return this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');

    if (PROTECTED_CATEGORY_SLUGS.has(category.slug)) {
      throw new BadRequestException('Protected category cannot be removed');
    }

    await this.categoriesRepository.remove(category);
    return { ok: true };
  }
}
