import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthEntity } from "./auth/auth.entity";
import { AuthModule } from "./auth/auth.module";




@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [AuthEntity],
                synchronize : true
            })
        }),
        AuthModule
    ],
    controllers: [],
    providers: []
})

export class AppModule {

}