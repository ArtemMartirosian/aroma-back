import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  FragranceType,
  Longevity,
  ProductGender,
  Sillage,
} from '../entities/product.entity';

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
}
