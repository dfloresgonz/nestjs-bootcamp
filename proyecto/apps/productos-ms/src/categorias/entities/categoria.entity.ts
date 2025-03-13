import { Column, Entity, OneToMany } from "typeorm";
import { ProductEntity } from "../../entities/product.entity";

@Entity()
export class Categoria {
  @Column({ primary: true, generated: true, name: "id_categoria" })
  idCategoria: number;
  @Column({ name: "name_categoria" })
  nameCategoria: string;

  @OneToMany(() => ProductEntity, (product) => product.categoria)
  products: ProductEntity[];
}
