import { Controller, Get } from "@nestjs/common";

@Controller("producto")
export class ProductoController {
  @Get()
  getProducts() {
    return "list of all products";
  }
}
