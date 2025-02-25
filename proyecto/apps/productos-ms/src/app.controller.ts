/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";
import { Product, ProductApi } from "../../utils/types";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("getProducts")
  async getProducts(): Promise<ProductApi[]> {
    return await this.appService.getAllProducts();
  }

  @MessagePattern("getProductById")
  getProductById(
    @Payload()
    idProducto: string,
  ): Product {
    try {
      return this.appService.findProduct(idProducto);
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @MessagePattern("crearProducto")
  crearProducto(
    @Payload()
    newProductoBody: Product,
  ): Product {
    return this.appService.crearProducto(newProductoBody);
  }

  @MessagePattern("actualizarProducto")
  actualizarProducto(
    @Payload()
    valoresUpdate: any,
  ): Product {
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
