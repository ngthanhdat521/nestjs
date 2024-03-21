import { Test, TestingModule } from '@nestjs/testing';
import { ProductCartController } from './product-cart.controller';

describe('ProductCartController', () => {
  let controller: ProductCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCartController],
    }).compile();

    controller = module.get<ProductCartController>(ProductCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
