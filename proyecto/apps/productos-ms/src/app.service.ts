import { Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductApi } from "../../utils/types";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class AppService {
  productos: Product[] = [
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      imgUrl:
        "https://http2.mlstatic.com/D_NQ_NP_826747-MLU77986349091_072024-O.webp",
      isOferta: true,
      porcentajeOferta: 20,
      finalPrice: 80,
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción del producto 2",
      price: 200,
      imgUrl:
        "https://http2.mlstatic.com/D_NQ_NP_841132-MLU77796368248_072024-O.webp",
      isOferta: false,
      porcentajeOferta: 0,
      finalPrice: 200,
    },
    {
      id: 3,
      name: "Sony PlayStation 5 Slim 1tb Digital Color Blanco",
      price: 17456.97,
      imgUrl: `https://http2.mlstatic.com/D_NQ_NP_841132-MLU77796368248_072024-O.webp`,
      description:
        "Con tu Consola PlayStation 5 Slim tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.",
      isOferta: true,
      porcentajeOferta: 0.25,
      finalPrice: 0,
    },
  ];

  apiHost: string = "https://fakestoreapi.com";

  constructor(private readonly httpService: HttpService) {}

  findProduct(id: string): Product {
    const product = this.productos.find((producto) => producto.id === +id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async getAllProducts(): Promise<ProductApi[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<any[]>(`${this.apiHost}/products`).pipe(
        catchError((error: AxiosError) => {
          console.error("error:", error);
          throw new Error("An error happened!");
        }),
      ),
    );
    return data as ProductApi[];
  }

  crearProducto(newProducto: Product): Product {
    newProducto.id = Math.floor(Math.random() * 10000);
    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }
    this.productos.push(newProducto);
    return newProducto;
  }

  updateProducto(id: string, newProducto: Product) {
    const producto = this.productos.find((producto) => producto.id === +id);
    if (!producto) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }
    Object.assign(producto, newProducto);
    return producto;
  }

  deleteProduct(id: string) {
    const index = this.productos.findIndex((producto) => producto.id === +id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productos.splice(index, 1);
    return "Product deleted";
  }
}
