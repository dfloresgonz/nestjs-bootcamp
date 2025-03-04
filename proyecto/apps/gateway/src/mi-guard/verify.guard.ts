/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class VerifyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(VerifyGuard.name);
    const request = context.switchToHttp().getRequest();
    console.log("VerifyGuard.random_codigo: ", request.random_codigo);
    return true;
  }
}
