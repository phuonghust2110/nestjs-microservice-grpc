import { Body, Controller, Get, Inject, OnModuleInit, Param, Post, UseGuards } from '@nestjs/common';
import { FindOneResponse, PRODUCT_SERVICE_NAME, ProductServiceClient } from './product.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductRequest } from './product.pb';
import { Observable } from 'rxjs';
import { CreateOrderResponse } from 'src/order/order.pb';

@Controller('product')
export class ProductController implements OnModuleInit{
    
    private svc: ProductServiceClient;
    @Inject(PRODUCT_SERVICE_NAME)
    private readonly client : ClientGrpc
    public onModuleInit() {
        this.svc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
    }

    @Post()
    // @UseGuards(AuthGuard)
    private async createProduct(@Body() body : CreateProductRequest) : Promise<Observable<CreateOrderResponse>>{
        return this.svc.createProduct(body)
    }

    @Get(':id')
    // @UseGuards(AuthGuard)
    private async findOne(@Param() id : number) : Promise<Observable<FindOneResponse>>{
        return this.svc.findOne({id})
    }
}
