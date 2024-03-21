import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Repository } from '@models/repository.model';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }
}
