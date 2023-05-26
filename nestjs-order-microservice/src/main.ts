import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { protobufPackage } from './order/proto/order.pb';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: "0.0.0.0:50052",
        package : protobufPackage,
        protoPath : "node_modules/grpc-nest-proto/proto/order.proto"

      }
    })
    app.useGlobalPipes(new ValidationPipe())

  await app.listen();
}
bootstrap();
