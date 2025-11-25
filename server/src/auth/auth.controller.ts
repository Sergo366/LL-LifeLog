import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() data: SignInDto): Promise<SignInResponseDto> {
    return await this.authService.signIn(data);
  }

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto): Promise<SignInResponseDto> {
    return await this.authService.signUp(data);
  }
}
