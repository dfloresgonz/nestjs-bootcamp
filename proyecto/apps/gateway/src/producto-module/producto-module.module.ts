import { Module } from "@nestjs/common";
import { ProductoController } from "./producto.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: "PRODUCTO_SERVICE",
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: "0.0.0.0",
            port: 3001,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProductoController],
})
export class ProductoModuleModule {}
