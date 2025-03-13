/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import {
  DataSource,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Not,
  Repository,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Product } from "apps/utils/types";
import { CategoriasService } from "./categorias/categorias.service";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoriasService: CategoriasService,
    private readonly dataSource: DataSource,
  ) {}

  // getAllProducts(): Promise<ProductEntity[]> {
  //   return this.productRepository.find();
  // }

  async findProduct(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: +id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  // async getAllProducts(): Promise<ProductEntity[]> {
  //   const products = await this.dataSource
  //     .createQueryBuilder(ProductEntity, "product")
  //     .select(["product.nameProduct"])
  //     .innerJoinAndSelect("product.categoria", "categoria")
  //     .where("product.price > :pricexyz", { pricexyz: 100 })
  //     .andWhere("product.finalPrice < :finalPricexyz", {
  //       finalPricexyz: 500,
  //     })
  //     .orderBy("product.price", "DESC")
  //     .getMany();
  //   return products;
  // }

  async getAllProducts(): Promise<ProductEntity[]> {
    const limitMax = 100;
    const products = await this.dataSource.query(
      `
      SELECT p.*, c.name_categoria 
      FROM public.products p
      LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
      WHERE p.price > $1
        AND p.final_price < $2
      ORDER BY p.price DESC
    `,
      [100, limitMax],
    );
    return products;
  }

  async crearProducto(newProducto: Product): Promise<ProductEntity> {
    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }

    const categoria = await this.categoriasService.findOne(
      newProducto.categoria_id,
    );

    if (!categoria) {
      throw new Error(
        `Categoria with id ${newProducto.categoria_id} not found`,
      );
    }

    const productEntity = this.productRepository.create({
      ...newProducto,
      categoria: categoria,
    });
    return await this.productRepository.save(productEntity);
  }

  async updateProducto(id: string, newProducto: ProductEntity) {
    await this.findProduct(id);

    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }

    return await this.productRepository.update({ id: +id }, newProducto);
  }

  async deleteProduct(id: string) {
    await this.productRepository.softDelete({ id: +id });
    return "Product deleted";
  }
}
