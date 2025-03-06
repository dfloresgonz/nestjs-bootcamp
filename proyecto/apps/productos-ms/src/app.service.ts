import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  // findProduct(id: string): Product {
  //   const product = this.productos.find((producto) => producto.id === +id);

  //   if (!product) {
  //     throw new Error(`Product with id ${id} not found`);
  //   }
  //   return product;
  // }

  // async getAllProducts(): Promise<ProductApi[]> {
  //   const { data } = await firstValueFrom(
  //     this.httpService.get<any[]>(`${this.apiHost}/products`).pipe(
  //       catchError((error: AxiosError) => {
  //         console.error("error:", error);
  //         throw new Error("An error happened!");
  //       }),
  //     ),
  //   );
  //   return data as ProductApi[];
  // }

  // crearProducto(newProducto: Product): Product {
  //   newProducto.id = Math.floor(Math.random() * 10000);
  //   if (newProducto.isOferta) {
  //     newProducto.finalPrice =
  //       newProducto.price - newProducto.price * newProducto.porcentajeOferta;
  //   } else {
  //     newProducto.finalPrice = newProducto.price;
  //   }
  //   this.productos.push(newProducto);
  //   return newProducto;
  // }

  // updateProducto(id: string, newProducto: Product) {
  //   const producto = this.productos.find((producto) => producto.id === +id);
  //   if (!producto) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }

  //   if (newProducto.isOferta) {
  //     newProducto.finalPrice =
  //       newProducto.price - newProducto.price * newProducto.porcentajeOferta;
  //   } else {
  //     newProducto.finalPrice = newProducto.price;
  //   }
  //   Object.assign(producto, newProducto);
  //   return producto;
  // }

  // deleteProduct(id: string) {
  //   const index = this.productos.findIndex((producto) => producto.id === +id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }
  //   this.productos.splice(index, 1);
  //   return "Product deleted";
  // }
}
