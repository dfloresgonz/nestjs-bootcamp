import {
  Controller,
  Get,
  Inject,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ErrorResponse, Product, ProductApi } from "apps/utils/types";
import { lastValueFrom } from "rxjs";

@Controller("v1/products")
export class ProductoController {
  constructor(
    @Inject("PRODUCTO_SERVICE")
    private readonly productoClient: ClientProxy,
  ) {}

  @Get()
  async getProducts(): Promise<ProductApi[]> {
    return await lastValueFrom(this.productoClient.send("getProducts", {}));
  }

  @Get(":idProducto")
  async getProductById(
    @Param("idProducto")
    idProducto: string,
  ): Promise<Product | ErrorResponse> {
    try {
      return await lastValueFrom(
        this.productoClient.send("getProductById", idProducto),
      );
    } catch (error) {
      console.error("error:", error);
      const responseError: ErrorResponse = {
        statusCode: 404,
        message: "Product not found",
      };
      return responseError;
    }
  }

  @Post()
  async crearProducto(
    @Body()
    newProductoBody: Product,
  ): Promise<Product> {
    return await lastValueFrom(
      this.productoClient.send("crearProducto", newProductoBody),
    );
  }

  @Put(":idProducto")
  async actualizarProducto(
    @Param("idProducto")
    idProducto: string,
    @Body()
    newProductoBody: Product,
  ): Promise<Product> {
    try {
      return await lastValueFrom(
        this.productoClient.send("actualizarProducto", {
          idProducto,
          newProductoBody,
        }),
      );
    } catch (error) {
      console.error("error:", error);
      throw new Error("An error happened!");
    }
  }

  @Delete(":idProducto")
  async borrarProducto(
    @Param("idProducto")
    idProducto: string,
  ): Promise<string> {
    return await lastValueFrom(
      this.productoClient.send("borrarProducto", idProducto),
    );
  }
}
