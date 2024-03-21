import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Repository } from '@models/repository.model';
import { ProductCartEntity } from './product-cart.entity';

@Injectable()
export class ProductCartRepository extends Repository<ProductCartEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductCartEntity, dataSource.createEntityManager());
  }
}
