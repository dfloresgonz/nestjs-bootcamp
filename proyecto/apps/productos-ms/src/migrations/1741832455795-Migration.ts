import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741832455795 implements MigrationInterface {
  name = "Migration1741832455795";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "fk_products_categoria"`);
    // await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "products_name_product_check"`);
    await queryRunner.query(
      `CREATE TABLE "cupone" ("id" SERIAL NOT NULL, "codigo" character varying NOT NULL, "descuento" integer NOT NULL, "fechaExpiracion" date NOT NULL, CONSTRAINT "PK_bff22252fe301d2796aaca4f0a5" PRIMARY KEY ("id"))`,
    );
    // await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "name_categoria"`);
    // await queryRunner.query(`ALTER TABLE "categoria" ADD "name_categoria" character varying NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "products_pkey"`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "id" SERIAL NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name_product"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "name_product" character varying NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "img_url" character varying NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "description" character varying NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "porcentaje_oferta"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "porcentaje_oferta" integer NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "final_price"`);
    // await queryRunner.query(`ALTER TABLE "products" ADD "final_price" integer NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_d5b8123a04ec41d0cbc65a1677f" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_d5b8123a04ec41d0cbc65a1677f"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "final_price"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "final_price" numeric`);
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "porcentaje_oferta"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "porcentaje_oferta" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "img_url"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "img_url" text NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "price" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "name_product"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "name_product" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "products_pkey" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "categoria" DROP COLUMN "name_categoria"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categoria" ADD "name_categoria" character varying(20)`,
    );
    await queryRunner.query(`DROP TABLE "cupone"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "products_name_product_check" CHECK ((char_length(name_product) >= 3))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "fk_products_categoria" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
