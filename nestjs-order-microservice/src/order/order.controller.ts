import { Controller, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOrderResponse, ORDER_SERVICE_NAME } from './proto/order.pb';
import { CreateOrderRequestDto } from './order.dto';

@Controller()
export class OrderController {
    constructor(
        @Inject(OrderService)
        private orderService : OrderService
    ){}

    @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
    async createOrder(data : CreateOrderRequestDto) : Promise<CreateOrderResponse>{
        return this.orderService.createOrder(data)
    }
}
