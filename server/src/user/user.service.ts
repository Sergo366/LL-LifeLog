import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EUserRole, UserEntity } from '../shared/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getUserById(id: number) {
    return await this.userRepo.findOne({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo
      .findOne({
        where: { email },
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  async createUser(
    name: string,
    email: string,
    hashPass: string,
  ): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = email.trim().toLowerCase();
    user.name = name;
    user.password = hashPass;
    user.role = EUserRole.USER;

    return await user.save();
  }
}
