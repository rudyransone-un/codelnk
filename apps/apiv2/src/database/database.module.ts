import { Module } from '@nestjs/common';
import { databaseProvide } from './database.provide';

@Module({
  providers: [databaseProvide],
  exports: [databaseProvide],
})
export class DatabaseModule {}
