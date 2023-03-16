import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshToken.entity';
import { TokenService } from '../token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken])],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
