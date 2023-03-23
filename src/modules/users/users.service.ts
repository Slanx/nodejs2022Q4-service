import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { hashPassword } from 'src/utils/hash';

@Injectable()
export class UsersService {
  private readonly saltRounds: number;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    this.saltRounds = Number(this.configService.get('CRYPT_SALT'));
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hashPassword(
      this.saltRounds,
      createUserDto.password,
    );

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('This user does not exist');
    }

    return user;
  }

  async findOneByLogin(login: string) {
    const user = await this.userRepository.findOneBy({ login });

    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(id);

    const passwordMatch = compare(updatePasswordDto.oldPassword, user.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Invalid password');
    }

    const hashedNewPassword = await hashPassword(
      this.saltRounds,
      updatePasswordDto.newPassword,
    );

    user.password = hashedNewPassword;

    return this.userRepository.save(user);
  }

  async remove(user: User) {
    await this.userRepository.remove(user);
  }
}
