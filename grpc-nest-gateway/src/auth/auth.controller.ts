import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './auth.pb';
import { ClientGrpc } from '@nestjs/microservices';

import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController implements OnModuleInit {
private svc : AuthServiceClient
@Inject(AUTH_SERVICE_NAME)
private readonly client : ClientGrpc;

public onModuleInit() : void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);

}

@Post("register")
    public async register(@Body() body : RegisterRequest) : Promise<Observable<RegisterResponse>>{
        console.log(body)

        return this.svc.register(body)
    }

@Post("login")
    public async login(@Body() body : LoginRequest) : Promise<Observable<LoginResponse>>{
        return this.svc.login(body)
    }

}



