import { Controller, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductResponse, DecreaseStockResponse, FindOneRequest, FindOneResponse, PRODUCT_SERVICE_NAME } from './product.pb';
import { CreateProductRequestDto, DecreaseStockRequestDto, FineOneRequestDto } from './product.dto';

@Controller()
export class ProductController {
    constructor(
        @Inject(ProductService)
        private productService : ProductService
    ){}

    @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
    async createProduct(payload : CreateProductRequestDto): Promise<CreateProductResponse>{
        return this.productService.creatProduct(payload)
    }

    @GrpcMethod(PRODUCT_SERVICE_NAME, "DecreaseStock")
    async decreaseStock(payload : DecreaseStockRequestDto) : Promise<DecreaseStockResponse>{
        return this.productService.decreaseStock(payload)
    }

    @GrpcMethod(PRODUCT_SERVICE_NAME, "FindOne")
    async findOne(payload : FineOneRequestDto) : Promise<FindOneResponse>{
        return this.productService.findOne(payload)
    }
}
