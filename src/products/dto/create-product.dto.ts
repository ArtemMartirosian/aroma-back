import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  FragranceType,
  Longevity,
  ProductGender,
  Sillage,
} from '../entities/product.entity';

class ProductVariantDto {
  @IsString()
  volume!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  oldPrice?: number;

  @IsBoolean()
  isAvailable!: boolean;

  @IsString()
  stockStatus!: string;
}

export class CreateProductDto {
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  slug?: string;

  @IsString()
  brandId!: string;

  @IsString()
  categoryId!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  oldPrice?: number;

  @IsString()
  volume!: string;

  @IsEnum(ProductGender)
  gender!: ProductGender;

  @IsEnum(FragranceType)
  fragranceType!: FragranceType;

  @IsString()
  description!: string;

  @IsString()
  shortDescription!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mainImage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stockStatus?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  topNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  middleNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  baseNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Longevity)
  longevity?: Longevity;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Sillage)
  sillage?: Sillage;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  concentration?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  releaseYear?: number;

  @ApiPropertyOptional({
    example: [
      {
        volume: '20ml',
        price: 18000,
        isAvailable: true,
        stockStatus: 'В наличии',
      },
      {
        volume: '50ml',
        price: 39000,
        isAvailable: true,
        stockStatus: 'В наличии',
      },
      {
        volume: '100ml',
        price: 59000,
        isAvailable: false,
        stockStatus: 'Нет в наличии',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  variants?: ProductVariantDto[];
}
