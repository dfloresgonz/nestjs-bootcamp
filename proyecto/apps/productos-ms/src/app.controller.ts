/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { Product, ProductApi } from "../../utils/types";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProductEntity } from "./entities/product.entity";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("getProducts")
  async getProducts(): Promise<ProductEntity[]> {
    return await this.appService.getAllProducts();
  }

  @MessagePattern("getProductById")
  async getProductById(
    @Payload()
    idProducto: string,
  ): Promise<ProductEntity> {
    try {
      return await this.appService.findProduct(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("crearProducto")
  async crearProducto(
    @Payload()
    newProductoBody: Product,
  ): Promise<ProductEntity> {
    return await this.appService.crearProducto(newProductoBody);
  }

  @MessagePattern("actualizarProducto")
  actualizarProducto(
    @Payload()
    valoresUpdate: any,
  ) {
    try {
      const { idProducto, newProductoBody } = valoresUpdate;
      return this.appService.updateProducto(idProducto, newProductoBody);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("borrarProducto")
  borrarProducto(
    @Payload()
    idProducto: string,
  ) {
    try {
      return this.appService.deleteProduct(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }
}
