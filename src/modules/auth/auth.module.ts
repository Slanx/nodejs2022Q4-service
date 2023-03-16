import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './straregies/jwt.strategy';
import { TokenService } from 'src/modules/token/token.service';
import { RefreshStrategy } from './straregies/refresh.strategy';
import { TokenModule } from 'src/modules/token/token.module';

@Module({
  imports: [UsersModule, JwtModule.register({}), PassportModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {}
