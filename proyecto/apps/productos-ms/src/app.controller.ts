import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { Product, ProductApi } from "./utils/types";

@Controller("v1/products")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getProducts(): Promise<ProductApi[]> {
    return await this.appService.getAllProducts();
  }

  @Get(":idProducto")
  getProductById(
    @Param("idProducto")
    idProducto: string,
  ): Product {
    return this.appService.findProduct(idProducto);
  }

  @Post()
  crearProducto(
    @Body()
    newProductoBody: Product,
  ): Product {
    return this.appService.crearProducto(newProductoBody);
  }

  @Put(":idProducto")
  actualizarProducto(
    @Param("idProducto")
    idProducto: string,
    @Body()
    newProductoBody: Product,
  ): Product {
    return this.appService.updateProducto(idProducto, newProductoBody);
  }

  @Delete(":idProducto")
  borrarProducto(
    @Param("idProducto")
    idProducto: string,
  ) {
    return this.appService.deleteProduct(idProducto);
  }
}
