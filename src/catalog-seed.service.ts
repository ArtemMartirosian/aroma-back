import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brands/entities/brand.entity';
import { Category } from './categories/entities/category.entity';
import {
  FragranceType,
  Longevity,
  Product,
  ProductGender,
  Sillage,
} from './products/entities/product.entity';

type SeedBrand = Pick<
  Brand,
  'name' | 'slug' | 'logo' | 'image' | 'description' | 'isActive'
>;

type SeedCategory = Pick<
  Category,
  'name' | 'slug' | 'image' | 'description' | 'isActive'
>;

type SeedProduct = Omit<
  Product,
  'id' | 'brand' | 'category' | 'createdAt' | 'updatedAt'
>;

const seedBrands: SeedBrand[] = [
  {
    name: 'Chanel',
    slug: 'chanel',
    logo: 'CH',
    image: '/images/products/perfume-card-1.png',
    description:
      'Ֆրանսիական դասական՝ նուրբ էլեգանտությամբ, մաքուր գծերով և հավասարակշռված շլեյֆով։',
    isActive: true,
  },
  {
    name: 'Dior',
    slug: 'dior',
    logo: 'DI',
    image: '/images/perfume-hero-men-1.png',
    description:
      'Ժամանակակից լյուքս բույրեր՝ վառ բնավորությամբ, խորությամբ և վստահ ներկայությամբ։',
    isActive: true,
  },
  {
    name: 'Tom Ford',
    slug: 'tom-ford',
    logo: 'TF',
    image: '/images/perfume-hero-men-2.png',
    description:
      'Համարձակ, մուգ և շքեղ կոմպոզիցիաներ՝ ընդգծված փայտային ու արևելյան շեշտերով։',
    isActive: true,
  },
  {
    name: 'Byredo',
    slug: 'byredo',
    logo: 'BY',
    image: '/images/products/perfume-card-4.png',
    description:
      'Նիշային տրամադրություն՝ մաքուր, օդային և շատ ժամանակակից բույրային պատմություններով։',
    isActive: true,
  },
  {
    name: 'Maison Francis Kurkdjian',
    slug: 'maison-francis-kurkdjian',
    logo: 'MF',
    image: '/images/products/perfume-card-5.png',
    description:
      'Բարձր պերֆյումերիա՝ հարուստ շերտերով, թանկ հնչողությամբ և հիշվող աուրայով։',
    isActive: true,
  },
  {
    name: 'Yves Saint Laurent',
    slug: 'yves-saint-laurent',
    logo: 'YL',
    image: '/images/perfume-hero-women.png',
    description:
      'Սուր ոճ, նորաձեւ տրամադրություն և էլեգանտ բույրեր՝ ցերեկից մինչև երեկո։',
    isActive: true,
  },
];

const seedCategories: SeedCategory[] = [
  {
    name: 'Կանացի օծանելիք',
    slug: 'female-fragrances',
    description:
      'Նուրբ ծաղկային, մրգային և էլեգանտ կոմպոզիցիաներ ամեն օրվա ու երեկոյի համար։',
    image: '/images/products/perfume-card-1.png',
    isActive: true,
  },
  {
    name: 'Տղամարդու օծանելիք',
    slug: 'male-fragrances',
    description:
      'Փայտային, կծու և թարմ բույրեր ուժեղ ու հավաքված ներկայության համար։',
    image: '/images/perfume-hero-men-1.png',
    isActive: true,
  },
  {
    name: 'Ունիսեքս օծանելիք',
    slug: 'unisex-fragrances',
    description:
      'Ժամանակակից բույրեր առանց խիստ բաժանման՝ մաքուր, հարուստ և հիշվող շլեյֆով։',
    image: '/images/products/perfume-card-4.png',
    isActive: true,
  },
  {
    name: 'Նիշային օծանելիք',
    slug: 'niche-fragrances',
    description: 'Բարդ և արտահայտիչ կոմպոզիցիաներ նրանց համար, ովքեր ուզում են տարբերվել։',
    image: '/images/perfume-hero-men-2.png',
    isActive: true,
  },
  {
    name: 'Կոսմետիկա',
    slug: 'cosmetics',
    description: 'Խնամքի և գեղեցկության ընտրված միջոցներ ամենօրյա ռեժիմի համար։',
    image: '/images/products/perfume-card-2.png',
    isActive: true,
  },
  {
    name: 'Աքսեսուարներ',
    slug: 'accessoires',
    description:
      'Գեղեցկության և պահեստավորման էլեգանտ աքսեսուարներ՝ հարմար օգտագործման համար։',
    image: '/images/products/perfume-card-6.png',
    isActive: true,
  },
];

