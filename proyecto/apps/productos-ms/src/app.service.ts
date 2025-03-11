import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { IsNull, LessThan, LessThanOrEqual, Not, Repository } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  getAllProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findProduct(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id: +id },
    });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  crearProducto(newProducto: ProductEntity): Promise<ProductEntity> {
    if (newProducto.isOferta) {
      newProducto.finalPrice =
        newProducto.price - newProducto.price * newProducto.porcentajeOferta;
    } else {
      newProducto.finalPrice = newProducto.price;
    }
    return this.productRepository.save(newProducto);
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
