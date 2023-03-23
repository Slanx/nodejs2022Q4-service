import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { RefreshToken } from './entities/refreshToken.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly tokenRepository: Repository<RefreshToken>,
  ) {}

  async find(token: string) {
    const refreshToken = await this.tokenRepository.findOneBy({ token });

    if (!refreshToken) throw new ForbiddenException('Refresh token is invalid');

    return refreshToken;
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

  async update(token: string, userId: string) {
    const refreshToken = await this.tokenRepository.findOneBy({ userId });

    refreshToken.token = token;

    return this.tokenRepository.save(refreshToken);
  }

  async remove(refreshToken: RefreshToken['token']) {
    this.tokenRepository.delete({ token: refreshToken });
  }
}
