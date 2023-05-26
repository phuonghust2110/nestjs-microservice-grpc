import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./auth.entity";
import { JwtStategy } from "./auth.stategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret : 'iloveyou',
        signOptions : {expiresIn : "1h"}
    }),
        TypeOrmModule.forFeature([AuthEntity])],
    providers: [AuthService, JwtStategy],
    controllers : [AuthController],
    exports: [AuthService]
})

export class AuthModule{

}