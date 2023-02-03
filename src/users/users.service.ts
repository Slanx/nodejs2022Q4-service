import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '835b1e81-5dd5-458b-8e4e-7776e069eefd',
      login: 'Rafa',
      password: 'qwerty123',
      version: 1,
      createdAt: 1519129853500,
      updatedAt: 1519129853500,
    },
  ];

  create(createUserDto: CreateUserDto) {
    Date.now();
    return 'This action adds a new user';
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserPasswordDto: UpdateUserPasswordDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
