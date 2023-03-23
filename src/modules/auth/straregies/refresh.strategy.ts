import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenService } from 'src/modules/token/token.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies['refreshToken'];
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request) {
    const refreshToken = request.cookies['refreshToken'];

    const tokenInBase = await this.tokenService.find(refreshToken);

    if (!(refreshToken === tokenInBase.token))
      throw new UnauthorizedException('Your refreshToken is invalid');

    return { userId: tokenInBase.userId, refreshToken: tokenInBase.token };
  }
}
