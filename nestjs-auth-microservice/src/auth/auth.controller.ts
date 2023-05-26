import { Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guard/auth.guard";
import { GrpcMethod } from "@nestjs/microservices";
import { LoginRequestDTO, RegisterRequestDTO, ValidateRequestDTO } from "./DTO/auth.dto";
import { AuthService } from "./auth.service";
import { AUTH_SERVICE_NAME, LoginResponse, RegisterResponse, ValidateResponse } from "./auth.pb";

@Controller()
export class AuthController{
    
    @Inject(AuthService) private authService : AuthService

    

    @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
    private register(payload : RegisterRequestDTO) : Promise<RegisterResponse> {
        return this.authService.register(payload)
    }

    @GrpcMethod(AUTH_SERVICE_NAME, "Login")
    private login(payload : LoginRequestDTO) : Promise<LoginResponse>{
        return this.authService.login(payload)
    }

    @GrpcMethod(AUTH_SERVICE_NAME, "Validate")
    private validate(payload : ValidateRequestDTO) : Promise<ValidateResponse> {
        return this.authService.validate(payload)
    }
}

