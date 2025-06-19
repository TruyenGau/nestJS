import { CreateUserDto } from './create-user.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
] as const) {
  _id: string;
}
