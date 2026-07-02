import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMultilingualContentColumns20260701110000
  implements MigrationInterface
{
  name = 'AddMultilingualContentColumns20260701110000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.addColumnIfMissing(
      queryRunner,
      'brands',
      new TableColumn({ name: 'nameRu', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'brands',
      new TableColumn({ name: 'nameEn', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'brands',
      new TableColumn({ name: 'descriptionRu', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'brands',
      new TableColumn({ name: 'descriptionEn', type: 'text', isNullable: true }),
    );

    await this.addColumnIfMissing(
      queryRunner,
      'categories',
      new TableColumn({ name: 'nameRu', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'categories',
      new TableColumn({ name: 'nameEn', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'categories',
      new TableColumn({ name: 'descriptionRu', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'categories',
      new TableColumn({ name: 'descriptionEn', type: 'text', isNullable: true }),
    );

    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'nameRu', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'nameEn', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'descriptionRu', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'descriptionEn', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'topNotesRu', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'topNotesEn', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'middleNotesRu', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'middleNotesEn', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'baseNotesRu', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'baseNotesEn', type: 'text', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'concentrationRu', type: 'character varying', isNullable: true }),
    );
    await this.addColumnIfMissing(
      queryRunner,
      'products',
      new TableColumn({ name: 'concentrationEn', type: 'character varying', isNullable: true }),
    );

    await queryRunner.query(`
      UPDATE "brands"
      SET "nameRu" = COALESCE("nameRu", "name"),
          "nameEn" = COALESCE("nameEn", "name"),
          "descriptionRu" = COALESCE("descriptionRu", "description"),
          "descriptionEn" = COALESCE("descriptionEn", "description")
    `);

    await queryRunner.query(`
      UPDATE "categories"
      SET "nameRu" = COALESCE("nameRu", "name"),
          "nameEn" = COALESCE("nameEn", "name"),
          "descriptionRu" = COALESCE("descriptionRu", "description"),
          "descriptionEn" = COALESCE("descriptionEn", "description")
    `);

    await queryRunner.query(`
      UPDATE "products"
      SET "nameRu" = COALESCE("nameRu", "name"),
          "nameEn" = COALESCE("nameEn", "name"),
          "descriptionRu" = COALESCE("descriptionRu", "description"),
          "descriptionEn" = COALESCE("descriptionEn", "description"),
          "topNotesRu" = COALESCE("topNotesRu", "topNotes"),
          "topNotesEn" = COALESCE("topNotesEn", "topNotes"),
          "middleNotesRu" = COALESCE("middleNotesRu", "middleNotes"),
          "middleNotesEn" = COALESCE("middleNotesEn", "middleNotes"),
          "baseNotesRu" = COALESCE("baseNotesRu", "baseNotes"),
          "baseNotesEn" = COALESCE("baseNotesEn", "baseNotes"),
          "concentrationRu" = COALESCE("concentrationRu", "concentration"),
          "concentrationEn" = COALESCE("concentrationEn", "concentration")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const [tableName, columnName] of [
      ['products', 'concentrationEn'],
      ['products', 'concentrationRu'],
      ['products', 'baseNotesEn'],
      ['products', 'baseNotesRu'],
      ['products', 'middleNotesEn'],
      ['products', 'middleNotesRu'],
      ['products', 'topNotesEn'],
      ['products', 'topNotesRu'],
      ['products', 'descriptionEn'],
      ['products', 'descriptionRu'],
      ['products', 'nameEn'],
      ['products', 'nameRu'],
      ['categories', 'descriptionEn'],
      ['categories', 'descriptionRu'],
      ['categories', 'nameEn'],
      ['categories', 'nameRu'],
      ['brands', 'descriptionEn'],
      ['brands', 'descriptionRu'],
      ['brands', 'nameEn'],
      ['brands', 'nameRu'],
    ] as const) {
      const hasColumn = await queryRunner.hasColumn(tableName, columnName);
      if (hasColumn) {
        await queryRunner.dropColumn(tableName, columnName);
      }
    }
  }

  private async addColumnIfMissing(
    queryRunner: QueryRunner,
    tableName: string,
    column: TableColumn,
  ) {
    const hasColumn = await queryRunner.hasColumn(tableName, column.name);
    if (!hasColumn) {
      await queryRunner.addColumn(tableName, column);
    }
  }
}
