import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260616173146 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "conversation" drop constraint if exists "conversation_session_id_unique";`);
    this.addSql(`create table if not exists "conversation" ("id" text not null, "session_id" text not null, "status" text check ("status" in ('bot_active', 'agent_active', 'closed')) not null default 'bot_active', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "conversation_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_conversation_session_id_unique" ON "conversation" ("session_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_conversation_deleted_at" ON "conversation" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "message" ("id" text not null, "sender_type" text check ("sender_type" in ('user', 'bot', 'human_agent')) not null, "content" text not null, "conversation_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "message_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_message_conversation_id" ON "message" ("conversation_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_message_deleted_at" ON "message" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "message" add constraint "message_conversation_id_foreign" foreign key ("conversation_id") references "conversation" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "message" drop constraint if exists "message_conversation_id_foreign";`);

    this.addSql(`drop table if exists "conversation" cascade;`);

    this.addSql(`drop table if exists "message" cascade;`);
  }

}
