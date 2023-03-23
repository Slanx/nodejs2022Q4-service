import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { TokenService } from 'src/modules/token/token.service';
import { RefreshToken } from '../token/entities/refreshToken.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByLogin(createUserDto.login);

    if (user) {
      throw new BadRequestException('User already exists with this login');
    }

    return this.usersService.create(createUserDto);
  }

  async login(createUserDto: CreateUserDto) {
    const { password, login } = createUserDto;

    const validUser = await this.validateUser(login, password);

    if (!validUser)
      throw new ForbiddenException('Check your login or password');

    const tokens = await this.generateTokens(validUser.id);

    const isTokenExist = await this.tokenService.findByUserId(validUser.id);

    if (isTokenExist) {
      await this.tokenService.update(tokens.refreshToken, validUser.id);
    } else {
      await this.tokenService.create({
        token: tokens.refreshToken,
        user: validUser,
      });
    }
    return tokens;
  }

  private async validateUser(login: string, password: string) {
    const user = await this.usersService.findOneByLogin(login);

    if (!user) return null;

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) return null;

    return user;
  }

  private async generateTokens(userId: string) {
    const jwtPayload: JwtPayload = {
      sub: userId,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(token: string, userId: string) {
    const refreshToken = await this.tokenService.find(token);

    const newTokens = await this.generateTokens(refreshToken.userId);

    await this.tokenService.update(newTokens.refreshToken, userId);

    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    };
  }

  async remove(refreshToken: RefreshToken['token']) {
    await this.tokenService.remove(refreshToken);
  }
}
