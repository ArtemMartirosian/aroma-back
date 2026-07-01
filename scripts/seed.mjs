const API_URL = process.env.SEED_API_URL ?? 'http://localhost:4000/api';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@aroma.local';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin12345';
const IMAGE_URL = '/images/perfume-hero.png';

const brands = [
  {
    name: 'Dior',
    slug: 'dior',
    logo: 'DI',
    image: IMAGE_URL,
    description: 'Французский модный дом с культовыми свежими и цветочными ароматами.',
  },
  {
    name: 'Chanel',
    slug: 'chanel',
    logo: 'CH',
    image: IMAGE_URL,
    description: 'Классика французской парфюмерии: элегантные композиции и строгие флаконы.',
  },
  {
    name: 'Tom Ford',
    slug: 'tom-ford',
    logo: 'TF',
    image: IMAGE_URL,
    description: 'Выразительные композиции с древесными, пряными и восточными акцентами.',
  },
  {
    name: 'Byredo',
    slug: 'byredo',
    logo: 'BY',
    image: IMAGE_URL,
    description: 'Современная нишевая парфюмерия с минималистичной эстетикой.',
  },
  {
    name: 'Maison Francis Kurkdjian',
    slug: 'maison-francis-kurkdjian',
    logo: 'MFK',
    image: IMAGE_URL,
    description: 'Французский нишевый дом с узнаваемыми люксовыми ароматами.',
  },
  {
    name: 'Creed',
    slug: 'creed',
    logo: 'CR',
    image: IMAGE_URL,
    description: 'Парфюмерный дом с богатыми цитрусовыми, фруктовыми и древесными композициями.',
  },
  {
    name: 'Yves Saint Laurent',
    slug: 'yves-saint-laurent',
    logo: 'YSL',
    image: IMAGE_URL,
    description: 'Смелые, модные и запоминающиеся ароматы для современной аудитории.',
  },
  {
    name: 'Gucci',
    slug: 'gucci',
    logo: 'GC',
    image: IMAGE_URL,
    description: 'Итальянская эстетика, цветочные букеты и выразительная подача.',
  },
  {
    name: 'Versace',
    slug: 'versace',
    logo: 'VE',
    image: IMAGE_URL,
    description: 'Яркие средиземноморские ароматы с энергичным характером.',
  },
];

const categories = [
  {
    name: 'Мужская парфюмерия',
    slug: 'muzhskaya-parfyumeriya',
    description: 'Свежие, древесные и пряные ароматы для мужского гардероба.',
    image: IMAGE_URL,
  },
  {
    name: 'Женская парфюмерия',
    slug: 'zhenskaya-parfyumeriya',
    description: 'Цветочные, сладкие, пудровые и восточные композиции.',
    image: IMAGE_URL,
  },
  {
    name: 'Унисекс',
    slug: 'unisex',
    description: 'Ароматы без строгого деления: чистые, древесные, амбровые и свежие.',
    image: IMAGE_URL,
  },
  {
    name: 'Нишевая парфюмерия',
    slug: 'nishevaya-parfyumeriya',
    description: 'Выразительные композиции с необычными нотами и высокой концентрацией.',
    image: IMAGE_URL,
  },
  {
    name: 'Подарочные наборы',
    slug: 'podarochnye-nabory',
    description: 'Готовые решения для подарка и знакомства с брендом.',
    image: IMAGE_URL,
  },
];

