import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { UserEntity } from '../shared/models/user.entity';
import { MoreThan, Repository } from 'typeorm';
import { RefreshTokenEntity } from '../shared/models/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'node:crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepo: Repository<RefreshTokenEntity>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto): Promise<SignInResponseDto> {
    const user = await this.userService.getUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.getTokens(user);
  }

  async signUp(data: SignUpDto): Promise<SignInResponseDto> {
    const user = await this.userService.getUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('User already exist');
    }

    const hashPass = await bcrypt.hash(data.password, 10);
    const newUser = await this.userService.createUser(
      data.name,
      data.email,
      hashPass,
    );

    return this.getTokens(newUser);
  }

  private generateSecureToken(): string {
    return randomBytes(48).toString('base64url');
  }

  async getTokens(user: UserEntity): Promise<SignInResponseDto> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const refreshToken = new RefreshTokenEntity();
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    refreshToken.token = this.generateSecureToken();
    refreshToken.expires = expires;
    refreshToken.user = user;
    const newRefreshToken = await refreshToken.save();

    const accessToken = await this.jwtService.signAsync(payload);

    return new SignInResponseDto(accessToken, newRefreshToken.token);
  }

  async refreshToken(token: string): Promise<SignInResponseDto> {
    const now = new Date();
    const refToken = await this.refreshTokenRepo.findOne({
      relations: ['user'],
      where: { token, expires: MoreThan(now) },
    });

    if (!refToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.getTokens(refToken.user);
  }
}
