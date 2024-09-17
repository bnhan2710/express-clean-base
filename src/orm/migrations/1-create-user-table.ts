import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTable implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "username",
                    type: "varchar",
                    length: "255",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255"
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true
                },
                {
                    name: "fullName",
                    type: "varchar",
                    length: "255",
                    isNullable: true
                },
                {
                    name: "resetPasswordToken",
                    type: "varchar",
                    length: "255",
                    isNullable: true,
                    default: null
                },
                {
                    name: "resetPasswordExpires",
                    type: "datetime",
                    isNullable: true,
                    default: null
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}