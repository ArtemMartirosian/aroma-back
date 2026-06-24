import {
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { FragranceType, ProductGender } from '../entities/product.entity';

export enum ProductSort {
    New = 'new',
    PriceAsc = 'price_asc',
    PriceDesc = 'price_desc',
    Popular = 'popular',
}

export class ProductQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsEnum(ProductGender)
    gender?: ProductGender;

    @IsOptional()
    @IsEnum(FragranceType)
    type?: FragranceType;

    @IsOptional()
    @IsString()
    volume?: string;

    @IsOptional()
    @IsNumber()
    minPrice?: number;

    @IsOptional()
    @IsNumber()
    maxPrice?: number;

    @IsOptional()
    @IsEnum(ProductSort)
    sort?: ProductSort;

    @IsOptional()
    @IsNumber()
    @Min(1)
    page = 1;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    limit = 12;
}
