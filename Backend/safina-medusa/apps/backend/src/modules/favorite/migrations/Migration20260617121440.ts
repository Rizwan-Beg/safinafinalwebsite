import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260617121440 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "favorite" ("id" text not null, "customer_id" text not null, "customer_name" text null, "customer_email" text null, "product_id" text not null, "product_handle" text not null, "product_title" text not null, "product_thumbnail" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "favorite_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_favorite_deleted_at" ON "favorite" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "favorite" cascade;`);
  }

}
