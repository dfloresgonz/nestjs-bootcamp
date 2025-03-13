import {
  Controller,
  Get,
  Inject,
  Body,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
  ErrorResponse,
  Product,
  ProductApi,
  ProductDTO,
} from "apps/utils/types";
import { lastValueFrom } from "rxjs";
import { MiGuardGuard } from "../mi-guard/mi-guard.guard";
import { PreInteceptor } from "../interceptor/pre.interceptor";
import { TransformPipe } from "../pipes/transform.pipe";
import { PostInteceptor } from "../interceptor/post.interceptor";
import { ProductEntity } from "apps/productos-ms/src/entities/product.entity";

@Controller("v1/products")
export class ProductoController {
  constructor(
    @Inject("PRODUCTO_SERVICE")
    private readonly productoClient: ClientProxy,
  ) {}

  @Get()
  // @UseGuards(MiGuardGuard)
  async getProducts(): Promise<ProductEntity[]> {
    console.log("getProducts");
    return await lastValueFrom(this.productoClient.send("getProducts", {}));
  }

  @Get(":idProducto")
  @UseInterceptors(PreInteceptor)
  async getProductById(
    @Param("idProducto")
    idProducto: string,
  ): Promise<ProductEntity | ErrorResponse> {
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
  @UseInterceptors(PostInteceptor)
  async crearProducto(
    @Body(new TransformPipe())
    newProductoBody: Product,
  ): Promise<Product> {
    console.log("Controller.newProductoBody:", newProductoBody);
    return await lastValueFrom(
      this.productoClient.send("crearProducto", newProductoBody),
    );
  }

  @Put(":idProducto")
  async actualizarProducto(
    @Param("idProducto")
    idProducto: string,
    @Body()
    newProductoBody: ProductDTO,
  ): Promise<any> {
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
