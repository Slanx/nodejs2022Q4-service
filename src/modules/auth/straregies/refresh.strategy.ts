import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
    });
  }

  async validate(jwtPayload: JwtPayload) {
    return { userId: jwtPayload.sub };
  }
}
