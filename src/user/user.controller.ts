import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { BadRequestException } from '@nestjs/common';
import { validate as isUuid } from 'uuid';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword) {
      throw new BadRequestException(
        'Old password and new password are required',
      );
    }

    const updatedUser = this.userService.updateUser(id, updatePasswordDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  @DeleteWithNoContent(':id')
  deleteUser(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const isDeleted = this.userService.deleteUser(id);
    if (!isDeleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
