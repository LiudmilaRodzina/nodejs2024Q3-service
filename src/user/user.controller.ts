import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  NotFoundException,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DeleteWithNoContent } from 'src/decorators/delete.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateUserPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
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
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const isUserDeleted = await this.userService.deleteUser(id);
    if (!isUserDeleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
