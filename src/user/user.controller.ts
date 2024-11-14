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
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }
    return await this.userService.createUser(createUserDto);
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

    const updatedUser = await this.userService.updateUser(
      id,
      updatePasswordDto,
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  @DeleteWithNoContent(':id')
  async deleteUser(@Param('id') id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const isUserDeleted = await this.userService.deleteUser(id);
    if (!isUserDeleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
