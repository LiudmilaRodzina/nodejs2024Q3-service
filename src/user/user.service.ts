import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users = [];

  private excludePassword(user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  getAllUsers() {
    return this.users.map(this.excludePassword);
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return this.excludePassword(user);
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = {
      id: uuidv4(),
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    this.users.push(newUser);
    return this.excludePassword(newUser);
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    return this.excludePassword(user);
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
