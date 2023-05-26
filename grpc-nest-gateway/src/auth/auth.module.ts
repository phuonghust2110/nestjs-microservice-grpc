import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, protobufPackage } from './auth.pb';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  imports : [
    JwtModule.register({
      secret : "iloveyou",
      signOptions : {expiresIn : "1h"}
    }),
    ClientsModule.register([
      {
        name : AUTH_SERVICE_NAME, 
        transport : Transport.GRPC,
        options : {
          url : "0.0.0.0:50051",
          package : AUTH_PACKAGE_NAME, 
          protoPath : 'node_modules/grpc-nest-proto/proto/auth.proto'
        }

      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports : [AuthService, AuthGuard]
})
export class AuthModule {}
