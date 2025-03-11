/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateCategoriaDto } from "apps/productos-ms/src/categorias/dto/create-categoria.dto";
import { lastValueFrom } from "rxjs";

@Controller("categoria")
export class CategoriaController {
  constructor(
    @Inject("PRODUCTO_SERVICE")
    private readonly productoClient: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return await lastValueFrom(
      this.productoClient.send("get.all.categories", {}),
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string): string {
    return `This action returns a categoria with id ${id}`;
  }

  @Post()
  create(@Body() createCategoriaDto: any): string {
    return "This action adds a new categoria";
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoriaDto: CreateCategoriaDto,
  ): string {
    return `This action updates a categoria with id ${id}`;
  }

  @Delete(":id")
  remove(@Param("id") id: string): string {
    return `This action removes a categoria with id ${id}`;
  }
}
