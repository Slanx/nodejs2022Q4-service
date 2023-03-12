import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, genSaltSync, compare } from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateTokenDto } from './dto/update-token.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const saltRounds = Number(this.configService.get<string>('CRYPT_SALT'));
    const salt = genSaltSync(saltRounds);
    const hashPassword = await hash(createUserDto.password, salt);

    return this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });
  }

  async login(createUserDto: CreateUserDto) {
    const { password, login } = createUserDto;

    const validUser = await this.validateUser(login, password);

    if (!validUser)
      throw new ForbiddenException('Check your login or password');

    const tokens = await this.generateTokens(validUser.id);

    const isTokenExist = await this.tokenService.findByUserId(validUser.id);

    if (isTokenExist) {
      await this.tokenService.update(isTokenExist.id, {
        token: tokens.refreshToken,
      });
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

    const isPasswordMatch = await compare(password, user.password);

    if (!user && !isPasswordMatch) return null;

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

  async refresh(updateTokenDto: UpdateTokenDto) {
    const refreshToken = await this.tokenService.find(updateTokenDto.token);

    if (!refreshToken) throw new ForbiddenException('Refresh token is invalid');

    const newTokens = await this.generateTokens(refreshToken.userId);

    await this.tokenService.update(refreshToken.id, {
      token: newTokens.refreshToken,
    });

    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    };
  }
}
