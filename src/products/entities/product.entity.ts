import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductGender {
  Male = 'male',
  Female = 'female',
  Unisex = 'unisex',
}

export enum FragranceType {
  Woody = 'woody',
  Floral = 'floral',
  Citrus = 'citrus',
  Oriental = 'oriental',
  Fresh = 'fresh',
  Sweet = 'sweet',
  Spicy = 'spicy',
}

export enum Longevity {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  VeryHigh = 'very_high',
}

export enum Sillage {
  Soft = 'soft',
  Medium = 'medium',
  Strong = 'strong',
  VeryStrong = 'very_strong',
}

export type ProductVariant = {
  volume: string;
  price: number;
  oldPrice?: number;
  isAvailable: boolean;
  stockStatus: string;
};

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column()
  brandId!: string;

  @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
  @JoinColumn({ name: 'brandId' })
  brand!: Brand;

  @Column()
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category!: Category;

  @Column('numeric', { precision: 12, scale: 2 })
  price!: string;

  @Column('numeric', { precision: 12, scale: 2, nullable: true })
  oldPrice?: string;

  @Column()
  volume!: string;

  @Column({ type: 'enum', enum: ProductGender })
  gender!: ProductGender;

  @Column({ type: 'enum', enum: FragranceType })
  fragranceType!: FragranceType;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'text' })
  shortDescription!: string;

  @Column({ nullable: true })
  mainImage?: string;

  @Column('text', { array: true, default: '{}' })
  galleryImages!: string[];

  @Column({ default: true })
  isAvailable!: boolean;

  @Column({ default: 'in_stock' })
  stockStatus!: string;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ default: false })
  isNew!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  topNotes?: string;

  @Column({ type: 'text', nullable: true })
  middleNotes?: string;

  @Column({ type: 'text', nullable: true })
  baseNotes?: string;

  @Column({ type: 'enum', enum: Longevity, nullable: true })
  longevity?: Longevity;

  @Column({ type: 'enum', enum: Sillage, nullable: true })
  sillage?: Sillage;

  @Column({ nullable: true })
  concentration?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: 'int', nullable: true })
  releaseYear?: number;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  variants!: ProductVariant[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
