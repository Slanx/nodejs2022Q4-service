import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Public } from 'src/common/decorators/public';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RefreshGuard } from './guards/refresh.guard';
import { convertToMs } from 'src/utils/convertToMs';
import { RequestWithUser } from './interfaces/requestWithUser';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      createUserDto,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: convertToMs(
        this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      ),
    });
    return { accessToken };
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Request() req: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.refresh(
      req.user.refreshToken,
      req.user.userId,
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: convertToMs(
        this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      ),
    });

    return { accessToken };
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Delete('logaut')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logaut(
    @Request() req: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.remove(req.user.refreshToken);

    response.clearCookie('refreshToken');
  }
}
