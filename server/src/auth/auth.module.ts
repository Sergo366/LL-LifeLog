import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../shared/models/user.entity';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntity } from '../shared/models/refresh-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
