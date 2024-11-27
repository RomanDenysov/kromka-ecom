import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'user', 'manager', 'author', 'partner');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'active', 'archived', 'sold');
  CREATE TYPE "public"."enum_orders_method" AS ENUM('store', 'card');
  CREATE TYPE "public"."enum_orders_payment_status" AS ENUM('pending', 'progress', 'completed', 'cancelled');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('new', 'processing', 'ready', 'complete', 'cancelled');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('published', 'draft', 'archived');
  CREATE TYPE "public"."enum_profiles_customer_options_method" AS ENUM('store', 'card');
  CREATE TYPE "public"."enum_supports_case" AS ENUM('shop', 'blog', 'b2b', 'weather', 'website', 'other');
  CREATE TYPE "public"."enum_supports_status" AS ENUM('new', 'processing', 'ready', 'complete', 'cancelled');
  CREATE TABLE IF NOT EXISTS "users_accounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" varchar NOT NULL,
  	"provider_account_id" varchar NOT NULL,
  	"type" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"session_token" varchar NOT NULL,
  	"expires" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_verification_tokens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"token" varchar NOT NULL,
  	"expires" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'user' NOT NULL,
  	"email" varchar NOT NULL,
  	"name" varchar,
  	"image" varchar,
  	"email_verified" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"descr" varchar NOT NULL,
  	"opts" varchar,
  	"status" "enum_products_status" DEFAULT 'draft' NOT NULL,
  	"category_id" uuid NOT NULL,
  	"price" numeric NOT NULL,
  	"opts_price" numeric,
  	"order" numeric DEFAULT 0,
  	"is_featured" boolean DEFAULT false,
  	"price_id" varchar,
  	"stripe_id" varchar,
  	"created_by_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders_product_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" uuid NOT NULL,
  	"quantity" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "orders" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" varchar,
  	"profile_id" uuid,
  	"pickup_store_id" uuid NOT NULL,
  	"pickup_date" timestamp(3) with time zone NOT NULL,
  	"method" "enum_orders_method" DEFAULT 'store' NOT NULL,
  	"payment_status" "enum_orders_payment_status" DEFAULT 'pending' NOT NULL,
  	"status" "enum_orders_status" DEFAULT 'new' NOT NULL,
  	"optional_price" numeric,
  	"total" numeric NOT NULL,
  	"_ispaid" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "carts_product_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" uuid NOT NULL,
  	"quantity" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "carts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" varchar NOT NULL,
  	"total" numeric NOT NULL,
  	"profile_id" uuid,
  	"link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "likes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "likes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" uuid,
  	"posts_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "posts" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"content" jsonb NOT NULL,
  	"status" "enum_posts_status" DEFAULT 'published',
  	"banner_id" uuid NOT NULL,
  	"is_featured" boolean DEFAULT false,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" uuid,
  	"posts_id" uuid,
  	"users_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "comments" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" varchar NOT NULL,
  	"comment" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "profiles" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" varchar,
  	"contacts_name" varchar,
  	"contacts_phone" varchar,
  	"contacts_email" varchar,
  	"customer_options_store_id" uuid,
  	"customer_options_method" "enum_profiles_customer_options_method",
  	"options_terms" boolean DEFAULT false NOT NULL,
  	"options_privacy" boolean DEFAULT false NOT NULL,
  	"options_cookie" boolean DEFAULT false NOT NULL,
  	"is_registered" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "supports" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"user_id" varchar,
  	"case" "enum_supports_case" DEFAULT 'shop' NOT NULL,
  	"status" "enum_supports_status" DEFAULT 'new',
  	"comment" varchar NOT NULL,
  	"contacts_phone" varchar,
  	"contacts_email" varchar NOT NULL,
  	"is_resolved" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tags" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"is_searchable" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"order" numeric DEFAULT 0,
  	"image_id" uuid NOT NULL,
  	"is_visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "stores_inventory" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" uuid NOT NULL,
  	"quantity" numeric NOT NULL,
  	"is_available" boolean DEFAULT true,
  	"stock_alert" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "stores" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"contacts_phone" varchar NOT NULL,
  	"contacts_email" varchar,
  	"working_hours_week" varchar NOT NULL,
  	"working_hours_saturday" varchar,
  	"working_hours_sunday" varchar,
  	"image_id" uuid NOT NULL,
  	"address" varchar NOT NULL,
  	"address_url" varchar NOT NULL,
  	"is_visible" boolean DEFAULT true,
  	"is_open" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "stores_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar,
  	"products_id" uuid,
  	"orders_id" uuid,
  	"carts_id" uuid,
  	"likes_id" uuid,
  	"media_id" uuid,
  	"posts_id" uuid,
  	"comments_id" uuid,
  	"profiles_id" uuid,
  	"supports_id" uuid,
  	"tags_id" uuid,
  	"categories_id" uuid,
  	"stores_id" uuid
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_verification_tokens" ADD CONSTRAINT "users_verification_tokens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images" ADD CONSTRAINT "products_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_images" ADD CONSTRAINT "products_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_users_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_product_items" ADD CONSTRAINT "orders_product_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_product_items" ADD CONSTRAINT "orders_product_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_pickup_store_id_stores_id_fk" FOREIGN KEY ("pickup_store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "carts_product_items" ADD CONSTRAINT "carts_product_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "carts_product_items" ADD CONSTRAINT "carts_product_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "carts" ADD CONSTRAINT "carts_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "likes_rels" ADD CONSTRAINT "likes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."likes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "likes_rels" ADD CONSTRAINT "likes_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "likes_rels" ADD CONSTRAINT "likes_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts" ADD CONSTRAINT "posts_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "profiles" ADD CONSTRAINT "profiles_customer_options_store_id_stores_id_fk" FOREIGN KEY ("customer_options_store_id") REFERENCES "public"."stores"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "supports" ADD CONSTRAINT "supports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stores_inventory" ADD CONSTRAINT "stores_inventory_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stores_inventory" ADD CONSTRAINT "stores_inventory_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stores" ADD CONSTRAINT "stores_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stores_rels" ADD CONSTRAINT "stores_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stores_rels" ADD CONSTRAINT "stores_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_likes_fk" FOREIGN KEY ("likes_id") REFERENCES "public"."likes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_profiles_fk" FOREIGN KEY ("profiles_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_supports_fk" FOREIGN KEY ("supports_id") REFERENCES "public"."supports"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stores_fk" FOREIGN KEY ("stores_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_accounts_order_idx" ON "users_accounts" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_accounts_parent_id_idx" ON "users_accounts" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_verification_tokens_order_idx" ON "users_verification_tokens" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "users_verification_tokens_parent_id_idx" ON "users_verification_tokens" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products_images_order_idx" ON "products_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_images_parent_id_idx" ON "products_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_images_image_idx" ON "products_images" USING btree ("image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "products_created_by_idx" ON "products" USING btree ("created_by_id");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "orders_product_items_order_idx" ON "orders_product_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "orders_product_items_parent_id_idx" ON "orders_product_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "orders_product_items_product_idx" ON "orders_product_items" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "orders_user_idx" ON "orders" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "orders_profile_idx" ON "orders" USING btree ("profile_id");
  CREATE INDEX IF NOT EXISTS "orders_pickup_store_idx" ON "orders" USING btree ("pickup_store_id");
  CREATE INDEX IF NOT EXISTS "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "carts_product_items_order_idx" ON "carts_product_items" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "carts_product_items_parent_id_idx" ON "carts_product_items" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "carts_product_items_product_idx" ON "carts_product_items" USING btree ("product_id");
  CREATE INDEX IF NOT EXISTS "carts_user_idx" ON "carts" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "carts_profile_idx" ON "carts" USING btree ("profile_id");
  CREATE INDEX IF NOT EXISTS "carts_updated_at_idx" ON "carts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "carts_created_at_idx" ON "carts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "likes_user_idx" ON "likes" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "likes_updated_at_idx" ON "likes" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "likes_created_at_idx" ON "likes" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "likes_rels_order_idx" ON "likes_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "likes_rels_parent_idx" ON "likes_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "likes_rels_path_idx" ON "likes_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "likes_rels_products_id_idx" ON "likes_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "likes_rels_posts_id_idx" ON "likes_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_banner_idx" ON "posts" USING btree ("banner_id");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "comments_user_idx" ON "comments" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "comments_created_at_idx" ON "comments" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "profiles_user_idx" ON "profiles" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "profiles_customer_options_customer_options_store_idx" ON "profiles" USING btree ("customer_options_store_id");
  CREATE INDEX IF NOT EXISTS "profiles_updated_at_idx" ON "profiles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "profiles_created_at_idx" ON "profiles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "supports_user_idx" ON "supports" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "supports_updated_at_idx" ON "supports" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "supports_created_at_idx" ON "supports" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tags_title_idx" ON "tags" USING btree ("title");
  CREATE UNIQUE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "stores_inventory_order_idx" ON "stores_inventory" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "stores_inventory_parent_id_idx" ON "stores_inventory" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "stores_inventory_product_idx" ON "stores_inventory" USING btree ("product_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "stores_slug_idx" ON "stores" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "stores_image_idx" ON "stores" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "stores_updated_at_idx" ON "stores" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "stores_created_at_idx" ON "stores" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "stores_rels_order_idx" ON "stores_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "stores_rels_parent_idx" ON "stores_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "stores_rels_path_idx" ON "stores_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "stores_rels_users_id_idx" ON "stores_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("carts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_likes_id_idx" ON "payload_locked_documents_rels" USING btree ("likes_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_profiles_id_idx" ON "payload_locked_documents_rels" USING btree ("profiles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_supports_id_idx" ON "payload_locked_documents_rels" USING btree ("supports_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_stores_id_idx" ON "payload_locked_documents_rels" USING btree ("stores_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "users_accounts" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users_verification_tokens" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "products_images" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "orders_product_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "carts_product_items" CASCADE;
  DROP TABLE "carts" CASCADE;
  DROP TABLE "likes" CASCADE;
  DROP TABLE "likes_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "comments" CASCADE;
  DROP TABLE "profiles" CASCADE;
  DROP TABLE "supports" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "stores_inventory" CASCADE;
  DROP TABLE "stores" CASCADE;
  DROP TABLE "stores_rels" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum_orders_method";
  DROP TYPE "public"."enum_orders_payment_status";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_profiles_customer_options_method";
  DROP TYPE "public"."enum_supports_case";
  DROP TYPE "public"."enum_supports_status";`)
}
