import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { slugify } from '../common/slug';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandsRepository: Repository<Brand>,
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

    create(dto: CreateBrandDto) {
        const brand = this.brandsRepository.create({
            ...dto,
            slug: dto.slug || slugify(dto.name),
        });
        return this.brandsRepository.save(brand);
    }

    async update(id: string, dto: UpdateBrandDto) {
        const brand = await this.brandsRepository.findOneBy({ id });
        if (!brand) throw new NotFoundException('Brand not found');
        Object.assign(brand, dto, {
            slug: dto.slug || (dto.name ? slugify(dto.name) : brand.slug),
        });
        return this.brandsRepository.save(brand);
    }

    async remove(id: string) {
        const brand = await this.brandsRepository.findOneBy({ id });
        if (!brand) throw new NotFoundException('Brand not found');
        await this.brandsRepository.remove(brand);
        return { ok: true };
    }
}
