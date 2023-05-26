import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockDecreaseLog } from './entity/stock-decrease-log.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Product, StockDecreaseLog])],
  controllers: [ProductController],
  providers: [ProductService],
  exports : [ProductService]
})
export class ProductModule {}
