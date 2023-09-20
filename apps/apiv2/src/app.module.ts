import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
