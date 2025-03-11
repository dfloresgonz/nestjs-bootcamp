import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CategoriaController } from "./categoria.controller";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: "PRODUCTO_SERVICE",
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: process.env.PRODUCTOS_MS_HOST!,
            port: +process.env.PRODUCTO_SERVICE_PORT!,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [CategoriaController],
  exports: [],
  providers: [],
})
export class CategoriaModuleModule {}
