import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DbService } from 'src/db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  create(createUserDto: CreateUserDto) {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    this.db.users.push(new User(user));

    return user;
  }

  async findAll() {
    return this.db.users;
  }

  async findOne(id: string) {
    const user = this.db.users.find((user) => user.id === id);

    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    let updatedUser: User;

    this.db.users = this.db.users.map((user) => {
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

  async remove(id: string) {
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
