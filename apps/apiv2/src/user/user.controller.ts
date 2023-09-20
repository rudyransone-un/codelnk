import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

interface UserDto {
  email: string;
  username: string;
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getUsers() {
    const users = await this.userService.getAll();

    return {
      error: null,
      message: {
        users,
      },
    };
  }

  @Post('/create')
  async create(@Body() user: UserDto) {
    if (!user) return { error: 'Invalid request body', message: null };

    const newUser = await this.userService.create({ ...user });

    return {
      error: null,
      message: {
        userId: newUser.id,
      },
    };
  }
}
