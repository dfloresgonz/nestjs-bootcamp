import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CategoriasService } from "./categorias.service";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";

@Controller()
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @MessagePattern("createCategoria")
  create(@Payload() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @MessagePattern("get.all.categories")
  findAll() {
    return this.categoriasService.findAll();
  }

  @MessagePattern("findOneCategoria")
  findOne(@Payload() id: number) {
    return this.categoriasService.findOne(id);
  }

  @MessagePattern("updateCategoria")
  update(@Payload() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(
      updateCategoriaDto.id,
      updateCategoriaDto,
    );
  }

  @MessagePattern("removeCategoria")
  remove(@Payload() id: number) {
    return this.categoriasService.remove(id);
  }
}
