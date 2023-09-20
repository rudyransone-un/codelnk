import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { userRepositoryProvide } from './user.provide';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [userRepositoryProvide, UserService],
})
export class UserModule {}
