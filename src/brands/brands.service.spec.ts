import { BadRequestException, ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueryFailedError } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';

describe('BrandsService', () => {
  let service: BrandsService;
  let brandsRepository: {
    create: jest.Mock;
    save: jest.Mock;
    findOneBy: jest.Mock;
    remove: jest.Mock;
  };
  let productsRepository: {
    count: jest.Mock;
  };

  beforeEach(async () => {
    brandsRepository = {
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
        BrandsService,
        {
          provide: getRepositoryToken(Brand),
          useValue: brandsRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productsRepository,
        },
      ],
    }).compile();

    service = module.get(BrandsService);
  });

  it('prevents removing a brand that is still used by products', async () => {
    brandsRepository.findOneBy.mockResolvedValue({
      id: 'brand-1',
      name: 'Chanel',
    });
    productsRepository.count.mockResolvedValue(2);

    await expect(service.remove('brand-1')).rejects.toThrow(BadRequestException);
    expect(brandsRepository.remove).not.toHaveBeenCalled();
  });

  it('returns a conflict error for duplicate brand name or slug', async () => {
    const dto = { name: 'Chanel', slug: 'chanel' };
    brandsRepository.create.mockReturnValue(dto);
    brandsRepository.save.mockRejectedValue(
      new QueryFailedError('INSERT INTO brands', [], {
        code: '23505',
      }),
    );

    await expect(service.create(dto)).rejects.toThrow(ConflictException);
  });
});