const PRODUCT_IMAGE_BY_SLUG = {
  'dior-sauvage-eau-de-parfum-100ml': '/images/products/perfume-card-6.png',
  'bleu-de-chanel-eau-de-parfum-100ml': '/images/products/perfume-card-3.png',
  'chanel-coco-mademoiselle-eau-de-parfum-100ml': '/images/products/perfume-card-4.png',
  'dior-jadore-eau-de-parfum-100ml': '/images/products/perfume-card-5.png',
  'tom-ford-tobacco-vanille-eau-de-parfum-50ml': '/images/products/perfume-card-1.png',
  'tom-ford-oud-wood-eau-de-parfum-50ml': '/images/products/perfume-card-6.png',
  'byredo-gypsy-water-eau-de-parfum-100ml': '/images/products/perfume-card-2.png',
  'maison-francis-kurkdjian-baccarat-rouge-540-eau-de-parfum-70ml': '/images/products/perfume-card-4.png',
  'creed-aventus-eau-de-parfum-100ml': '/images/products/perfume-card-3.png',
  'yves-saint-laurent-libre-eau-de-parfum-90ml': '/images/products/perfume-card-5.png',
  'gucci-bloom-eau-de-parfum-100ml': '/images/products/perfume-card-2.png',
  'versace-eros-eau-de-toilette-100ml': '/images/products/perfume-card-1.png',
};

const PRODUCT_IMAGES = [
  '/images/products/perfume-card-1.png',
  '/images/products/perfume-card-2.png',
  '/images/products/perfume-card-3.png',
  '/images/products/perfume-card-4.png',
  '/images/products/perfume-card-5.png',
  '/images/products/perfume-card-6.png',
];