const seedProducts: SeedProduct[] = [
  {
    name: 'Chanel Coco Mademoiselle Eau de Parfum',
    slug: 'chanel-coco-mademoiselle-eau-de-parfum',
    brandId: 'chanel',
    categoryId: 'female-fragrances',
    price: '42000',
    oldPrice: '48000',
    volume: '35ml',
    gender: ProductGender.Female,
    fragranceType: FragranceType.Floral,
    description:
      'Թեթև ցիտրուսային բացումով և նուրբ պաչուլի-վարդային սրտով բույր, որը հնչում է մաքուր, կանացի և շատ հավաքված։',
    shortDescription: 'Կանացի, էլեգանտ և ժամանակակից ֆրանսիական դասական։',
    isFeatured: true,
    isNew: false,
    isActive: true,
    topNotes: 'Նարնջի կեղև, բերգամոտ',
    middleNotes: 'Վարդ, հասմիկ',
    baseNotes: 'Պաչուլի, սպիտակ մուշկ, վանիլ',
    longevity: Longevity.High,
    sillage: Sillage.Strong,
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2001,
    variants: [
      {
        volume: '35ml',
        price: 42000,
        oldPrice: 48000,
        images: ['/images/products/perfume-card-1.png', '/images/perfume-hero-women.png'],
      },
      {
        volume: '50ml',
        price: 56000,
        oldPrice: 62000,
        images: ['/images/products/perfume-card-2.png', '/images/products/perfume-card-1.png'],
      },
    ],
  },
  {
    name: 'Dior Sauvage Elixir',
    slug: 'dior-sauvage-elixir',
    brandId: 'dior',
    categoryId: 'male-fragrances',
    price: '46000',
    oldPrice: '52000',
    volume: '60ml',
    gender: ProductGender.Male,
    fragranceType: FragranceType.Spicy,
    description:
      'Հագեցած կծու և փայտային կոմպոզիցիա՝ թարմ բացումով ու խորը տաք հիմքով։ Համարձակ և երկարատև տարբերակ ամեն օրվա համար։',
    shortDescription: 'Խորը, ուժեղ և ժամանակակից արական բույր։',
    isFeatured: true,
    isNew: true,
    isActive: true,
    topNotes: 'Դարչին, գրեյպֆրուտ, մշկընկույզ',
    middleNotes: 'Լավանդա',
    baseNotes: 'Սաթ, լիկյորային փայտ, պաչուլի',
    longevity: Longevity.VeryHigh,
    sillage: Sillage.VeryStrong,
    concentration: 'Elixir',
    country: 'France',
    releaseYear: 2021,
    variants: [
      {
        volume: '60ml',
        price: 46000,
        oldPrice: 52000,
        images: ['/images/perfume-hero-men-1.png', '/images/perfume-hero-men-2.png'],
      },
    ],
  },
  {
    name: 'Tom Ford Oud Wood',
    slug: 'tom-ford-oud-wood',
    brandId: 'tom-ford',
    categoryId: 'unisex-fragrances',
    price: '64000',
    oldPrice: '72000',
    volume: '50ml',
    gender: ProductGender.Unisex,
    fragranceType: FragranceType.Woody,
    description: 'Մուգ, թանկ և շատ շքեղ փայտային բույր՝ ուդի, սանդալի ու տաք համեմունքների խորությամբ։',
    shortDescription: 'Շքեղ փայտային ունիսեքս՝ մուգ տրամադրությամբ։',
    isFeatured: true,
    isNew: false,
    isActive: true,
    topNotes: 'Էլայչի, վարդագույն պղպեղ',
    middleNotes: 'Ուդ, սանդալ',
    baseNotes: 'Սաթ, վետիվեր, տոնկա',
    longevity: Longevity.High,
    sillage: Sillage.Strong,
    concentration: 'Eau de Parfum',
    country: 'USA',
    releaseYear: 2007,
    variants: [
      {
        volume: '50ml',
        price: 64000,
        oldPrice: 72000,
        images: ['/images/perfume-hero-men-2.png', '/images/perfume-hero-men-1.png'],
      },
    ],
  },
  {
    name: 'Maison Francis Kurkdjian Baccarat Rouge 540',
    slug: 'maison-francis-kurkdjian-baccarat-rouge-540',
    brandId: 'maison-francis-kurkdjian',
    categoryId: 'niche-fragrances',
    price: '72000',
    oldPrice: '81000',
    volume: '35ml',
    gender: ProductGender.Unisex,
    fragranceType: FragranceType.Sweet,
    description:
      'Ամբրային-քաղցր նիշային բույր՝ շաքարային շողքով, թեթև ծխախոտային-փայտային խորությամբ և շատ հարուստ աուրայով։',
    shortDescription: 'Պաշտամունքային նիշային բույր՝ հարուստ ու ճանաչելի։',
    isFeatured: true,
    isNew: true,
    isActive: true,
    topNotes: 'Զաֆրան, հասմիկ',
    middleNotes: 'Ամբերգրիս',
    baseNotes: 'Մայրու փայտ, խեժ',
    longevity: Longevity.VeryHigh,
    sillage: Sillage.VeryStrong,
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2015,
    variants: [
      {
        volume: '35ml',
        price: 72000,
        oldPrice: 81000,
        images: ['/images/products/perfume-card-5.png', '/images/products/perfume-card-6.png'],
      },
      {
        volume: '70ml',
        price: 118000,
        oldPrice: 127000,
        images: ['/images/products/perfume-card-6.png', '/images/products/perfume-card-5.png'],
      },
    ],
  },
  {
    name: 'Yves Saint Laurent Libre Eau de Parfum',
    slug: 'yves-saint-laurent-libre-eau-de-parfum',
    brandId: 'yves-saint-laurent',
    categoryId: 'female-fragrances',
    price: '44600',
    oldPrice: '49800',
    volume: '30ml',
    gender: ProductGender.Female,
    fragranceType: FragranceType.Floral,
    description: 'Լավանդայի, հասմիկի և վանիլի գեղեցիկ հավասարակշռություն՝ շատ կանացի, մաքուր և վստահ տրամադրությամբ։',
    shortDescription: 'Ժամանակակից կանացի բույր՝ մաքուր ու էլեգանտ։',
    isFeatured: false,
    isNew: true,
    isActive: true,
    topNotes: 'Մանդարին, լավանդա',
    middleNotes: 'Հասմիկ, նարնջենու ծաղիկ',
    baseNotes: 'Վանիլ, մուշկ, մայրու փայտ',
    longevity: Longevity.High,
    sillage: Sillage.Strong,
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2019,
    variants: [
      {
        volume: '30ml',
        price: 44600,
        oldPrice: 49800,
        images: ['/images/products/perfume-card-2.png', '/images/perfume-hero-women.png'],
      },
    ],
  },
  {
    name: 'Chanel Hydra Beauty Cream',
    slug: 'chanel-hydra-beauty-cream',
    brandId: 'chanel',
    categoryId: 'cosmetics',
    price: '34800',
    oldPrice: '39000',
    volume: '50ml',
    gender: ProductGender.Female,
    description:
      'Խոնավեցնող դեմքի քսուք՝ թեթև հյուսվածքով, հարմար ամենօրյա խնամքի համար և գեղեցիկ, խնամված տեսքի զգացողությամբ։',
    shortDescription: 'Լյուքս խոնավեցնող քսուք՝ նուրբ ամենօրյա խնամքի համար։',
    isFeatured: false,
    isNew: true,
    isActive: true,
    country: 'France',
    releaseYear: 2024,
    variants: [
      {
        volume: '50ml',
        price: 34800,
        oldPrice: 39000,
        images: ['/images/products/perfume-card-2.png', '/images/products/perfume-card-3.png'],
      },
      {
        volume: '100ml',
        price: 61200,
        oldPrice: 68000,
        images: ['/images/products/perfume-card-3.png', '/images/products/perfume-card-2.png'],
      },
    ],
  },
  {
    name: 'Dior Lip Glow Oil',
    slug: 'dior-lip-glow-oil',
    brandId: 'dior',
    categoryId: 'cosmetics',
    price: '19600',
    oldPrice: '22400',
    volume: '1pc',
    gender: ProductGender.Female,
    description:
      'Շուրթերի խնամքի փայլ՝ փափուկ խնամքով, նուրբ փայլով և հարմար ամենօրյա beauty աքսենտի համար։',
    shortDescription: 'Խնամող շուրթերի փայլ՝ թեթև ու գեղեցիկ ավարտով։',
    isFeatured: true,
    isNew: true,
    isActive: true,
    country: 'France',
    releaseYear: 2024,
    variants: [
      {
        volume: '1pc',
        price: 19600,
        oldPrice: 22400,
        images: ['/images/products/perfume-card-4.png', '/images/products/perfume-card-2.png'],
      },
    ],
  },
  {
    name: 'Tom Ford Travel Case',
    slug: 'tom-ford-travel-case',
    brandId: 'tom-ford',
    categoryId: 'accessoires',
    price: '28400',
    oldPrice: '31800',
    volume: '1pc',
    gender: ProductGender.Unisex,
    description:
      'Էլեգանտ travel case՝ parfume կամ beauty essentials-ը հարմար և անվտանգ պահելու համար։',
    shortDescription: 'Պրեմիում ճանապարհային աքսեսուար՝ գեղեցիկ և գործնական։',
    isFeatured: false,
    isNew: true,
    isActive: true,
    country: 'USA',
    releaseYear: 2024,
    variants: [
      {
        volume: '1pc',
        price: 28400,
        oldPrice: 31800,
        images: ['/images/products/perfume-card-6.png', '/images/perfume-hero-men-2.png'],
      },
    ],
  },
  {
    name: 'Byredo Vanity Pouch',
    slug: 'byredo-vanity-pouch',
    brandId: 'byredo',
    categoryId: 'accessoires',
    price: '22800',
    oldPrice: '25900',
    volume: '1pc',
    gender: ProductGender.Unisex,
    description:
      'Մինիմալիստական pouch՝ cosmetics և փոքր աքսեսուարները կոկիկ պահելու ու ճանապարհին հետդ վերցնելու համար։',
    shortDescription: 'Նրբագեղ vanity pouch՝ cosmetics-ի և accessories-ի համար։',
    isFeatured: true,
    isNew: false,
    isActive: true,
    country: 'Sweden',
    releaseYear: 2023,
    variants: [
      {
        volume: '1pc',
        price: 22800,
        oldPrice: 25900,
        images: ['/images/products/perfume-card-5.png', '/images/products/perfume-card-6.png'],
      },
    ],
  },
];

