/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validarUsuario(username: string, password: string) {
    // ir a BD y buscar el usuario
    if (username === "admin" && password === "admin") {
      return { name: "Diego", lastname: "Flores" };
    }
    return null;
  }

  generateAccessToken(user: any) {
    const payload = { username: user.name, sub: 1 };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
