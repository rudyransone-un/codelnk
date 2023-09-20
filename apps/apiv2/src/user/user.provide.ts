import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { DATABASE_PROVIDE, USER_REPOSITORY_PROVIDE } from '../constants';

export const userRepositoryProvide = {
  provide: USER_REPOSITORY_PROVIDE,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: [DATABASE_PROVIDE],
};
