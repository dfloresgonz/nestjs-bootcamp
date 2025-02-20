import { Injectable } from '@nestjs/common';
import { Product } from './utils/types';

@Injectable()
export class AppService {
  productos: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción del producto 1',
      price: 100,
      imgUrl:
        'https://http2.mlstatic.com/D_NQ_NP_826747-MLU77986349091_072024-O.webp',
      isOferta: true,
      porcentajeOferta: 20,
      finalPrice: 80,
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción del producto 2',
      price: 200,
      imgUrl:
        'https://http2.mlstatic.com/D_NQ_NP_841132-MLU77796368248_072024-O.webp',
      isOferta: false,
      porcentajeOferta: 0,
      finalPrice: 200,
    },
    {
      id: 3,
      name: 'Sony PlayStation 5 Slim 1tb Digital Color Blanco',
      price: 17456.97,
      imgUrl: `https://http2.mlstatic.com/D_NQ_NP_841132-MLU77796368248_072024-O.webp`,
      description:
        'Con tu Consola PlayStation 5 Slim tendrás entretenimiento asegurado todos los días. Su tecnología fue creada para poner nuevos retos tanto a jugadores principiantes como expertos.',
      isOferta: true,
      porcentajeOferta: 0.25,
      finalPrice: 0,
    },
  ];

  findProduct(id: string): Product | object {
    return this.productos.find((producto) => producto.id === +id) || {};
  }

  getAllProducts(): Product[] {
    return this.productos;
  }
}
