import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "products", schema: "public" })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name_product" })
  nameProduct: string;

  @Column()
  price: number;

  @Column({ name: "img_url" })
  imgUrl: string;

  @Column()
  description: string;

  @Column({ name: "is_oferta" })
  isOferta: boolean;

  @Column({ name: "porcentaje_oferta" })
  porcetajeOferta: number;

  @Column({ name: "final_price" })
  finalPrice: number;
}
