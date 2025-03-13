import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { CategoriasModule } from "./categorias/categorias.module";
import { Categoria } from "./categorias/entities/categoria.entity";
import { CuponesModule } from "./cupones/cupones.module";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ProductEntity, Categoria, CuponesModule],
      synchronize: false,
      retryAttempts: 2,
      retryDelay: 1000,
      connectTimeoutMS: 5000,
      logging: true,
      migrations: [__dirname + "/../migrations/*{.ts,.js}"],
      migrationsTableName: "migrations_history",
    }),
    TypeOrmModule.forFeature([ProductEntity, Categoria, CuponesModule]),
    CategoriasModule,
    CuponesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
