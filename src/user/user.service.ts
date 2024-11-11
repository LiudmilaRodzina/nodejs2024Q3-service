import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users = [];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
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

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  updateUser(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUserById(id);
    if (!user) return null;
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Incorrect old password');
    }
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  deleteUser(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
