import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/logger/logger.service';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exception.filter';

@ApiTags('Users')
@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly logger: LoggerService) {}

  @Get()
  findAll(@Req() request: Request) {
    this.logger.req(request);
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.usersService.findOneUser(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto, @Req() request: Request) {
    this.logger.req(request);
    return this.usersService.createUser(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePasswordDto, @Req() request: Request) {
    this.logger.req(request);
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() request: Request) {
    this.logger.req(request);
    return this.usersService.removeUser(id);
  }
}
