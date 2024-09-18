import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTokenTable implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tokens",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "token",
                    type: "varchar",
                    length: "255",
                    isUnique: true
                },
                {
                    name: "type",
                    type: "enum",
                    enum: ["refresh", "resetPassword", "verifyEmail"]
                },
                {
                    name: "expires",
                    type: "datetime",
                    isNullable: true,
                    default: null
                },
                {
                    name: "isBlacklisted",
                    type: "boolean",
                    default: false
                },
                {
                    name: "user_id",
                    type: "int",
                    isNullable: true
                }
            ]
        }), true);

        await queryRunner.createForeignKey("tokens", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tokens");
        if (!table) {
            throw new Error("Table 'tokens' not found");
        }
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("user_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("tokens", foreignKey);
        }

        await queryRunner.dropTable("tokens");
    }
}