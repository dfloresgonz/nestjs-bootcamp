import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from "typeorm";

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
  porcentajeOferta: number;

  @Column({ name: "final_price" })
  finalPrice: number;

  @DeleteDateColumn({ name: "fec_borrado" })
  fecBorrado: Date;
}
