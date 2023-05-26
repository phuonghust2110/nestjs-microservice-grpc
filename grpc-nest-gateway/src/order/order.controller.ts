import { Body, Controller, Inject, OnModuleInit, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderRequest, CreateOrderResponse, ORDER_SERVICE_NAME, OrderServiceClient } from './order.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from 'rxjs';


@Controller('order')
export class OrderController implements OnModuleInit {
    private svc : OrderServiceClient;

    @Inject(ORDER_SERVICE_NAME)
    private readonly client : ClientGrpc;

    public onModuleInit() {
        this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME)
    }

    @Post()
    // @UseGuards(AuthGuard)
    private async createOrder(@Body() body : CreateOrderRequest) : Promise<Observable<CreateOrderResponse>>{
       return this.svc.createOrder(body)
    }
}
