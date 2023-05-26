import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from "@nestjs/common";
import { ValidateResponse } from "./auth.pb";
import { AuthService } from "./auth.service";
import { JwtService as Jwt } from "@nestjs/jwt";
import { Observable } from "rxjs";
export class AuthGuard implements CanActivate {
    @Inject(AuthService)
 private authService : AuthService
    private jwt : Jwt
   async validateRequest(req : Request) : Promise<boolean>{
    const token = req.headers["authorization"].split(" ")[1]
    if(!token) return false

    try{
        return !! await this.jwt.verify(token);
    }
    catch{
        return false
    }
   }
   
   
   async canActivate(context: ExecutionContext):Promise<boolean> {
       const req = context.switchToHttp().getRequest()
       if(!(await this.validateRequest(req)))
       throw new UnauthorizedException()
       return true
   }
}


