import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { join } from 'node:path';
import { Brand } from './brands/entities/brand.entity';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';

const DEFAULT_DB_PORT = 5432;

export const databaseEntities = [Product, Brand, Category];

function asBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }

  return value === 'true';
}

function asNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function createDatabaseOptions(
  env: NodeJS.ProcessEnv = process.env,
): TypeOrmModuleOptions & DataSourceOptions {
  return {
    type: 'postgres',
    host: env.DB_HOST ?? 'localhost',
    port: asNumber(env.DB_PORT, DEFAULT_DB_PORT),
    username: env.DB_USERNAME ?? 'postgres',
    password: env.DB_PASSWORD ?? 'postgres',
    database: env.DB_DATABASE ?? 'aroma_perfume',
    entities: databaseEntities,
    migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations',
    migrationsRun: asBoolean(env.DB_MIGRATIONS_RUN, true),
    synchronize: false,
  };
}
