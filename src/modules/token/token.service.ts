import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { RefreshToken } from './entities/refreshToken.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly tokenRepository: Repository<RefreshToken>,
  ) {}

  async find(token: string) {
    return this.tokenRepository.findOneBy({ token });
  }

  async findByUserId(userId: string) {
    return this.tokenRepository.findOneBy({ userId });
  }

  async create(createTokenDto: CreateTokenDto) {
    const refreshToken = this.tokenRepository.create({
      ...createTokenDto,
    });

    return this.tokenRepository.save(refreshToken);
  }

  async update(id: string, { token }: UpdateTokenDto) {
    const refreshToken = await this.tokenRepository.findOneBy({ id });

    refreshToken.token = token;

    return this.tokenRepository.save(refreshToken);
  }

  async remove(refreshToken: RefreshToken['token']) {
    this.tokenRepository.delete({ token: refreshToken });
  }
}
