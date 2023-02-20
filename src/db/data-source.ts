import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'db',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  // migrations: ['dist/db/migrations/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
