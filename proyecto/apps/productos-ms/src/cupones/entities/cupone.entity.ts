import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cupone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column()
  descuento: number;

  @Column({ type: "date" })
  fechaExpiracion: Date;
}
