import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateRUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Public, ResponseMessage, User } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @ResponseMessage('Create a new resume')
  @Post()
  create(@Body() createRUserCvDto: CreateRUserCvDto, @User() user: IUser) {
    return this.resumesService.create(createRUserCvDto, user);
  }

  @Public()
  @ResponseMessage('Fetch list resume with paginate')
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(+currentPage, +limit, qs);
  }

  @ResponseMessage('Fetch a resume by id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }

  @ResponseMessage('Update status resume')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('status') status: string,
    @User() user: IUser,
  ) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a resume by id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.resumesService.remove(id, user);
  }

  @Post('by-user')
  @ResponseMessage('Get resumes by user')
  getResumesByUser(@User() user: IUser) {
    return this.resumesService.findByUsers(user);
  }
}
