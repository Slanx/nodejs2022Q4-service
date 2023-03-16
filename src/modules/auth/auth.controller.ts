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
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateTokenDto } from 'src/modules/token/dto/update-token.dto';
import { RefreshGuard } from './guards/refresh.guard';
import { RefreshToken } from '../token/entities/refreshToken.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Public()
  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() updateTokenDto: UpdateTokenDto) {
    return this.authService.refresh(updateTokenDto);
  }

  @UseGuards(RefreshGuard)
  @Delete('refresh')
  @HttpCode(HttpStatus.NO_CONTENT)
  logaut(@Body() { token }: Pick<RefreshToken, 'token'>) {
    return this.authService.remove(token);
  }
}
