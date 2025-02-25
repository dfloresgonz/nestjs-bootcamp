import { Module } from "@nestjs/common";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { ProductoModuleModule } from "./producto-module/producto-module.module";

@Module({
  imports: [ProductoModuleModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