@Injectable()
export class CatalogSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(CatalogSeedService.name);

  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async onApplicationBootstrap() {
    const brands = await this.seedBrands();
    const categories = await this.seedCategories();
    const productsCount = await this.productsRepository.count();

    if (productsCount === 0) {
      await this.seedProducts(brands, categories);
      this.logger.log('Demo catalog data seeded successfully');
    }
  }

  private async seedBrands() {
    const existing = await this.brandsRepository.find();
    const existingBySlug = new Set(existing.map((brand) => brand.slug));
    const missing = seedBrands.filter((brand) => !existingBySlug.has(brand.slug));

    if (missing.length) {
      await this.brandsRepository.save(this.brandsRepository.create(missing));
    }

    const saved = await this.brandsRepository.find();
    return new Map(saved.map((brand) => [brand.slug, brand]));
  }

  private async seedCategories() {
    const existing = await this.categoriesRepository.find();
    const existingBySlug = new Set(existing.map((category) => category.slug));
    const missing = seedCategories.filter(
      (category) => !existingBySlug.has(category.slug),
    );

    if (missing.length) {
      await this.categoriesRepository.save(
        this.categoriesRepository.create(missing),
      );
    }

    const saved = await this.categoriesRepository.find();
    return new Map(saved.map((category) => [category.slug, category]));
  }

  private async seedProducts(
    brands: Map<string, Brand>,
    categories: Map<string, Category>,
  ) {
    const items = seedProducts.map((product) =>
      this.productsRepository.create({
        ...product,
        brandId: brands.get(product.brandId)?.id ?? product.brandId,
        categoryId: categories.get(product.categoryId)?.id ?? product.categoryId,
      }),
    );

    await this.productsRepository.save(items);
  }
}
