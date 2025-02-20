import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './utils/types';

@Controller('v1/products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProducts(): Product[] {
    return this.appService.getAllProducts();
  }

  @Get(':idProducto')
  getProductById(
    @Param('idProducto')
    idProducto: string,
  ): Product | object {
    return this.appService.findProduct(idProducto);
  }

  @Post()
  crearProducto() {
    return 'Producto creado';
  }

  @Put()
  actualizarProducto() {
    return 'Producto actualizado';
  }

  @Delete()
  borrarProducto() {
    return 'Producto borrado';
  }
}
