import { Column, Entity } from "typeorm";

@Entity()
export class Categoria {
  @Column({ primary: true, generated: true, name: "id_categoria" })
  idCategoria: number;
  @Column({ name: "name_categoria" })
  nameCategoria: string;
}
