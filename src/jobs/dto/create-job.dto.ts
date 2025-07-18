import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'skills không được để trống' })
  @IsArray({ message: 'Skill có định dạng là array' })
  @IsString({ each: true, message: 'Skill đúng định dạng là string' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company!: Company;

  @IsNotEmpty({ message: 'Salary không được để trống' })
  salary: number;

  @IsNotEmpty({ message: 'Quantity không được để trống' })
  quantity: number;

  @IsNotEmpty({ message: 'Level không được để trống' })
  level: string;

  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'Location không được để trống' })
  location: string;

  @IsNotEmpty({ message: 'StartDate không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'StartDate có định dạng là Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'EndDate không được để trống' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'EndDate có định dạng là Date' })
  endDate: Date;

  @IsNotEmpty({ message: 'EndDate không được để trống' })
  @IsBoolean({ message: 'isActive có định dạng là boolean' })
  isActive: Date;
}
