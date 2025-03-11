import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { ProductoModuleModule } from "./producto-module/producto-module.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import * as Joi from "joi";
import { LoggerMiddleware } from "./middleware/Logger.middleware";
import { VerifyGuard } from "./mi-guard/verify.guard";
import { CategoriaModuleModule } from "./categoria-module/categoria-module.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
    ProductoModuleModule,
    AuthModule,
    CategoriaModuleModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
