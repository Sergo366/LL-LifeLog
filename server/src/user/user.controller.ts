import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req): Promise<UserDto> {
    const user = await this.userService.getUserById(req.user.id);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return new UserDto(user);
  }
}
