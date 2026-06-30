import { BadRequestException } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(() => {
    controller = new ProductsController({} as ProductsService);
  });

  it('throws when upload is called without a file', () => {
    expect(() => controller.uploadImage()).toThrow(BadRequestException);
  });

  it('returns upload metadata for a valid file', () => {
    expect(controller.uploadImage({ filename: 'sample.png' })).toEqual({
      url: '/uploads/sample.png',
      filename: 'sample.png',
    });
  });
});
