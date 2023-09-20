import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { USER_REPOSITORY_PROVIDE } from '../constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_PROVIDE) private userRepository: Repository<User>,
  ) {}

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    const createdUser = this.userRepository.create({
      email: user.email,
      username: user.username,
    });

    await this.userRepository.save(createdUser);

    return createdUser;
  }

  async getAll() {
    return this.userRepository.find();
  }
}
