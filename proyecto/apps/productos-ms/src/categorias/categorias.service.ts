/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from "@nestjs/common";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoryRepository: Repository<Categoria>,
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return "This action adds a new categoria";
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({
      where: { idCategoria: id },
    });
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}
