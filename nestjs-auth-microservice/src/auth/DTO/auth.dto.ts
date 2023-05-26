
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { LoginRequest, RegisterRequest, ValidateRequest, ValidateResponse } from "../auth.pb";

export class LoginRequestDTO implements LoginRequest {
    @IsEmail()
    public readonly email : string

    @IsString()
    public readonly password : string
}

export class RegisterRequestDTO  implements RegisterRequest{
    @IsEmail()
    public readonly email : string

    @IsString()
    @MinLength(8)
    public readonly password : string
}

export class ValidateRequestDTO implements ValidateRequest{
    @IsString()
    public readonly token : string
}