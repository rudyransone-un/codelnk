import { DataSource, DataSourceOptions } from 'typeorm';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { DATABASE_PROVIDE } from '../constants';

export const databaseProvide: FactoryProvider = {
  provide: DATABASE_PROVIDE,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: 'db.sqlite3',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    } as DataSourceOptions);

    return dataSource.initialize();
  },
};
