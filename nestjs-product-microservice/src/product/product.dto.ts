import { IsNotEmpty, IsNumber, IsString } from "@nestjs/class-validator";
import { CreateProductRequest, DecreaseStockRequest,FindOneRequest} from "./product.pb";

export class CreateProductRequestDto implements CreateProductRequest {
    @IsString()
    @IsNotEmpty()
    public readonly name : string;

    @IsString()
    @IsNotEmpty()
    public readonly sku : string;

    @IsNumber({allowInfinity : false, allowNaN : false})
    public readonly stock : number;

    @IsNumber({allowInfinity : false, allowNaN : false})
    public readonly price : number;

}
export class DecreaseStockRequestDto implements DecreaseStockRequest {
    @IsNumber({allowInfinity : false, allowNaN : false})
    public  id : number;

    @IsNumber({allowInfinity : false, allowNaN : false})
    public  orderId : number;

}

export class FineOneRequestDto implements FindOneRequest{
    @IsNumber({allowInfinity : false , allowNaN : false})
    public readonly id : number;
}
