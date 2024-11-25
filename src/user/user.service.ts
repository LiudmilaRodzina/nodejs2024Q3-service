import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UpdatePasswordDto, CreateUserDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

@Injectable()
export class UserService {
  private readonly saltRounds = parseInt(process.env.CRYPT_SALT);

  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    }));
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async createUser(createUserDto: CreateUserDto) {
    const timestamp = new Date();
    const salt = await bcrypt.genSalt(this.saltRounds);
    const passwordHash = await bcrypt.hash(createUserDto.password, salt);

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: passwordHash,
        createdAt: timestamp,
        updatedAt: timestamp,
        version: 1,
      },
    });
    const { password, ...userWithoutPassword } = newUser;
    return {
      ...userWithoutPassword,
      createdAt: new Date(userWithoutPassword.createdAt).getTime(),
      updatedAt: new Date(userWithoutPassword.updatedAt).getTime(),
    };
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    const passwordMatch = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );
    if (!passwordMatch) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const salt = await bcrypt.genSalt(this.saltRounds);
    const passwordHash = await bcrypt.hash(updatePasswordDto.newPassword, salt);
    const timestamp: Date = new Date();
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: passwordHash,
        updatedAt: timestamp,
        version: user.version + 1,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return {
      ...userWithoutPassword,
      createdAt: new Date(userWithoutPassword.createdAt).getTime(),
      updatedAt: new Date(userWithoutPassword.updatedAt).getTime(),
    };
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getUserByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { login },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
