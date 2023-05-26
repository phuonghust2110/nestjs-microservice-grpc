import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthEntity } from "./auth.entity";
import {Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { LoginRequestDTO, RegisterRequestDTO, ValidateRequestDTO } from "./DTO/auth.dto";
import { JwtStategy } from "./auth.stategy";
import { LoginResponse, RegisterResponse, ValidateResponse } from "./auth.pb";

@Injectable()
export class AuthService{
    constructor(
    @InjectRepository(AuthEntity) private UserRepository : Repository<AuthEntity>,
        @Inject(JwtStategy) private readonly jwtStategy : JwtStategy
    ){}    

    async register({email, password }: RegisterRequestDTO) : Promise<RegisterResponse>{
        const salt = await bcrypt.genSalt()
        const hashPassWord = await bcrypt.hash(password, salt)
        let user:AuthEntity  = await this.UserRepository.findOne({where : {email}})
        if(user){
            return {status: HttpStatus.CONFLICT, error : ["Email does already exist"]}
        }

        user = new AuthEntity()
        user.email = email 
        user.password =  hashPassWord
        user.salt = salt
        await this.UserRepository.save(user);
        
        return {status : HttpStatus.CREATED, error : null}
    }

    async login({email, password}: LoginRequestDTO) : Promise<LoginResponse>{
        const user : AuthEntity = await this.UserRepository.findOne({where : {email}})
        if(!user){
            return {status : HttpStatus.NOT_FOUND, error : ["Email not found"], token : null }
        }
        const isPassWordValid: boolean = this.jwtStategy.isPassWordValid(password, user.password)
        if(!isPassWordValid){
            return {status : HttpStatus.NOT_FOUND, error: ["Wrong password "], token : null }
        }
        const token = this.jwtStategy.generateToken(user)
        return {status: HttpStatus.OK, error : null , token : token}
    }

    async validate({token} : ValidateRequestDTO) : Promise<ValidateResponse> {
        const decoded : AuthEntity = await this.jwtStategy.verifyToken(token);
        if(!decoded){
            return {status : HttpStatus.FORBIDDEN, error : ["Token is invalid"], userId : null }
        }
        const auth : AuthEntity = await this.jwtStategy.validateUser(decoded)
        if(!auth) {
            return {status : HttpStatus.NOT_FOUND , error : ["User not found"], userId : null }
        }

        return {status: HttpStatus.OK, error : null, userId : decoded.id}
    }

    
}

   


