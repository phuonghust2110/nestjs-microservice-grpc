import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductRequestDto, DecreaseStockRequestDto, FineOneRequestDto } from 'src/product/product.dto';
import { CreateProductRequest, CreateProductResponse, DecreaseStockResponse, FindOneResponse } from './product.pb';
import { StockDecreaseLog } from './entity/stock-decrease-log.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(StockDecreaseLog)
        private readonly decreaseLogRepository : Repository<StockDecreaseLog>
    ) { }

    async findOne({ id }: FineOneRequestDto): Promise<FindOneResponse> {
        const product: Product = await this.productRepository.findOne({ where: { id: id } });

        if (!product) {
            return { data: null, error: ["Product not found"], status: HttpStatus.NOT_FOUND };
        }

        return { data: product, error: null, status: HttpStatus.OK }
    }

    async creatProduct (payload : CreateProductRequestDto) : Promise<CreateProductResponse>{
        const product : Product = new Product();

        product.name  = payload.name;
        product.sku = payload.sku;
        product.stock = payload.stock;
        product.price = payload.price
        await this.productRepository.save(product)
        return {id : product.id, error : null, status : HttpStatus.OK}
    }

    async decreaseStock ({id, orderId} : DecreaseStockRequestDto) : Promise<DecreaseStockResponse> {
        const product : Product = await this.productRepository.findOne({select : ['id', 'stock'], where : {id}});
        if(!product)
        return {error : ["Product not found"], status : HttpStatus.NOT_FOUND};
        else if(product.stock <=0) {
            return {error : ['Stock to low'], status : HttpStatus.CONFLICT};
        }

        const isAlreadyDecreased : number = await this.decreaseLogRepository.count({where : {orderId}})

        if(isAlreadyDecreased)
        return {error : ['Stock already decreased'], status : HttpStatus.CONFLICT}

        await this.productRepository.update(product.id, {stock : product.stock -1 });
        await this.decreaseLogRepository.insert({product, orderId});
        
        return {error : null , status : HttpStatus.OK}
    }


}

