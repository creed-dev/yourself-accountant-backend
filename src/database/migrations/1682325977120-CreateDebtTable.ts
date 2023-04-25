import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDebtTable1682325977120 implements MigrationInterface {
  name = 'CreateDebtTable1682325977120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`debt\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`name\` text NOT NULL, \`amount\` int UNSIGNED NOT NULL, \`type\` int NOT NULL, \`date\` date NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`debt\` ADD CONSTRAINT \`FK_ac2421cbb92ab160bea0a922491\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`debt\` DROP FOREIGN KEY \`FK_ac2421cbb92ab160bea0a922491\``,
    );
    await queryRunner.query(`DROP TABLE \`debt\``);
  }
}
