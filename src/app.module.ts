import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CatalogSeedService } from './catalog-seed.service';
import { CategoriesModule } from './categories/categories.module';
import { createDatabaseOptions } from './database.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => createDatabaseOptions(),
    }),
    AuthModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CatalogSeedService],
})
export class AppModule {}