const products = [
  {
    name: 'Dior Sauvage Eau de Parfum',
    slug: 'dior-sauvage-eau-de-parfum-100ml',
    brand: 'dior',
    category: 'muzhskaya-parfyumeriya',
    price: 59000,
    oldPrice: 65000,
    volume: '100ml',
    gender: 'male',
    fragranceType: 'fresh',
    description:
      'Dior Sauvage Eau de Parfum раскрывается свежим бергамотом, пряным сердцем и теплой амброво-древесной базой. Универсальный мужской аромат на каждый день и вечер.',
    topNotes: 'бергамот, перец',
    middleNotes: 'лаванда, звездчатый анис, мускатный орех',
    baseNotes: 'амброксан, ваниль, кедр',
    longevity: 'high',
    sillage: 'strong',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2018,
    isFeatured: true,
    isNew: false,
  },
  {
    name: 'Bleu de Chanel Eau de Parfum',
    slug: 'bleu-de-chanel-eau-de-parfum-100ml',
    brand: 'chanel',
    category: 'muzhskaya-parfyumeriya',
    price: 68000,
    volume: '100ml',
    gender: 'male',
    fragranceType: 'woody',
    description:
      'Bleu de Chanel Eau de Parfum сочетает цитрусовую свежесть, ароматические акценты и элегантную древесную базу. Сдержанный, статусный и очень носибельный аромат.',
    topNotes: 'грейпфрут, лимон, мята',
    middleNotes: 'имбирь, жасмин, мускатный орех',
    baseNotes: 'сандал, кедр, ладан, пачули',
    longevity: 'high',
    sillage: 'medium',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2014,
    isFeatured: true,
    isNew: false,
  },
  {
    name: 'Chanel Coco Mademoiselle Eau de Parfum',
    slug: 'chanel-coco-mademoiselle-eau-de-parfum-100ml',
    brand: 'chanel',
    category: 'zhenskaya-parfyumeriya',
    price: 72000,
    volume: '100ml',
    gender: 'female',
    fragranceType: 'oriental',
    description:
      'Coco Mademoiselle Eau de Parfum — яркая женственная композиция с цитрусовым стартом, цветочным сердцем и теплой базой из пачули, ванили и мускуса.',
    topNotes: 'апельсин, мандарин, бергамот',
    middleNotes: 'роза, жасмин, иланг-иланг',
    baseNotes: 'пачули, ветивер, ваниль, белый мускус',
    longevity: 'very_high',
    sillage: 'strong',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2001,
    isFeatured: true,
    isNew: false,
  },
  {
    name: "Dior J'adore Eau de Parfum",
    slug: 'dior-jadore-eau-de-parfum-100ml',
    brand: 'dior',
    category: 'zhenskaya-parfyumeriya',
    price: 64000,
    volume: '100ml',
    gender: 'female',
    fragranceType: 'floral',
    description:
      "J'adore Eau de Parfum — узнаваемый женский аромат Dior с богатым цветочным сердцем, сияющим характером и мягким шлейфом.",
    topNotes: 'магнолия, дыня, груша',
    middleNotes: 'жасмин, роза, фрезия, орхидея',
    baseNotes: 'мускус, ваниль, кедр',
    longevity: 'high',
    sillage: 'medium',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 1999,
    isFeatured: false,
    isNew: false,
  },
  {
    name: 'Tom Ford Tobacco Vanille Eau de Parfum',
    slug: 'tom-ford-tobacco-vanille-eau-de-parfum-50ml',
    brand: 'tom-ford',
    category: 'nishevaya-parfyumeriya',
    price: 118000,
    volume: '50ml',
    gender: 'unisex',
    fragranceType: 'sweet',
    description:
      'Tobacco Vanille — густой восточно-пряный аромат Tom Ford Private Blend с табаком, ванилью, какао и сладкими сухофруктами.',
    topNotes: 'табачный лист, пряности',
    middleNotes: 'ваниль, какао, бобы тонка',
    baseNotes: 'сухофрукты, древесные ноты',
    longevity: 'very_high',
    sillage: 'very_strong',
    concentration: 'Eau de Parfum',
    country: 'USA',
    releaseYear: 2007,
    isFeatured: true,
    isNew: false,
  },
  {
    name: 'Tom Ford Oud Wood Eau de Parfum',
    slug: 'tom-ford-oud-wood-eau-de-parfum-50ml',
    brand: 'tom-ford',
    category: 'nishevaya-parfyumeriya',
    price: 112000,
    volume: '50ml',
    gender: 'unisex',
    fragranceType: 'woody',
    description:
      'Oud Wood — один из самых узнаваемых древесных ароматов Tom Ford: сухой уд, пряный кардамон, сандал и мягкая ваниль.',
    topNotes: 'кардамон, розовое дерево',
    middleNotes: 'уд, сандал, ветивер',
    baseNotes: 'ваниль, бобы тонка, амбра',
    longevity: 'high',
    sillage: 'medium',
    concentration: 'Eau de Parfum',
    country: 'USA',
    releaseYear: 2007,
    isFeatured: true,
    isNew: false,
  },
  {
    name: 'Byredo Gypsy Water Eau de Parfum',
    slug: 'byredo-gypsy-water-eau-de-parfum-100ml',
    brand: 'byredo',
    category: 'unisex',
    price: 89000,
    volume: '100ml',
    gender: 'unisex',
    fragranceType: 'woody',
    description:
      'Gypsy Water — прозрачный древесно-ароматический унисекс аромат Byredo с цитрусами, можжевельником, хвоей, ладаном и ванильной базой.',
    topNotes: 'бергамот, лимон, перец, можжевельник',
    middleNotes: 'ладан, хвоя, ирис',
    baseNotes: 'ваниль, сандал, амбра',
    longevity: 'medium',
    sillage: 'soft',
    concentration: 'Eau de Parfum',
    country: 'Sweden',
    releaseYear: 2008,
    isFeatured: false,
    isNew: true,
  },
  {
    name: 'Maison Francis Kurkdjian Baccarat Rouge 540 Eau de Parfum',
    slug: 'maison-francis-kurkdjian-baccarat-rouge-540-eau-de-parfum-70ml',
    brand: 'maison-francis-kurkdjian',
    category: 'nishevaya-parfyumeriya',
    price: 155000,
    volume: '70ml',
    gender: 'unisex',
    fragranceType: 'sweet',
    description:
      'Baccarat Rouge 540 Eau de Parfum — яркий унисекс аромат с шафраном, жасмином, амбровым аккордом и кедровой базой.',
    topNotes: 'шафран, жасмин',
    middleNotes: 'амбервуд, амбра',
    baseNotes: 'кедр, еловая смола',
    longevity: 'very_high',
    sillage: 'very_strong',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2015,
    isFeatured: true,
    isNew: false,
  },
  {
    name: 'Creed Aventus Eau de Parfum',
    slug: 'creed-aventus-eau-de-parfum-100ml',
    brand: 'creed',
    category: 'muzhskaya-parfyumeriya',
    price: 168000,
    volume: '100ml',
    gender: 'male',
    fragranceType: 'fresh',
    description:
      'Aventus — известный фруктово-древесный мужской аромат Creed с ананасом, бергамотом, дымной березой, мускусом и дубовым мхом.',
    topNotes: 'ананас, бергамот, черная смородина, яблоко',
    middleNotes: 'береза, пачули, жасмин, роза',
    baseNotes: 'мускус, дубовый мох, ваниль, амбра',
    longevity: 'high',
    sillage: 'strong',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2010,
    isFeatured: true,
    isNew: false,
  },
  {
    name: 'Yves Saint Laurent Libre Eau de Parfum',
    slug: 'yves-saint-laurent-libre-eau-de-parfum-90ml',
    brand: 'yves-saint-laurent',
    category: 'zhenskaya-parfyumeriya',
    price: 63000,
    volume: '90ml',
    gender: 'female',
    fragranceType: 'floral',
    description:
      'Libre Eau de Parfum — современный цветочно-лавандовый аромат YSL с апельсиновым цветом, ванилью и чистой мускусной базой.',
    topNotes: 'лаванда, мандарин, черная смородина',
    middleNotes: 'апельсиновый цвет, жасмин',
    baseNotes: 'ваниль, мускус, кедр, амбра',
    longevity: 'high',
    sillage: 'strong',
    concentration: 'Eau de Parfum',
    country: 'France',
    releaseYear: 2019,
    isFeatured: false,
    isNew: true,
  },
  {
    name: 'Gucci Bloom Eau de Parfum',
    slug: 'gucci-bloom-eau-de-parfum-100ml',
    brand: 'gucci',
    category: 'zhenskaya-parfyumeriya',
    price: 54000,
    volume: '100ml',
    gender: 'female',
    fragranceType: 'floral',
    description:
      'Gucci Bloom Eau de Parfum — насыщенный белоцветочный аромат с туберозой, жасмином и мягкой зеленой гранью.',
    topNotes: 'жасмин',
    middleNotes: 'тубероза',
    baseNotes: 'рангунская лиана, мускус',
    longevity: 'high',
    sillage: 'medium',
    concentration: 'Eau de Parfum',
    country: 'Italy',
    releaseYear: 2017,
    isFeatured: false,
    isNew: false,
  },
  {
    name: 'Versace Eros Eau de Toilette',
    slug: 'versace-eros-eau-de-toilette-100ml',
    brand: 'versace',
    category: 'muzhskaya-parfyumeriya',
    price: 45000,
    oldPrice: 52000,
    volume: '100ml',
    gender: 'male',
    fragranceType: 'fresh',
    description:
      'Versace Eros Eau de Toilette — яркий свежий мужской аромат с мятой, зеленым яблоком, лимоном, бобами тонка и ванилью.',
    topNotes: 'мята, зеленое яблоко, лимон',
    middleNotes: 'бобы тонка, амброксан, герань',
    baseNotes: 'ваниль, кедр, ветивер, дубовый мох',
    longevity: 'high',
    sillage: 'strong',
    concentration: 'Eau de Toilette',
    country: 'Italy',
    releaseYear: 2012,
    isFeatured: false,
    isNew: true,
  },
];

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${options.method ?? 'GET'} ${path} failed: ${response.status} ${body}`);
  }

  return response.json();
}

function buildVariants(product) {
  const price = Number(product.price);
  const productImage = PRODUCT_IMAGE_BY_SLUG[product.slug] ?? IMAGE_URL;
  const baseIndex = Math.max(PRODUCT_IMAGES.indexOf(productImage), 0);
  const pickImages = (offset) => [
    PRODUCT_IMAGES[(baseIndex + offset) % PRODUCT_IMAGES.length],
    PRODUCT_IMAGES[(baseIndex + offset + 1) % PRODUCT_IMAGES.length],
  ];

  return [
    {
      volume: '20ml',
      price: Math.round(price * 0.42),
      images: pickImages(0),
    },
    {
      volume: '50ml',
      price: Math.round(price * 0.72),
      images: pickImages(2),
    },
    {
      volume: product.volume || '100ml',
      price,
      oldPrice: product.oldPrice,
      images: pickImages(4),
    },
  ];
}

async function main() {
  const { accessToken } = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  const existingBrands = await request('/admin/brands', { token: accessToken });
  const brandBySlug = new Map(existingBrands.map((brand) => [brand.slug, brand]));
  for (const brand of brands) {
    if (!brandBySlug.has(brand.slug)) {
      const created = await request('/admin/brands', {
        method: 'POST',
        token: accessToken,
        body: JSON.stringify({ ...brand, isActive: true }),
      });
      brandBySlug.set(created.slug, created);
      console.log(`Created brand: ${created.name}`);
    } else {
      const existingBrand = brandBySlug.get(brand.slug);
      if (!existingBrand.image || existingBrand.image !== brand.image) {
        const updated = await request(`/admin/brands/${existingBrand.id}`, {
          method: 'PATCH',
          token: accessToken,
          body: JSON.stringify({ image: brand.image, logo: brand.logo }),
        });
        brandBySlug.set(updated.slug, updated);
        console.log(`Updated brand image: ${updated.name}`);
      }
    }
  }

  const existingCategories = await request('/admin/categories', { token: accessToken });
  const categoryBySlug = new Map(existingCategories.map((category) => [category.slug, category]));
  for (const category of categories) {
    if (!categoryBySlug.has(category.slug)) {
      const created = await request('/admin/categories', {
        method: 'POST',
        token: accessToken,
        body: JSON.stringify({ ...category, isActive: true }),
      });
      categoryBySlug.set(created.slug, created);
      console.log(`Created category: ${created.name}`);
    }
  }

  const existingProducts = await request('/admin/products?limit=100', { token: accessToken });
  const productBySlug = new Map(existingProducts.items.map((product) => [product.slug, product]));
  for (const product of products) {
    const brand = brandBySlug.get(product.brand);
    const category = categoryBySlug.get(product.category);
    if (!brand || !category) {
      throw new Error(`Missing brand/category for ${product.name}`);
    }

    const { brand: _brand, category: _category, ...payload } = product;
    const existingProduct = productBySlug.get(product.slug);
    if (existingProduct) {
      const needsVariants =
        !existingProduct.variants?.length ||
        existingProduct.variants.some((variant) => !variant.images?.length);

      if (!needsVariants) continue;

      const updated = await request(`/admin/products/${existingProduct.id}`, {
        method: 'PATCH',
        token: accessToken,
        body: JSON.stringify({
          variants: buildVariants(product),
        }),
      });
      productBySlug.set(updated.slug, updated);
      console.log(`Updated product: ${updated.name}`);
      continue;
    }

    const created = await request('/admin/products', {
      method: 'POST',
      token: accessToken,
      body: JSON.stringify({
        ...payload,
        brandId: brand.id,
        categoryId: category.id,
        variants: buildVariants(product),
        isActive: true,
      }),
    });
    productBySlug.set(created.slug, created);
    console.log(`Created product: ${created.name}`);
  }

  const totals = await request('/products?limit=100');
  console.log(`Seed complete. Products in catalog: ${totals.meta.total}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
