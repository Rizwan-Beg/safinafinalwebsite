import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260617083235 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "visualizer_result" ("id" text not null, "customer_id" text not null, "customer_name" text not null, "image_url" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "visualizer_result_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_visualizer_result_deleted_at" ON "visualizer_result" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "visualizer_result" cascade;`);
  }

}
