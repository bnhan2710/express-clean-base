
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "password",
            type: "varchar",
            length: "255",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
          },
          {
            name: "fullName",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}