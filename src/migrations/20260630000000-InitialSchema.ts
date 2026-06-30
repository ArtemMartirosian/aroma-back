import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

const PRODUCT_GENDER_ENUM = 'products_gender_enum';
const FRAGRANCE_TYPE_ENUM = 'products_fragrancetype_enum';
const LONGEVITY_ENUM = 'products_longevity_enum';
const SILLAGE_ENUM = 'products_sillage_enum';

export class InitialSchema20260630000000 implements MigrationInterface {
  name = 'InitialSchema20260630000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await this.ensureEnumTypes(queryRunner);
    await this.ensureBrandsTable(queryRunner);
    await this.ensureCategoriesTable(queryRunner);
    await this.ensureProductsTable(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "products"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "categories"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "brands"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "${SILLAGE_ENUM}"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "${LONGEVITY_ENUM}"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "${FRAGRANCE_TYPE_ENUM}"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "${PRODUCT_GENDER_ENUM}"`);
  }

  private async ensureEnumTypes(queryRunner: QueryRunner) {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${PRODUCT_GENDER_ENUM}') THEN
          CREATE TYPE "${PRODUCT_GENDER_ENUM}" AS ENUM ('male', 'female', 'unisex');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${FRAGRANCE_TYPE_ENUM}') THEN
          CREATE TYPE "${FRAGRANCE_TYPE_ENUM}" AS ENUM ('woody', 'floral', 'citrus', 'oriental', 'fresh', 'sweet', 'spicy');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${LONGEVITY_ENUM}') THEN
          CREATE TYPE "${LONGEVITY_ENUM}" AS ENUM ('low', 'medium', 'high', 'very_high');
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${SILLAGE_ENUM}') THEN
          CREATE TYPE "${SILLAGE_ENUM}" AS ENUM ('soft', 'medium', 'strong', 'very_strong');
        END IF;
      END
      $$;
    `);
  }

  private async ensureBrandsTable(queryRunner: QueryRunner) {
    const hasBrandsTable = await queryRunner.hasTable('brands');

    if (!hasBrandsTable) {
      await queryRunner.createTable(
        new Table({
          name: 'brands',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            { name: 'name', type: 'character varying', isUnique: true },
            { name: 'slug', type: 'character varying', isUnique: true },
            { name: 'logo', type: 'character varying', isNullable: true },
            { name: 'image', type: 'character varying', isNullable: true },
            { name: 'description', type: 'text', isNullable: true },
            { name: 'isActive', type: 'boolean', default: 'true' },
            { name: 'createdAt', type: 'timestamp', default: 'now()' },
            { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          ],
        }),
      );
      return;
    }

    await this.ensureColumn(
      queryRunner,
      'brands',
      new TableColumn({ name: 'logo', type: 'character varying', isNullable: true }),
    );
    await this.ensureColumn(
      queryRunner,
      'brands',
      new TableColumn({ name: 'image', type: 'character varying', isNullable: true }),
    );
    await this.ensureColumn(
      queryRunner,
      'brands',
      new TableColumn({ name: 'description', type: 'text', isNullable: true }),
    );
    await this.ensureColumn(
      queryRunner,
      'brands',
      new TableColumn({ name: 'isActive', type: 'boolean', default: 'true' }),
    );
    await this.ensureColumn(
      queryRunner,
      'brands',
      new TableColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' }),
    );
    await this.ensureColumn(
      queryRunner,
      'brands',
      new TableColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' }),
    );
    await this.ensureUnique(queryRunner, 'brands', 'UQ_brands_name', ['name']);
    await this.ensureUnique(queryRunner, 'brands', 'UQ_brands_slug', ['slug']);
  }

  private async ensureCategoriesTable(queryRunner: QueryRunner) {
    const hasCategoriesTable = await queryRunner.hasTable('categories');

    if (!hasCategoriesTable) {
      await queryRunner.createTable(
        new Table({
          name: 'categories',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            { name: 'name', type: 'character varying', isUnique: true },
            { name: 'slug', type: 'character varying', isUnique: true },
            { name: 'description', type: 'text', isNullable: true },
            { name: 'isActive', type: 'boolean', default: 'true' },
            { name: 'createdAt', type: 'timestamp', default: 'now()' },
            { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          ],
        }),
      );
      return;
    }

    await this.ensureColumn(
      queryRunner,
      'categories',
      new TableColumn({ name: 'description', type: 'text', isNullable: true }),
    );
    await this.ensureColumn(
      queryRunner,
      'categories',
      new TableColumn({ name: 'isActive', type: 'boolean', default: 'true' }),
    );
    await this.ensureColumn(
      queryRunner,
      'categories',
      new TableColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' }),
    );
    await this.ensureColumn(
      queryRunner,
      'categories',
      new TableColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' }),
    );
    await this.ensureUnique(
      queryRunner,
      'categories',
      'UQ_categories_name',
      ['name'],
    );
    await this.ensureUnique(
      queryRunner,
      'categories',
      'UQ_categories_slug',
      ['slug'],
    );
  }

  private async ensureProductsTable(queryRunner: QueryRunner) {
    const hasProductsTable = await queryRunner.hasTable('products');

    if (!hasProductsTable) {
      await queryRunner.createTable(
        new Table({
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            { name: 'name', type: 'character varying' },
            { name: 'slug', type: 'character varying', isUnique: true },
            { name: 'brandId', type: 'uuid' },
            { name: 'categoryId', type: 'uuid' },
            { name: 'price', type: 'numeric', precision: 12, scale: 2 },
            {
              name: 'oldPrice',
              type: 'numeric',
              precision: 12,
              scale: 2,
              isNullable: true,
            },
            { name: 'volume', type: 'character varying' },
            {
              name: 'gender',
              type: 'enum',
              enumName: PRODUCT_GENDER_ENUM,
              enum: ['male', 'female', 'unisex'],
              isNullable: true,
            },
            {
              name: 'fragranceType',
              type: 'enum',
              enumName: FRAGRANCE_TYPE_ENUM,
              enum: ['woody', 'floral', 'citrus', 'oriental', 'fresh', 'sweet', 'spicy'],
              isNullable: true,
            },
            { name: 'description', type: 'text' },
            { name: 'shortDescription', type: 'text' },
            { name: 'isFeatured', type: 'boolean', default: 'false' },
            { name: 'isNew', type: 'boolean', default: 'false' },
            { name: 'isActive', type: 'boolean', default: 'true' },
            { name: 'topNotes', type: 'text', isNullable: true },
            { name: 'middleNotes', type: 'text', isNullable: true },
            { name: 'baseNotes', type: 'text', isNullable: true },
            {
              name: 'longevity',
              type: 'enum',
              enumName: LONGEVITY_ENUM,
              enum: ['low', 'medium', 'high', 'very_high'],
              isNullable: true,
            },
            {
              name: 'sillage',
              type: 'enum',
              enumName: SILLAGE_ENUM,
              enum: ['soft', 'medium', 'strong', 'very_strong'],
              isNullable: true,
            },
            { name: 'concentration', type: 'character varying', isNullable: true },
            { name: 'country', type: 'character varying', isNullable: true },
            { name: 'releaseYear', type: 'integer', isNullable: true },
            { name: 'variants', type: 'jsonb', default: `'[]'::jsonb` },
            { name: 'createdAt', type: 'timestamp', default: 'now()' },
            { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          ],
          foreignKeys: [
            {
              columnNames: ['brandId'],
              referencedTableName: 'brands',
              referencedColumnNames: ['id'],
              onDelete: 'NO ACTION',
              onUpdate: 'NO ACTION',
            },
            {
              columnNames: ['categoryId'],
              referencedTableName: 'categories',
              referencedColumnNames: ['id'],
              onDelete: 'NO ACTION',
              onUpdate: 'NO ACTION',
            },
          ],
        }),
      );
      return;
    }

    await this.ensureColumn(
      queryRunner,
      'products',
      new TableColumn({ name: 'variants', type: 'jsonb', default: `'[]'::jsonb` }),
    );
    await this.ensureColumn(
      queryRunner,
      'products',
      new TableColumn({ name: 'createdAt', type: 'timestamp', default: 'now()' }),
    );
    await this.ensureColumn(
      queryRunner,
      'products',
      new TableColumn({ name: 'updatedAt', type: 'timestamp', default: 'now()' }),
    );
    await this.ensureUnique(queryRunner, 'products', 'UQ_products_slug', ['slug']);
    await this.ensureForeignKey(
      queryRunner,
      'products',
      'FK_products_brand',
      ['brandId'],
      'brands',
      ['id'],
    );
    await this.ensureForeignKey(
      queryRunner,
      'products',
      'FK_products_category',
      ['categoryId'],
      'categories',
      ['id'],
    );
  }

  private async ensureColumn(
    queryRunner: QueryRunner,
    tableName: string,
    column: TableColumn,
  ) {
    const hasColumn = await queryRunner.hasColumn(tableName, column.name);
    if (!hasColumn) {
      await queryRunner.addColumn(tableName, column);
    }
  }

  private async ensureUnique(
    queryRunner: QueryRunner,
    tableName: string,
    name: string,
    columnNames: string[],
  ) {
    const table = await queryRunner.getTable(tableName);
    if (!table) {
      return;
    }

    const hasUnique = table.uniques.some(
      (unique) =>
        unique.columnNames.length === columnNames.length &&
        columnNames.every((columnName) => unique.columnNames.includes(columnName)),
    );

    if (!hasUnique) {
      await queryRunner.createUniqueConstraint(
        tableName,
        new TableUnique({ name, columnNames }),
      );
    }
  }

  private async ensureForeignKey(
    queryRunner: QueryRunner,
    tableName: string,
    name: string,
    columnNames: string[],
    referencedTableName: string,
    referencedColumnNames: string[],
  ) {
    const table = await queryRunner.getTable(tableName);
    if (!table) {
      return;
    }

    const hasForeignKey = table.foreignKeys.some(
      (foreignKey) =>
        foreignKey.columnNames.length === columnNames.length &&
        columnNames.every((columnName) => foreignKey.columnNames.includes(columnName)),
    );

    if (!hasForeignKey) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          name,
          columnNames,
          referencedTableName,
          referencedColumnNames,
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }
}
