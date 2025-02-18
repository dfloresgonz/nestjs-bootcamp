import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Product } from './utils/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('saludar')
  getHello(): string {
    return `${this.appService.saludar()} sdfsdfsfsfsfsfsdffd`;
  }

  @Get('products')
  getProducts(): Product[] {
    return this.appService.getProducts();
  }
}
