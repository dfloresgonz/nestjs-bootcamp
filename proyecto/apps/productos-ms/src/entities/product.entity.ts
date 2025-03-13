import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Categoria } from "../categorias/entities/categoria.entity";

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

  @ManyToOne(() => Categoria, (categoria) => categoria.products, {
    eager: true,
  })
  @JoinColumn({ name: "id_categoria", referencedColumnName: "idCategoria" })
  categoria: Categoria;
}
