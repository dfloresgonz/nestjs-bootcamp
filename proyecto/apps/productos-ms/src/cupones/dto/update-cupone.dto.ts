import { PartialType } from '@nestjs/mapped-types';
import { CreateCuponeDto } from './create-cupone.dto';

export class UpdateCuponeDto extends PartialType(CreateCuponeDto) {
  id: number;
}
