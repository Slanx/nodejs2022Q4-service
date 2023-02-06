import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    this.users.push(user);

    return user;
  }

  async findAll() {
    return this.users;
  }

  findOne = (id: string) => {
    const user = this.users.find((user) => user.id === id);

    return user;
  };

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    let updatedUser: User;

    this.users = this.users.map((user) => {
      if (user.id === id) {
        updatedUser = {
          ...user,
          updatedAt: Date.now(),
          version: user.version + 1,
          password: updatePasswordDto.newPassword,
        };

        return updatedUser;
      }

      return user;
    });

    return updatedUser;
  }

  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
