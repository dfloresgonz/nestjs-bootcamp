/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class MiGuardGuard extends AuthGuard("jwt") {
  handleRequest(err, user, info: Error) {
    if (err || !user) {
      throw err || info;
    }
    return user;
  }
}
