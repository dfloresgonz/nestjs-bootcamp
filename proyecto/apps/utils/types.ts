/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Categoria } from "apps/productos-ms/src/categorias/entities/categoria.entity";
import { IsNotEmpty, IsOptional, IsPositive, MinLength } from "class-validator";

export class Product {
  id: number;

  @IsNotEmpty({
    message: "El nombre del producto no puede estar vacío",
  })
  @MinLength(3)
  nameProduct: string;

  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  imgUrl: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  isOferta: boolean;
  @IsNotEmpty()
  porcentajeOferta: number;
  @IsOptional()
  finalPrice: number;

  categoria_id: number;
}

export type ProductApi = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export class ProductDTO {
  id: number;

  @MinLength(3)
  nameProduct?: string;
  @IsPositive()
  @IsOptional()
  price?: number;
  imgUrl?: string;
  description?: string;
  isOferta?: boolean;
  porcentajeOferta?: number;
  finalPrice?: number; //
}
