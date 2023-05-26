// import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"
import { JwtService as Jwt } from "@nestjs/jwt";
import { AuthEntity} from "./auth.entity";
import {  InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class JwtStategy{
    constructor(
        @InjectRepository(AuthEntity) private UserRepository : Repository<AuthEntity>,
        private jwt : Jwt
    ){}
    generateToken(user : AuthEntity){
        const accessToken = this.jwt.sign({id: user.id, email: user.email})
        return accessToken;
    }

    verifyToken(token: string){
        return this.jwt.verify(token);
    }

    public isPassWordValid(password: string, userPassWord: string) {
        return bcrypt.compareSync(password, userPassWord)
    }

    public async validateUser(decoded : any) : Promise<AuthEntity> {
        return this.UserRepository.findOne(decoded.id)
    }

}