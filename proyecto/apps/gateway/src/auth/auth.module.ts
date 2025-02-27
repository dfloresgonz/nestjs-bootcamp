import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy/jwt.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "sdfsdf@#$@#sdfsdf",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
