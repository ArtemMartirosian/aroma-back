import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropProductShortDescription20260701000000
  implements MigrationInterface
{
  name = 'DropProductShortDescription20260701000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasProductsTable = await queryRunner.hasTable('products');
    if (!hasProductsTable) {
      return;
    }

    const hasShortDescription = await queryRunner.hasColumn(
      'products',
      'shortDescription',
    );
    if (hasShortDescription) {
      await queryRunner.dropColumn('products', 'shortDescription');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasProductsTable = await queryRunner.hasTable('products');
    if (!hasProductsTable) {
      return;
    }

    const hasShortDescription = await queryRunner.hasColumn(
      'products',
      'shortDescription',
    );
    if (!hasShortDescription) {
      await queryRunner.addColumn(
        'products',
        new TableColumn({
          name: 'shortDescription',
          type: 'text',
          isNullable: true,
        }),
      );
    }
  }
}
