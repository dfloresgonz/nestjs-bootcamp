/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class Product {
  id: number;

  @IsNotEmpty({
    message: "El nombre del producto no puede estar vacío",
  })
  @MinLength(3)
  name: string;

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
  finalPrice: number; //
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
