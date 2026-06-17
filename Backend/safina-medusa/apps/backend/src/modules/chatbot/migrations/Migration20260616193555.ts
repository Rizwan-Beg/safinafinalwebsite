import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260616193555 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "conversation" add column if not exists "customer_id" text null, add column if not exists "customer_name" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "conversation" drop column if exists "customer_id", drop column if exists "customer_name";`);
  }

}
