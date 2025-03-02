/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth/auth.service";

@Controller()
export class GatewayController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  logeo(@Body() datos: { username: string; password: string }): {
    access_token: string;
  } {
    const usuario = this.authService.validarUsuario(
      datos.username,
      datos.password,
    );
    if (!usuario) {
      console.log("Usuario no autorizado");
      throw new UnauthorizedException();
    }
    return this.authService.generateAccessToken(usuario);
  }
}
