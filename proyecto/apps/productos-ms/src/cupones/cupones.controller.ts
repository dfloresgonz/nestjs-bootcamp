import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CuponesService } from "./cupones.service";
import { CreateCuponeDto } from "./dto/create-cupone.dto";
import { UpdateCuponeDto } from "./dto/update-cupone.dto";

@Controller()
export class CuponesController {
  constructor(private readonly cuponesService: CuponesService) {}

  @MessagePattern("createCupone")
  create(@Payload() createCuponeDto: CreateCuponeDto) {
    return this.cuponesService.create(createCuponeDto);
  }

  @MessagePattern("findAllCupones")
  findAll() {
    return this.cuponesService.findAll();
  }

  @MessagePattern("findOneCupone")
  findOne(@Payload() id: number) {
    return this.cuponesService.findOne(id);
  }

  @MessagePattern("updateCupone")
  update(@Payload() updateCuponeDto: UpdateCuponeDto) {
    return this.cuponesService.update(updateCuponeDto.id, updateCuponeDto);
  }

  @MessagePattern("removeCupone")
  remove(@Payload() id: number) {
    return this.cuponesService.remove(id);
  }
}
