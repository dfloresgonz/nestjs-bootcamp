import { Module } from "@nestjs/common";
import { ProductoController } from "./producto.controller";

@Module({
  controllers: [ProductoController],
})
export class ProductoModuleModule {}
