import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoriesRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOneBy: jest.Mock;
    remove: jest.Mock;
  };
  let productsRepository: {
    count: jest.Mock;
  };

  beforeEach(async () => {
    categoriesRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      remove: jest.fn(),
    };
    productsRepository = {
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: categoriesRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productsRepository,
        },
      ],
    }).compile();

    service = module.get(CategoriesService);
  });

  it('prevents removing a category that is still used by products', async () => {
    categoriesRepository.findOneBy.mockResolvedValue({
      id: 'category-1',
      name: 'Perfume',
      slug: 'perfume',
    });
    productsRepository.count.mockResolvedValue(3);

    await expect(service.remove('category-1')).rejects.toThrow(BadRequestException);
    expect(categoriesRepository.remove).not.toHaveBeenCalled();
  });

  it('returns a conflict error for duplicate category name or slug', async () => {
    const dto = { name: 'Cosmetics', slug: 'cosmetics-2' };
    categoriesRepository.create.mockReturnValue(dto);
    categoriesRepository.save.mockRejectedValue(
      new QueryFailedError('INSERT INTO categories', [], {
        code: '23505',
      }),
    );

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
  });
});
