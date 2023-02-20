import * as dotenv from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { DataSourceOptions, DataSource } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migration/*.js']
} as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;