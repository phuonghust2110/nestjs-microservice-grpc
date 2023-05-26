import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext, HttpException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtStategy } from "../auth.stategy";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(
      private reflector : Reflector,
      private readonly JwtStategy : JwtStategy,

    ){}

    async validateRequest(request: Request): Promise<boolean> {
        const token = request.headers["authorization"].split(" ")[1];
        if(!token) return false;
        try{
            return !! await this.JwtStategy.verifyToken(token)
        }
        catch{
            return false
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest()
        if(!(await this.validateRequest(request)))
        throw new UnauthorizedException();
        return true

    }
}

