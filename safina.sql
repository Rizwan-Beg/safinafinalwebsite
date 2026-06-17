--
-- PostgreSQL database dump
--

\restrict RWgp3iRneqXkVtH2dO47kcGHPlsNSPpFBU8sCuFVLhfDy9OU9XYNXvunSzqNpMX

-- Dumped from database version 14.20 (Homebrew)
-- Dumped by pg_dump version 14.20 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: claim_reason_enum; Type: TYPE; Schema: public; Owner: rizwan
--

CREATE TYPE public.claim_reason_enum AS ENUM (
    'missing_item',
    'wrong_item',
    'production_failure',
    'other'
);


ALTER TYPE public.claim_reason_enum OWNER TO rizwan;

--
-- Name: order_claim_type_enum; Type: TYPE; Schema: public; Owner: rizwan
--

CREATE TYPE public.order_claim_type_enum AS ENUM (
    'refund',
    'replace'
);


ALTER TYPE public.order_claim_type_enum OWNER TO rizwan;

--
-- Name: order_status_enum; Type: TYPE; Schema: public; Owner: rizwan
--

CREATE TYPE public.order_status_enum AS ENUM (
    'pending',
    'completed',
    'draft',
    'archived',
    'canceled',
    'requires_action'
);


ALTER TYPE public.order_status_enum OWNER TO rizwan;

--
-- Name: return_status_enum; Type: TYPE; Schema: public; Owner: rizwan
--

CREATE TYPE public.return_status_enum AS ENUM (
    'open',
    'requested',
    'received',
    'partially_received',
    'canceled'
);


ALTER TYPE public.return_status_enum OWNER TO rizwan;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account_holder; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.account_holder (
    id text NOT NULL,
    provider_id text NOT NULL,
    external_id text NOT NULL,
    email text,
    data jsonb DEFAULT '{}'::jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.account_holder OWNER TO rizwan;

--
-- Name: announcement; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.announcement (
    id text NOT NULL,
    text text DEFAULT '🎉 40% OFF on Christmas Collection 🎉'::text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.announcement OWNER TO rizwan;

--
-- Name: api_key; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.api_key (
    id text NOT NULL,
    token text NOT NULL,
    salt text NOT NULL,
    redacted text NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    last_used_at timestamp with time zone,
    created_by text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_by text,
    revoked_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT api_key_type_check CHECK ((type = ANY (ARRAY['publishable'::text, 'secret'::text])))
);


ALTER TABLE public.api_key OWNER TO rizwan;

--
-- Name: application_method_buy_rules; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.application_method_buy_rules (
    application_method_id text NOT NULL,
    promotion_rule_id text NOT NULL
);


ALTER TABLE public.application_method_buy_rules OWNER TO rizwan;

--
-- Name: application_method_target_rules; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.application_method_target_rules (
    application_method_id text NOT NULL,
    promotion_rule_id text NOT NULL
);


ALTER TABLE public.application_method_target_rules OWNER TO rizwan;

--
-- Name: appointment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.appointment (
    id text NOT NULL,
    customer_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    date text NOT NULL,
    "time" text NOT NULL,
    notes text,
    status text DEFAULT 'Pending'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.appointment OWNER TO rizwan;

--
-- Name: auth_identity; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.auth_identity (
    id text NOT NULL,
    app_metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.auth_identity OWNER TO rizwan;

--
-- Name: capture; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.capture (
    id text NOT NULL,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    payment_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    created_by text,
    metadata jsonb
);


ALTER TABLE public.capture OWNER TO rizwan;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart (
    id text NOT NULL,
    region_id text,
    customer_id text,
    sales_channel_id text,
    email text,
    currency_code text NOT NULL,
    shipping_address_id text,
    billing_address_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    completed_at timestamp with time zone,
    locale text
);


ALTER TABLE public.cart OWNER TO rizwan;

--
-- Name: cart_address; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_address (
    id text NOT NULL,
    customer_id text,
    company text,
    first_name text,
    last_name text,
    address_1 text,
    address_2 text,
    city text,
    country_code text,
    province text,
    postal_code text,
    phone text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.cart_address OWNER TO rizwan;

--
-- Name: cart_line_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_line_item (
    id text NOT NULL,
    cart_id text NOT NULL,
    title text NOT NULL,
    subtitle text,
    thumbnail text,
    quantity integer NOT NULL,
    variant_id text,
    product_id text,
    product_title text,
    product_description text,
    product_subtitle text,
    product_type text,
    product_collection text,
    product_handle text,
    variant_sku text,
    variant_barcode text,
    variant_title text,
    variant_option_values jsonb,
    requires_shipping boolean DEFAULT true NOT NULL,
    is_discountable boolean DEFAULT true NOT NULL,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    compare_at_unit_price numeric,
    raw_compare_at_unit_price jsonb,
    unit_price numeric NOT NULL,
    raw_unit_price jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    product_type_id text,
    is_custom_price boolean DEFAULT false NOT NULL,
    is_giftcard boolean DEFAULT false NOT NULL,
    CONSTRAINT cart_line_item_unit_price_check CHECK ((unit_price >= (0)::numeric))
);


ALTER TABLE public.cart_line_item OWNER TO rizwan;

--
-- Name: cart_line_item_adjustment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_line_item_adjustment (
    id text NOT NULL,
    description text,
    promotion_id text,
    code text,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    provider_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    item_id text,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    CONSTRAINT cart_line_item_adjustment_check CHECK ((amount >= (0)::numeric))
);


ALTER TABLE public.cart_line_item_adjustment OWNER TO rizwan;

--
-- Name: cart_line_item_tax_line; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_line_item_tax_line (
    id text NOT NULL,
    description text,
    tax_rate_id text,
    code text NOT NULL,
    rate real NOT NULL,
    provider_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    item_id text
);


ALTER TABLE public.cart_line_item_tax_line OWNER TO rizwan;

--
-- Name: cart_payment_collection; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_payment_collection (
    cart_id character varying(255) NOT NULL,
    payment_collection_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.cart_payment_collection OWNER TO rizwan;

--
-- Name: cart_promotion; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_promotion (
    cart_id character varying(255) NOT NULL,
    promotion_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.cart_promotion OWNER TO rizwan;

--
-- Name: cart_shipping_method; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_shipping_method (
    id text NOT NULL,
    cart_id text NOT NULL,
    name text NOT NULL,
    description jsonb,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    shipping_option_id text,
    data jsonb,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT cart_shipping_method_check CHECK ((amount >= (0)::numeric))
);


ALTER TABLE public.cart_shipping_method OWNER TO rizwan;

--
-- Name: cart_shipping_method_adjustment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_shipping_method_adjustment (
    id text NOT NULL,
    description text,
    promotion_id text,
    code text,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    provider_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    shipping_method_id text
);


ALTER TABLE public.cart_shipping_method_adjustment OWNER TO rizwan;

--
-- Name: cart_shipping_method_tax_line; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.cart_shipping_method_tax_line (
    id text NOT NULL,
    description text,
    tax_rate_id text,
    code text NOT NULL,
    rate real NOT NULL,
    provider_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    shipping_method_id text
);


ALTER TABLE public.cart_shipping_method_tax_line OWNER TO rizwan;

--
-- Name: conversation; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.conversation (
    id text NOT NULL,
    session_id text NOT NULL,
    status text DEFAULT 'bot_active'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    customer_id text,
    customer_name text,
    CONSTRAINT conversation_status_check CHECK ((status = ANY (ARRAY['bot_active'::text, 'agent_active'::text, 'closed'::text])))
);


ALTER TABLE public.conversation OWNER TO rizwan;

--
-- Name: credit_line; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.credit_line (
    id text NOT NULL,
    cart_id text NOT NULL,
    reference text,
    reference_id text,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.credit_line OWNER TO rizwan;

--
-- Name: currency; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.currency (
    code text NOT NULL,
    symbol text NOT NULL,
    symbol_native text NOT NULL,
    decimal_digits integer DEFAULT 0 NOT NULL,
    rounding numeric DEFAULT 0 NOT NULL,
    raw_rounding jsonb NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.currency OWNER TO rizwan;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.customer (
    id text NOT NULL,
    company_name text,
    first_name text,
    last_name text,
    email text,
    phone text,
    has_account boolean DEFAULT false NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    created_by text
);


ALTER TABLE public.customer OWNER TO rizwan;

--
-- Name: customer_account_holder; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.customer_account_holder (
    customer_id character varying(255) NOT NULL,
    account_holder_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.customer_account_holder OWNER TO rizwan;

--
-- Name: customer_address; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.customer_address (
    id text NOT NULL,
    customer_id text NOT NULL,
    address_name text,
    is_default_shipping boolean DEFAULT false NOT NULL,
    is_default_billing boolean DEFAULT false NOT NULL,
    company text,
    first_name text,
    last_name text,
    address_1 text,
    address_2 text,
    city text,
    country_code text,
    province text,
    postal_code text,
    phone text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.customer_address OWNER TO rizwan;

--
-- Name: customer_group; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.customer_group (
    id text NOT NULL,
    name text NOT NULL,
    metadata jsonb,
    created_by text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.customer_group OWNER TO rizwan;

--
-- Name: customer_group_customer; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.customer_group_customer (
    id text NOT NULL,
    customer_id text NOT NULL,
    customer_group_id text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text,
    deleted_at timestamp with time zone
);


ALTER TABLE public.customer_group_customer OWNER TO rizwan;

--
-- Name: favorite; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.favorite (
    id text NOT NULL,
    customer_id text NOT NULL,
    customer_name text,
    customer_email text,
    product_id text NOT NULL,
    product_handle text NOT NULL,
    product_title text NOT NULL,
    product_thumbnail text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.favorite OWNER TO rizwan;

--
-- Name: fulfillment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.fulfillment (
    id text NOT NULL,
    location_id text NOT NULL,
    packed_at timestamp with time zone,
    shipped_at timestamp with time zone,
    delivered_at timestamp with time zone,
    canceled_at timestamp with time zone,
    data jsonb,
    provider_id text,
    shipping_option_id text,
    metadata jsonb,
    delivery_address_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    marked_shipped_by text,
    created_by text,
    requires_shipping boolean DEFAULT true NOT NULL
);


ALTER TABLE public.fulfillment OWNER TO rizwan;

--
-- Name: fulfillment_address; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.fulfillment_address (
    id text NOT NULL,
    company text,
    first_name text,
    last_name text,
    address_1 text,
    address_2 text,
    city text,
    country_code text,
    province text,
    postal_code text,
    phone text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.fulfillment_address OWNER TO rizwan;

--
-- Name: fulfillment_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.fulfillment_item (
    id text NOT NULL,
    title text NOT NULL,
    sku text NOT NULL,
    barcode text NOT NULL,
    quantity numeric NOT NULL,
    raw_quantity jsonb NOT NULL,
    line_item_id text,
    inventory_item_id text,
    fulfillment_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.fulfillment_item OWNER TO rizwan;

--
-- Name: fulfillment_label; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.fulfillment_label (
    id text NOT NULL,
    tracking_number text NOT NULL,
    tracking_url text NOT NULL,
    label_url text NOT NULL,
    fulfillment_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.fulfillment_label OWNER TO rizwan;

--
-- Name: fulfillment_provider; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.fulfillment_provider (
    id text NOT NULL,
    is_enabled boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.fulfillment_provider OWNER TO rizwan;

--
-- Name: fulfillment_set; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.fulfillment_set (
    id text NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.fulfillment_set OWNER TO rizwan;

--
-- Name: geo_zone; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.geo_zone (
    id text NOT NULL,
    type text DEFAULT 'country'::text NOT NULL,
    country_code text NOT NULL,
    province_code text,
    city text,
    service_zone_id text NOT NULL,
    postal_expression jsonb,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT geo_zone_type_check CHECK ((type = ANY (ARRAY['country'::text, 'province'::text, 'city'::text, 'zip'::text])))
);


ALTER TABLE public.geo_zone OWNER TO rizwan;

--
-- Name: image; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.image (
    id text NOT NULL,
    url text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    rank integer DEFAULT 0 NOT NULL,
    product_id text NOT NULL
);


ALTER TABLE public.image OWNER TO rizwan;

--
-- Name: inventory_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.inventory_item (
    id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    sku text,
    origin_country text,
    hs_code text,
    mid_code text,
    material text,
    weight integer,
    length integer,
    height integer,
    width integer,
    requires_shipping boolean DEFAULT true NOT NULL,
    description text,
    title text,
    thumbnail text,
    metadata jsonb
);


ALTER TABLE public.inventory_item OWNER TO rizwan;

--
-- Name: inventory_level; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.inventory_level (
    id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    inventory_item_id text NOT NULL,
    location_id text NOT NULL,
    stocked_quantity numeric DEFAULT 0 NOT NULL,
    reserved_quantity numeric DEFAULT 0 NOT NULL,
    incoming_quantity numeric DEFAULT 0 NOT NULL,
    metadata jsonb,
    raw_stocked_quantity jsonb,
    raw_reserved_quantity jsonb,
    raw_incoming_quantity jsonb
);


ALTER TABLE public.inventory_level OWNER TO rizwan;

--
-- Name: invite; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.invite (
    id text NOT NULL,
    email text NOT NULL,
    accepted boolean DEFAULT false NOT NULL,
    token text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.invite OWNER TO rizwan;

--
-- Name: invite_rbac_role; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.invite_rbac_role (
    invite_id character varying(255) NOT NULL,
    rbac_role_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.invite_rbac_role OWNER TO rizwan;

--
-- Name: link_module_migrations; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.link_module_migrations (
    id integer NOT NULL,
    table_name character varying(255) NOT NULL,
    link_descriptor jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.link_module_migrations OWNER TO rizwan;

--
-- Name: link_module_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.link_module_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.link_module_migrations_id_seq OWNER TO rizwan;

--
-- Name: link_module_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.link_module_migrations_id_seq OWNED BY public.link_module_migrations.id;


--
-- Name: location_fulfillment_provider; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.location_fulfillment_provider (
    stock_location_id character varying(255) NOT NULL,
    fulfillment_provider_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.location_fulfillment_provider OWNER TO rizwan;

--
-- Name: location_fulfillment_set; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.location_fulfillment_set (
    stock_location_id character varying(255) NOT NULL,
    fulfillment_set_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.location_fulfillment_set OWNER TO rizwan;

--
-- Name: message; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.message (
    id text NOT NULL,
    sender_type text NOT NULL,
    content text NOT NULL,
    conversation_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT message_sender_type_check CHECK ((sender_type = ANY (ARRAY['user'::text, 'bot'::text, 'human_agent'::text])))
);


ALTER TABLE public.message OWNER TO rizwan;

--
-- Name: mikro_orm_migrations; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.mikro_orm_migrations (
    id integer NOT NULL,
    name character varying(255),
    executed_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mikro_orm_migrations OWNER TO rizwan;

--
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.mikro_orm_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mikro_orm_migrations_id_seq OWNER TO rizwan;

--
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.mikro_orm_migrations_id_seq OWNED BY public.mikro_orm_migrations.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.notification (
    id text NOT NULL,
    "to" text NOT NULL,
    channel text NOT NULL,
    template text,
    data jsonb,
    trigger_type text,
    resource_id text,
    resource_type text,
    receiver_id text,
    original_notification_id text,
    idempotency_key text,
    external_id text,
    provider_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    status text DEFAULT 'pending'::text NOT NULL,
    "from" text,
    provider_data jsonb,
    CONSTRAINT notification_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'success'::text, 'failure'::text])))
);


ALTER TABLE public.notification OWNER TO rizwan;

--
-- Name: notification_provider; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.notification_provider (
    id text NOT NULL,
    handle text NOT NULL,
    name text NOT NULL,
    is_enabled boolean DEFAULT true NOT NULL,
    channels text[] DEFAULT '{}'::text[] NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.notification_provider OWNER TO rizwan;

--
-- Name: order; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public."order" (
    id text NOT NULL,
    region_id text,
    display_id integer,
    customer_id text,
    version integer DEFAULT 1 NOT NULL,
    sales_channel_id text,
    status public.order_status_enum DEFAULT 'pending'::public.order_status_enum NOT NULL,
    is_draft_order boolean DEFAULT false NOT NULL,
    email text,
    currency_code text NOT NULL,
    shipping_address_id text,
    billing_address_id text,
    no_notification boolean,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    canceled_at timestamp with time zone,
    custom_display_id text,
    locale text
);


ALTER TABLE public."order" OWNER TO rizwan;

--
-- Name: order_address; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_address (
    id text NOT NULL,
    customer_id text,
    company text,
    first_name text,
    last_name text,
    address_1 text,
    address_2 text,
    city text,
    country_code text,
    province text,
    postal_code text,
    phone text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_address OWNER TO rizwan;

--
-- Name: order_cart; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_cart (
    order_id character varying(255) NOT NULL,
    cart_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_cart OWNER TO rizwan;

--
-- Name: order_change; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_change (
    id text NOT NULL,
    order_id text NOT NULL,
    version integer NOT NULL,
    description text,
    status text DEFAULT 'pending'::text NOT NULL,
    internal_note text,
    created_by text,
    requested_by text,
    requested_at timestamp with time zone,
    confirmed_by text,
    confirmed_at timestamp with time zone,
    declined_by text,
    declined_reason text,
    metadata jsonb,
    declined_at timestamp with time zone,
    canceled_by text,
    canceled_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    change_type text,
    deleted_at timestamp with time zone,
    return_id text,
    claim_id text,
    exchange_id text,
    carry_over_promotions boolean,
    CONSTRAINT order_change_status_check CHECK ((status = ANY (ARRAY['confirmed'::text, 'declined'::text, 'requested'::text, 'pending'::text, 'canceled'::text])))
);


ALTER TABLE public.order_change OWNER TO rizwan;

--
-- Name: order_change_action; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_change_action (
    id text NOT NULL,
    order_id text,
    version integer,
    ordering bigint NOT NULL,
    order_change_id text,
    reference text,
    reference_id text,
    action text NOT NULL,
    details jsonb,
    amount numeric,
    raw_amount jsonb,
    internal_note text,
    applied boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    return_id text,
    claim_id text,
    exchange_id text
);


ALTER TABLE public.order_change_action OWNER TO rizwan;

--
-- Name: order_change_action_ordering_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.order_change_action_ordering_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_change_action_ordering_seq OWNER TO rizwan;

--
-- Name: order_change_action_ordering_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.order_change_action_ordering_seq OWNED BY public.order_change_action.ordering;


--
-- Name: order_claim; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_claim (
    id text NOT NULL,
    order_id text NOT NULL,
    return_id text,
    order_version integer NOT NULL,
    display_id integer NOT NULL,
    type public.order_claim_type_enum NOT NULL,
    no_notification boolean,
    refund_amount numeric,
    raw_refund_amount jsonb,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    canceled_at timestamp with time zone,
    created_by text
);


ALTER TABLE public.order_claim OWNER TO rizwan;

--
-- Name: order_claim_display_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.order_claim_display_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_claim_display_id_seq OWNER TO rizwan;

--
-- Name: order_claim_display_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.order_claim_display_id_seq OWNED BY public.order_claim.display_id;


--
-- Name: order_claim_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_claim_item (
    id text NOT NULL,
    claim_id text NOT NULL,
    item_id text NOT NULL,
    is_additional_item boolean DEFAULT false NOT NULL,
    reason public.claim_reason_enum,
    quantity numeric NOT NULL,
    raw_quantity jsonb NOT NULL,
    note text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_claim_item OWNER TO rizwan;

--
-- Name: order_claim_item_image; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_claim_item_image (
    id text NOT NULL,
    claim_item_id text NOT NULL,
    url text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_claim_item_image OWNER TO rizwan;

--
-- Name: order_credit_line; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_credit_line (
    id text NOT NULL,
    order_id text NOT NULL,
    reference text,
    reference_id text,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.order_credit_line OWNER TO rizwan;

--
-- Name: order_display_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.order_display_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_display_id_seq OWNER TO rizwan;

--
-- Name: order_display_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.order_display_id_seq OWNED BY public."order".display_id;


--
-- Name: order_exchange; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_exchange (
    id text NOT NULL,
    order_id text NOT NULL,
    return_id text,
    order_version integer NOT NULL,
    display_id integer NOT NULL,
    no_notification boolean,
    allow_backorder boolean DEFAULT false NOT NULL,
    difference_due numeric,
    raw_difference_due jsonb,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    canceled_at timestamp with time zone,
    created_by text
);


ALTER TABLE public.order_exchange OWNER TO rizwan;

--
-- Name: order_exchange_display_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.order_exchange_display_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_exchange_display_id_seq OWNER TO rizwan;

--
-- Name: order_exchange_display_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.order_exchange_display_id_seq OWNED BY public.order_exchange.display_id;


--
-- Name: order_exchange_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_exchange_item (
    id text NOT NULL,
    exchange_id text NOT NULL,
    item_id text NOT NULL,
    quantity numeric NOT NULL,
    raw_quantity jsonb NOT NULL,
    note text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_exchange_item OWNER TO rizwan;

--
-- Name: order_fulfillment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_fulfillment (
    order_id character varying(255) NOT NULL,
    fulfillment_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_fulfillment OWNER TO rizwan;

--
-- Name: order_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_item (
    id text NOT NULL,
    order_id text NOT NULL,
    version integer NOT NULL,
    item_id text NOT NULL,
    quantity numeric NOT NULL,
    raw_quantity jsonb NOT NULL,
    fulfilled_quantity numeric NOT NULL,
    raw_fulfilled_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    shipped_quantity numeric NOT NULL,
    raw_shipped_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    return_requested_quantity numeric NOT NULL,
    raw_return_requested_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    return_received_quantity numeric NOT NULL,
    raw_return_received_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    return_dismissed_quantity numeric NOT NULL,
    raw_return_dismissed_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    written_off_quantity numeric NOT NULL,
    raw_written_off_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    delivered_quantity numeric DEFAULT 0 NOT NULL,
    raw_delivered_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    unit_price numeric,
    raw_unit_price jsonb,
    compare_at_unit_price numeric,
    raw_compare_at_unit_price jsonb
);


ALTER TABLE public.order_item OWNER TO rizwan;

--
-- Name: order_line_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_line_item (
    id text NOT NULL,
    totals_id text,
    title text NOT NULL,
    subtitle text,
    thumbnail text,
    variant_id text,
    product_id text,
    product_title text,
    product_description text,
    product_subtitle text,
    product_type text,
    product_collection text,
    product_handle text,
    variant_sku text,
    variant_barcode text,
    variant_title text,
    variant_option_values jsonb,
    requires_shipping boolean DEFAULT true NOT NULL,
    is_discountable boolean DEFAULT true NOT NULL,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    compare_at_unit_price numeric,
    raw_compare_at_unit_price jsonb,
    unit_price numeric NOT NULL,
    raw_unit_price jsonb NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    is_custom_price boolean DEFAULT false NOT NULL,
    product_type_id text,
    is_giftcard boolean DEFAULT false NOT NULL
);


ALTER TABLE public.order_line_item OWNER TO rizwan;

--
-- Name: order_line_item_adjustment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_line_item_adjustment (
    id text NOT NULL,
    description text,
    promotion_id text,
    code text,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    provider_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    item_id text NOT NULL,
    deleted_at timestamp with time zone,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.order_line_item_adjustment OWNER TO rizwan;

--
-- Name: order_line_item_tax_line; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_line_item_tax_line (
    id text NOT NULL,
    description text,
    tax_rate_id text,
    code text NOT NULL,
    rate numeric NOT NULL,
    raw_rate jsonb NOT NULL,
    provider_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    item_id text NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_line_item_tax_line OWNER TO rizwan;

--
-- Name: order_payment_collection; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_payment_collection (
    order_id character varying(255) NOT NULL,
    payment_collection_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_payment_collection OWNER TO rizwan;

--
-- Name: order_promotion; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_promotion (
    order_id character varying(255) NOT NULL,
    promotion_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_promotion OWNER TO rizwan;

--
-- Name: order_shipping; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_shipping (
    id text NOT NULL,
    order_id text NOT NULL,
    version integer NOT NULL,
    shipping_method_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    return_id text,
    claim_id text,
    exchange_id text
);


ALTER TABLE public.order_shipping OWNER TO rizwan;

--
-- Name: order_shipping_method; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_shipping_method (
    id text NOT NULL,
    name text NOT NULL,
    description jsonb,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    shipping_option_id text,
    data jsonb,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    is_custom_amount boolean DEFAULT false NOT NULL
);


ALTER TABLE public.order_shipping_method OWNER TO rizwan;

--
-- Name: order_shipping_method_adjustment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_shipping_method_adjustment (
    id text NOT NULL,
    description text,
    promotion_id text,
    code text,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    provider_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    shipping_method_id text NOT NULL,
    deleted_at timestamp with time zone,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.order_shipping_method_adjustment OWNER TO rizwan;

--
-- Name: order_shipping_method_tax_line; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_shipping_method_tax_line (
    id text NOT NULL,
    description text,
    tax_rate_id text,
    code text NOT NULL,
    rate numeric NOT NULL,
    raw_rate jsonb NOT NULL,
    provider_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    shipping_method_id text NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_shipping_method_tax_line OWNER TO rizwan;

--
-- Name: order_summary; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_summary (
    id text NOT NULL,
    order_id text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    totals jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.order_summary OWNER TO rizwan;

--
-- Name: order_transaction; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.order_transaction (
    id text NOT NULL,
    order_id text NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    currency_code text NOT NULL,
    reference text,
    reference_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    return_id text,
    claim_id text,
    exchange_id text
);


ALTER TABLE public.order_transaction OWNER TO rizwan;

--
-- Name: payment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.payment (
    id text NOT NULL,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    currency_code text NOT NULL,
    provider_id text NOT NULL,
    data jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    captured_at timestamp with time zone,
    canceled_at timestamp with time zone,
    payment_collection_id text NOT NULL,
    payment_session_id text NOT NULL,
    metadata jsonb
);


ALTER TABLE public.payment OWNER TO rizwan;

--
-- Name: payment_collection; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.payment_collection (
    id text NOT NULL,
    currency_code text NOT NULL,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    authorized_amount numeric,
    raw_authorized_amount jsonb,
    captured_amount numeric,
    raw_captured_amount jsonb,
    refunded_amount numeric,
    raw_refunded_amount jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    completed_at timestamp with time zone,
    status text DEFAULT 'not_paid'::text NOT NULL,
    metadata jsonb,
    CONSTRAINT payment_collection_status_check CHECK ((status = ANY (ARRAY['not_paid'::text, 'awaiting'::text, 'authorized'::text, 'partially_authorized'::text, 'canceled'::text, 'failed'::text, 'partially_captured'::text, 'completed'::text])))
);


ALTER TABLE public.payment_collection OWNER TO rizwan;

--
-- Name: payment_collection_payment_providers; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.payment_collection_payment_providers (
    payment_collection_id text NOT NULL,
    payment_provider_id text NOT NULL
);


ALTER TABLE public.payment_collection_payment_providers OWNER TO rizwan;

--
-- Name: payment_provider; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.payment_provider (
    id text NOT NULL,
    is_enabled boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.payment_provider OWNER TO rizwan;

--
-- Name: payment_session; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.payment_session (
    id text NOT NULL,
    currency_code text NOT NULL,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    provider_id text NOT NULL,
    data jsonb DEFAULT '{}'::jsonb NOT NULL,
    context jsonb,
    status text DEFAULT 'pending'::text NOT NULL,
    authorized_at timestamp with time zone,
    payment_collection_id text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT payment_session_status_check CHECK ((status = ANY (ARRAY['authorized'::text, 'captured'::text, 'pending'::text, 'requires_more'::text, 'error'::text, 'canceled'::text])))
);


ALTER TABLE public.payment_session OWNER TO rizwan;

--
-- Name: price; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.price (
    id text NOT NULL,
    title text,
    price_set_id text NOT NULL,
    currency_code text NOT NULL,
    raw_amount jsonb NOT NULL,
    rules_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    price_list_id text,
    amount numeric NOT NULL,
    min_quantity numeric,
    max_quantity numeric,
    raw_min_quantity jsonb,
    raw_max_quantity jsonb
);


ALTER TABLE public.price OWNER TO rizwan;

--
-- Name: price_list; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.price_list (
    id text NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    starts_at timestamp with time zone,
    ends_at timestamp with time zone,
    rules_count integer DEFAULT 0,
    title text NOT NULL,
    description text NOT NULL,
    type text DEFAULT 'sale'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    metadata jsonb,
    CONSTRAINT price_list_status_check CHECK ((status = ANY (ARRAY['active'::text, 'draft'::text]))),
    CONSTRAINT price_list_type_check CHECK ((type = ANY (ARRAY['sale'::text, 'override'::text])))
);


ALTER TABLE public.price_list OWNER TO rizwan;

--
-- Name: price_list_rule; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.price_list_rule (
    id text NOT NULL,
    price_list_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    value jsonb,
    attribute text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.price_list_rule OWNER TO rizwan;

--
-- Name: price_preference; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.price_preference (
    id text NOT NULL,
    attribute text NOT NULL,
    value text,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.price_preference OWNER TO rizwan;

--
-- Name: price_rule; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.price_rule (
    id text NOT NULL,
    value text NOT NULL,
    priority integer DEFAULT 0 NOT NULL,
    price_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    attribute text DEFAULT ''::text NOT NULL,
    operator text DEFAULT 'eq'::text NOT NULL,
    CONSTRAINT price_rule_operator_check CHECK ((operator = ANY (ARRAY['gte'::text, 'lte'::text, 'gt'::text, 'lt'::text, 'eq'::text])))
);


ALTER TABLE public.price_rule OWNER TO rizwan;

--
-- Name: price_set; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.price_set (
    id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.price_set OWNER TO rizwan;

--
-- Name: product; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product (
    id text NOT NULL,
    title text NOT NULL,
    handle text NOT NULL,
    subtitle text,
    description text,
    is_giftcard boolean DEFAULT false NOT NULL,
    status text DEFAULT 'draft'::text NOT NULL,
    thumbnail text,
    weight real,
    length real,
    height real,
    width real,
    origin_country text,
    hs_code text,
    mid_code text,
    material text,
    collection_id text,
    type_id text,
    discountable boolean DEFAULT true NOT NULL,
    external_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    metadata jsonb,
    CONSTRAINT product_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'proposed'::text, 'published'::text, 'rejected'::text])))
);


ALTER TABLE public.product OWNER TO rizwan;

--
-- Name: product_category; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_category (
    id text NOT NULL,
    name text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    handle text NOT NULL,
    mpath text NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    is_internal boolean DEFAULT false NOT NULL,
    rank integer DEFAULT 0 NOT NULL,
    parent_category_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    metadata jsonb,
    external_id text
);


ALTER TABLE public.product_category OWNER TO rizwan;

--
-- Name: product_category_product; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_category_product (
    product_id text NOT NULL,
    product_category_id text NOT NULL
);


ALTER TABLE public.product_category_product OWNER TO rizwan;

--
-- Name: product_collection; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_collection (
    id text NOT NULL,
    title text NOT NULL,
    handle text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    external_id text
);


ALTER TABLE public.product_collection OWNER TO rizwan;

--
-- Name: product_option; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_option (
    id text NOT NULL,
    title text NOT NULL,
    product_id text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_option OWNER TO rizwan;

--
-- Name: product_option_value; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_option_value (
    id text NOT NULL,
    value text NOT NULL,
    option_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_option_value OWNER TO rizwan;

--
-- Name: product_sales_channel; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_sales_channel (
    product_id character varying(255) NOT NULL,
    sales_channel_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_sales_channel OWNER TO rizwan;

--
-- Name: product_shipping_profile; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_shipping_profile (
    product_id character varying(255) NOT NULL,
    shipping_profile_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_shipping_profile OWNER TO rizwan;

--
-- Name: product_tag; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_tag (
    id text NOT NULL,
    value text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    external_id text
);


ALTER TABLE public.product_tag OWNER TO rizwan;

--
-- Name: product_tags; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_tags (
    product_id text NOT NULL,
    product_tag_id text NOT NULL
);


ALTER TABLE public.product_tags OWNER TO rizwan;

--
-- Name: product_type; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_type (
    id text NOT NULL,
    value text NOT NULL,
    metadata json,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    external_id text
);


ALTER TABLE public.product_type OWNER TO rizwan;

--
-- Name: product_variant; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_variant (
    id text NOT NULL,
    title text NOT NULL,
    sku text,
    barcode text,
    ean text,
    upc text,
    allow_backorder boolean DEFAULT false NOT NULL,
    manage_inventory boolean DEFAULT true NOT NULL,
    hs_code text,
    origin_country text,
    mid_code text,
    material text,
    weight real,
    length real,
    height real,
    width real,
    metadata jsonb,
    variant_rank integer DEFAULT 0,
    product_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    thumbnail text
);


ALTER TABLE public.product_variant OWNER TO rizwan;

--
-- Name: product_variant_inventory_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_variant_inventory_item (
    variant_id character varying(255) NOT NULL,
    inventory_item_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    required_quantity integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_variant_inventory_item OWNER TO rizwan;

--
-- Name: product_variant_option; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_variant_option (
    variant_id text NOT NULL,
    option_value_id text NOT NULL
);


ALTER TABLE public.product_variant_option OWNER TO rizwan;

--
-- Name: product_variant_price_set; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_variant_price_set (
    variant_id character varying(255) NOT NULL,
    price_set_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_variant_price_set OWNER TO rizwan;

--
-- Name: product_variant_product_image; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.product_variant_product_image (
    id text NOT NULL,
    variant_id text NOT NULL,
    image_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.product_variant_product_image OWNER TO rizwan;

--
-- Name: promotion; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion (
    id text NOT NULL,
    code text NOT NULL,
    campaign_id text,
    is_automatic boolean DEFAULT false NOT NULL,
    type text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    status text DEFAULT 'draft'::text NOT NULL,
    is_tax_inclusive boolean DEFAULT false NOT NULL,
    "limit" integer,
    used integer DEFAULT 0 NOT NULL,
    metadata jsonb,
    CONSTRAINT promotion_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'inactive'::text]))),
    CONSTRAINT promotion_type_check CHECK ((type = ANY (ARRAY['standard'::text, 'buyget'::text])))
);


ALTER TABLE public.promotion OWNER TO rizwan;

--
-- Name: promotion_application_method; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_application_method (
    id text NOT NULL,
    value numeric,
    raw_value jsonb,
    max_quantity integer,
    apply_to_quantity integer,
    buy_rules_min_quantity integer,
    type text NOT NULL,
    target_type text NOT NULL,
    allocation text,
    promotion_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    currency_code text,
    CONSTRAINT promotion_application_method_allocation_check CHECK ((allocation = ANY (ARRAY['each'::text, 'across'::text, 'once'::text]))),
    CONSTRAINT promotion_application_method_target_type_check CHECK ((target_type = ANY (ARRAY['order'::text, 'shipping_methods'::text, 'items'::text]))),
    CONSTRAINT promotion_application_method_type_check CHECK ((type = ANY (ARRAY['fixed'::text, 'percentage'::text])))
);


ALTER TABLE public.promotion_application_method OWNER TO rizwan;

--
-- Name: promotion_campaign; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_campaign (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    campaign_identifier text NOT NULL,
    starts_at timestamp with time zone,
    ends_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.promotion_campaign OWNER TO rizwan;

--
-- Name: promotion_campaign_budget; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_campaign_budget (
    id text NOT NULL,
    type text NOT NULL,
    campaign_id text NOT NULL,
    "limit" numeric,
    raw_limit jsonb,
    used numeric DEFAULT 0 NOT NULL,
    raw_used jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    currency_code text,
    attribute text,
    CONSTRAINT promotion_campaign_budget_type_check CHECK ((type = ANY (ARRAY['spend'::text, 'usage'::text, 'use_by_attribute'::text, 'spend_by_attribute'::text])))
);


ALTER TABLE public.promotion_campaign_budget OWNER TO rizwan;

--
-- Name: promotion_campaign_budget_usage; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_campaign_budget_usage (
    id text NOT NULL,
    attribute_value text NOT NULL,
    used numeric DEFAULT 0 NOT NULL,
    budget_id text NOT NULL,
    raw_used jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.promotion_campaign_budget_usage OWNER TO rizwan;

--
-- Name: promotion_promotion_rule; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_promotion_rule (
    promotion_id text NOT NULL,
    promotion_rule_id text NOT NULL
);


ALTER TABLE public.promotion_promotion_rule OWNER TO rizwan;

--
-- Name: promotion_rule; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_rule (
    id text NOT NULL,
    description text,
    attribute text NOT NULL,
    operator text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT promotion_rule_operator_check CHECK ((operator = ANY (ARRAY['gte'::text, 'lte'::text, 'gt'::text, 'lt'::text, 'eq'::text, 'ne'::text, 'in'::text])))
);


ALTER TABLE public.promotion_rule OWNER TO rizwan;

--
-- Name: promotion_rule_value; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.promotion_rule_value (
    id text NOT NULL,
    promotion_rule_id text NOT NULL,
    value text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.promotion_rule_value OWNER TO rizwan;

--
-- Name: property_label; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.property_label (
    id text NOT NULL,
    entity text NOT NULL,
    property text NOT NULL,
    label text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.property_label OWNER TO rizwan;

--
-- Name: provider_identity; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.provider_identity (
    id text NOT NULL,
    entity_id text NOT NULL,
    provider text NOT NULL,
    auth_identity_id text NOT NULL,
    user_metadata jsonb,
    provider_metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.provider_identity OWNER TO rizwan;

--
-- Name: publishable_api_key_sales_channel; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.publishable_api_key_sales_channel (
    publishable_key_id character varying(255) NOT NULL,
    sales_channel_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.publishable_api_key_sales_channel OWNER TO rizwan;

--
-- Name: refund; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.refund (
    id text NOT NULL,
    amount numeric NOT NULL,
    raw_amount jsonb NOT NULL,
    payment_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    created_by text,
    metadata jsonb,
    refund_reason_id text,
    note text
);


ALTER TABLE public.refund OWNER TO rizwan;

--
-- Name: refund_reason; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.refund_reason (
    id text NOT NULL,
    label text NOT NULL,
    description text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    code text NOT NULL
);


ALTER TABLE public.refund_reason OWNER TO rizwan;

--
-- Name: region; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.region (
    id text NOT NULL,
    name text NOT NULL,
    currency_code text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    automatic_taxes boolean DEFAULT true NOT NULL
);


ALTER TABLE public.region OWNER TO rizwan;

--
-- Name: region_country; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.region_country (
    iso_2 text NOT NULL,
    iso_3 text NOT NULL,
    num_code text NOT NULL,
    name text NOT NULL,
    display_name text NOT NULL,
    region_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.region_country OWNER TO rizwan;

--
-- Name: region_payment_provider; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.region_payment_provider (
    region_id character varying(255) NOT NULL,
    payment_provider_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.region_payment_provider OWNER TO rizwan;

--
-- Name: reservation_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.reservation_item (
    id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    line_item_id text,
    location_id text NOT NULL,
    quantity numeric NOT NULL,
    external_id text,
    description text,
    created_by text,
    metadata jsonb,
    inventory_item_id text NOT NULL,
    allow_backorder boolean DEFAULT false,
    raw_quantity jsonb
);


ALTER TABLE public.reservation_item OWNER TO rizwan;

--
-- Name: return; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.return (
    id text NOT NULL,
    order_id text NOT NULL,
    claim_id text,
    exchange_id text,
    order_version integer NOT NULL,
    display_id integer NOT NULL,
    status public.return_status_enum DEFAULT 'open'::public.return_status_enum NOT NULL,
    no_notification boolean,
    refund_amount numeric,
    raw_refund_amount jsonb,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    received_at timestamp with time zone,
    canceled_at timestamp with time zone,
    location_id text,
    requested_at timestamp with time zone,
    created_by text
);


ALTER TABLE public.return OWNER TO rizwan;

--
-- Name: return_display_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.return_display_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.return_display_id_seq OWNER TO rizwan;

--
-- Name: return_display_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.return_display_id_seq OWNED BY public.return.display_id;


--
-- Name: return_fulfillment; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.return_fulfillment (
    return_id character varying(255) NOT NULL,
    fulfillment_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.return_fulfillment OWNER TO rizwan;

--
-- Name: return_item; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.return_item (
    id text NOT NULL,
    return_id text NOT NULL,
    reason_id text,
    item_id text NOT NULL,
    quantity numeric NOT NULL,
    raw_quantity jsonb NOT NULL,
    received_quantity numeric DEFAULT 0 NOT NULL,
    raw_received_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL,
    note text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    damaged_quantity numeric DEFAULT 0 NOT NULL,
    raw_damaged_quantity jsonb DEFAULT '{"value": "0", "precision": 20}'::jsonb NOT NULL
);


ALTER TABLE public.return_item OWNER TO rizwan;

--
-- Name: return_reason; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.return_reason (
    id character varying NOT NULL,
    value character varying NOT NULL,
    label character varying NOT NULL,
    description character varying,
    metadata jsonb,
    parent_return_reason_id character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.return_reason OWNER TO rizwan;

--
-- Name: sales_channel; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.sales_channel (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    is_disabled boolean DEFAULT false NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.sales_channel OWNER TO rizwan;

--
-- Name: sales_channel_stock_location; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.sales_channel_stock_location (
    sales_channel_id character varying(255) NOT NULL,
    stock_location_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.sales_channel_stock_location OWNER TO rizwan;

--
-- Name: script_migrations; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.script_migrations (
    id integer NOT NULL,
    script_name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    finished_at timestamp with time zone
);


ALTER TABLE public.script_migrations OWNER TO rizwan;

--
-- Name: script_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: rizwan
--

CREATE SEQUENCE public.script_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.script_migrations_id_seq OWNER TO rizwan;

--
-- Name: script_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rizwan
--

ALTER SEQUENCE public.script_migrations_id_seq OWNED BY public.script_migrations.id;


--
-- Name: service_zone; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.service_zone (
    id text NOT NULL,
    name text NOT NULL,
    metadata jsonb,
    fulfillment_set_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.service_zone OWNER TO rizwan;

--
-- Name: shipping_option; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.shipping_option (
    id text NOT NULL,
    name text NOT NULL,
    price_type text DEFAULT 'flat'::text NOT NULL,
    service_zone_id text NOT NULL,
    shipping_profile_id text,
    provider_id text,
    data jsonb,
    metadata jsonb,
    shipping_option_type_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT shipping_option_price_type_check CHECK ((price_type = ANY (ARRAY['calculated'::text, 'flat'::text])))
);


ALTER TABLE public.shipping_option OWNER TO rizwan;

--
-- Name: shipping_option_price_set; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.shipping_option_price_set (
    shipping_option_id character varying(255) NOT NULL,
    price_set_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.shipping_option_price_set OWNER TO rizwan;

--
-- Name: shipping_option_rule; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.shipping_option_rule (
    id text NOT NULL,
    attribute text NOT NULL,
    operator text NOT NULL,
    value jsonb,
    shipping_option_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT shipping_option_rule_operator_check CHECK ((operator = ANY (ARRAY['in'::text, 'eq'::text, 'ne'::text, 'gt'::text, 'gte'::text, 'lt'::text, 'lte'::text, 'nin'::text])))
);


ALTER TABLE public.shipping_option_rule OWNER TO rizwan;

--
-- Name: shipping_option_type; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.shipping_option_type (
    id text NOT NULL,
    label text NOT NULL,
    description text,
    code text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.shipping_option_type OWNER TO rizwan;

--
-- Name: shipping_profile; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.shipping_profile (
    id text NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.shipping_profile OWNER TO rizwan;

--
-- Name: stock_location; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.stock_location (
    id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    name text NOT NULL,
    address_id text,
    metadata jsonb
);


ALTER TABLE public.stock_location OWNER TO rizwan;

--
-- Name: stock_location_address; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.stock_location_address (
    id text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    address_1 text NOT NULL,
    address_2 text,
    company text,
    city text,
    country_code text NOT NULL,
    phone text,
    province text,
    postal_code text,
    metadata jsonb
);


ALTER TABLE public.stock_location_address OWNER TO rizwan;

--
-- Name: store; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.store (
    id text NOT NULL,
    name text DEFAULT 'Medusa Store'::text NOT NULL,
    default_sales_channel_id text,
    default_region_id text,
    default_location_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.store OWNER TO rizwan;

--
-- Name: store_currency; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.store_currency (
    id text NOT NULL,
    currency_code text NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    store_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.store_currency OWNER TO rizwan;

--
-- Name: store_locale; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.store_locale (
    id text NOT NULL,
    locale_code text NOT NULL,
    store_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.store_locale OWNER TO rizwan;

--
-- Name: tax_provider; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.tax_provider (
    id text NOT NULL,
    is_enabled boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.tax_provider OWNER TO rizwan;

--
-- Name: tax_rate; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.tax_rate (
    id text NOT NULL,
    rate real,
    code text NOT NULL,
    name text NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    is_combinable boolean DEFAULT false NOT NULL,
    tax_region_id text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text,
    deleted_at timestamp with time zone
);


ALTER TABLE public.tax_rate OWNER TO rizwan;

--
-- Name: tax_rate_rule; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.tax_rate_rule (
    id text NOT NULL,
    tax_rate_id text NOT NULL,
    reference_id text NOT NULL,
    reference text NOT NULL,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text,
    deleted_at timestamp with time zone
);


ALTER TABLE public.tax_rate_rule OWNER TO rizwan;

--
-- Name: tax_region; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.tax_region (
    id text NOT NULL,
    provider_id text,
    country_code text NOT NULL,
    province_code text,
    parent_id text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by text,
    deleted_at timestamp with time zone,
    CONSTRAINT "CK_tax_region_country_top_level" CHECK (((parent_id IS NULL) OR (province_code IS NOT NULL))),
    CONSTRAINT "CK_tax_region_provider_top_level" CHECK (((parent_id IS NULL) OR (provider_id IS NULL)))
);


ALTER TABLE public.tax_region OWNER TO rizwan;

--
-- Name: user; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public."user" (
    id text NOT NULL,
    first_name text,
    last_name text,
    email text NOT NULL,
    avatar_url text,
    metadata jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public."user" OWNER TO rizwan;

--
-- Name: user_preference; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.user_preference (
    id text NOT NULL,
    user_id text NOT NULL,
    key text NOT NULL,
    value jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.user_preference OWNER TO rizwan;

--
-- Name: user_rbac_role; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.user_rbac_role (
    user_id character varying(255) NOT NULL,
    rbac_role_id character varying(255) NOT NULL,
    id character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.user_rbac_role OWNER TO rizwan;

--
-- Name: view_configuration; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.view_configuration (
    id text NOT NULL,
    entity text NOT NULL,
    name text,
    user_id text,
    is_system_default boolean DEFAULT false NOT NULL,
    configuration jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.view_configuration OWNER TO rizwan;

--
-- Name: visualizer_result; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.visualizer_result (
    id text NOT NULL,
    customer_id text NOT NULL,
    customer_name text NOT NULL,
    image_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE public.visualizer_result OWNER TO rizwan;

--
-- Name: workflow_execution; Type: TABLE; Schema: public; Owner: rizwan
--

CREATE TABLE public.workflow_execution (
    id character varying NOT NULL,
    workflow_id character varying NOT NULL,
    transaction_id character varying NOT NULL,
    execution jsonb,
    context jsonb,
    state character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    retention_time integer,
    run_id text DEFAULT '01KRKAX63DN46WQZ48ECN6N5BW'::text NOT NULL
);


ALTER TABLE public.workflow_execution OWNER TO rizwan;

--
-- Name: link_module_migrations id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.link_module_migrations ALTER COLUMN id SET DEFAULT nextval('public.link_module_migrations_id_seq'::regclass);


--
-- Name: mikro_orm_migrations id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.mikro_orm_migrations ALTER COLUMN id SET DEFAULT nextval('public.mikro_orm_migrations_id_seq'::regclass);


--
-- Name: order display_id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public."order" ALTER COLUMN display_id SET DEFAULT nextval('public.order_display_id_seq'::regclass);


--
-- Name: order_change_action ordering; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_change_action ALTER COLUMN ordering SET DEFAULT nextval('public.order_change_action_ordering_seq'::regclass);


--
-- Name: order_claim display_id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_claim ALTER COLUMN display_id SET DEFAULT nextval('public.order_claim_display_id_seq'::regclass);


--
-- Name: order_exchange display_id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_exchange ALTER COLUMN display_id SET DEFAULT nextval('public.order_exchange_display_id_seq'::regclass);


--
-- Name: return display_id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.return ALTER COLUMN display_id SET DEFAULT nextval('public.return_display_id_seq'::regclass);


--
-- Name: script_migrations id; Type: DEFAULT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.script_migrations ALTER COLUMN id SET DEFAULT nextval('public.script_migrations_id_seq'::regclass);


--
-- Data for Name: account_holder; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.account_holder (id, provider_id, external_id, email, data, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: announcement; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.announcement (id, text, is_active, created_at, updated_at, deleted_at) FROM stdin;
01KVAQH5701YJ5NEN73BJMY7KS	now buy 2 get 1 free 	f	2026-06-17 17:35:09.985+05:30	2026-06-17 17:36:04.655+05:30	\N
\.


--
-- Data for Name: api_key; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.api_key (id, token, salt, redacted, title, type, last_used_at, created_by, created_at, revoked_by, revoked_at, updated_at, deleted_at) FROM stdin;
apk_01KRKAX8101BTF6FFC0QWAHNXS	pk_6033049652814f66dba4bb30372ac7f5a58e9efe12dc5ff5a5be87216753f42c		pk_603***42c	Default Publishable API Key	publishable	\N		2026-05-14 19:00:39.008+05:30	\N	\N	2026-05-14 19:00:39.008+05:30	\N
apk_01KRQHQVZE778J4KAMW4A34B7W	pk_bef9b9a943d98f2b9ff8ccca139e9d12570ad14c0c9c6b91bae85d93d0522c7f		pk_bef***c7f	carpetsapi	publishable	\N	user_01KRKDN2SH796294F8NGPNDGER	2026-05-16 10:17:00.591+05:30	\N	\N	2026-05-16 10:17:00.591+05:30	\N
\.


--
-- Data for Name: application_method_buy_rules; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.application_method_buy_rules (application_method_id, promotion_rule_id) FROM stdin;
\.


--
-- Data for Name: application_method_target_rules; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.application_method_target_rules (application_method_id, promotion_rule_id) FROM stdin;
\.


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.appointment (id, customer_name, email, phone, date, "time", notes, status, created_at, updated_at, deleted_at) FROM stdin;
01KVAM8N6T8H4JA72RBKW0X1D0	rehan beg	rehan.beg2000@gmail.com	9810510413	2026-06-17	12:00 PM	i am booking this meeting for rugs to see it live	Cancelled	2026-06-17 16:38:05.723+05:30	2026-06-17 16:43:17.768+05:30	\N
\.


--
-- Data for Name: auth_identity; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.auth_identity (id, app_metadata, created_at, updated_at, deleted_at) FROM stdin;
authid_01KRKBA1H06GH73DC08XGBW5A4	{"customer_id": "cus_01KRKBA1JG7MF1N9WVAD1H5CJB"}	2026-05-14 19:07:38.336+05:30	2026-05-14 19:07:38.392+05:30	\N
authid_01KRKD6K1DGC4XMCXN7HVP3V5R	{"user_id": "user_01KRKD6JWDJXPYSBX6A2ZAKDST"}	2026-05-14 19:40:42.349+05:30	2026-05-14 19:40:42.363+05:30	\N
authid_01KRKDN2W7KMMWASX37EFCV8MV	{"user_id": "user_01KRKDN2SH796294F8NGPNDGER"}	2026-05-14 19:48:37.319+05:30	2026-05-14 19:48:37.328+05:30	\N
authid_01KRQGM5HT4ZPHD8GHKKVF5J44	{"user_id": "user_01KRQGM5DKW67V876GZ6K0EESJ"}	2026-05-16 09:57:30.746+05:30	2026-05-16 09:57:30.756+05:30	\N
authid_01KRR2M3BSF6NPPZK224T21X00	\N	2026-05-16 15:12:02.873+05:30	2026-05-16 15:12:02.873+05:30	\N
authid_01KRR2MDWSGGDCQCDM1876ZE85	{"customer_id": "cus_01KRR2MEERQVEPBJ5QN5F8DJ1V"}	2026-05-16 15:12:13.657+05:30	2026-05-16 15:12:14.268+05:30	\N
authid_01KRR2XS998745FYNYWP63PT9P	{"customer_id": "cus_01KRR2XSTJ8SCJMR3GH9EM9JMW"}	2026-05-16 15:17:20.234+05:30	2026-05-16 15:17:20.792+05:30	\N
authid_01KRR32R5EJ9TNE33XS3TZBZP7	{"customer_id": "cus_01KRR32R60QYZKP37YDZ8WHDM5"}	2026-05-16 15:20:02.926+05:30	2026-05-16 15:20:02.948+05:30	\N
authid_01KRS3D97BTX5D2WT0YA1GP37Z	{"customer_id": "cus_01KRS3D9A4KZZDEV4C93QMQH6M"}	2026-05-17 00:45:02.507+05:30	2026-05-17 00:45:02.601+05:30	\N
authid_01KV8SQZ7V4TQRS7Q6FRCK8W2P	{"customer_id": "cus_01KV8SQZ9G625TQEEN0G2CHWT3"}	2026-06-16 23:35:21.532+05:30	2026-06-16 23:35:21.593+05:30	\N
\.


--
-- Data for Name: capture; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.capture (id, amount, raw_amount, payment_id, created_at, updated_at, deleted_at, created_by, metadata) FROM stdin;
\.


--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart (id, region_id, customer_id, sales_channel_id, email, currency_code, shipping_address_id, billing_address_id, metadata, created_at, updated_at, deleted_at, completed_at, locale) FROM stdin;
cart_01KRQHSCDNCHPR9G91WW3N1XPT	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 10:17:50.197+05:30	2026-05-16 10:17:50.197+05:30	\N	\N	\N
cart_01KRQHTHZ3S541N5B91NQ4S8A6	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 10:18:28.645+05:30	2026-05-16 10:18:28.645+05:30	\N	\N	\N
cart_01KRRCHGP38KMQ3133YH4YNRT4	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 18:05:23.971+05:30	2026-05-16 18:05:23.971+05:30	\N	\N	\N
cart_01KRQHTHZDBKJY3DBRSWX06G4H	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	usd	caaddr_01KRQQ8ES61AXT2SD7ESB7KQB4	\N	\N	2026-05-16 10:18:28.653+05:30	2026-05-16 11:53:27.015+05:30	\N	\N	\N
cart_01KRRCHGP3FK09BVJ2CKJBM8NZ	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 18:05:23.972+05:30	2026-05-16 18:05:23.972+05:30	\N	\N	\N
cart_01KRQKDTMFW9D61HKVMJJXK89X	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 10:46:28.688+05:30	2026-05-16 10:46:28.688+05:30	\N	\N	\N
cart_01KRRD7AZFJHB5BZQED5HEBSZ1	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 18:17:19.024+05:30	2026-05-16 18:17:19.024+05:30	\N	\N	\N
cart_01KST6JR55X6RTY5KE30GWZR15	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KST6JR563D6PK5YNT0HQTVPJ	\N	\N	2026-05-29 21:15:23.623+05:30	2026-05-29 21:15:23.623+05:30	\N	\N	\N
cart_01KV8NPBEZ73VX38D1594W2W0T	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KV8NPBF4KG2XWCDME29PP1DR	\N	\N	2026-06-16 22:24:34.212+05:30	2026-06-16 22:24:34.212+05:30	\N	\N	\N
cart_01KRR2B3S1ER3BXZQ6YS85S58T	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 15:07:08.398+05:30	2026-05-16 15:07:08.398+05:30	\N	\N	\N
cart_01KRRD7AZWHRZRYFAMWG81ZT3Z	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 18:17:19.036+05:30	2026-05-16 18:17:19.036+05:30	\N	\N	\N
cart_01KST6JR5AN6XH285Y8YK8VY13	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KST6JR5AZ7D2GCT7KSKGG0SP	\N	\N	2026-05-29 21:15:23.626+05:30	2026-05-29 21:15:23.626+05:30	\N	\N	\N
cart_01KV8S51MKSQ6047D4FKT980V3	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KV8S51MMRBR8AZSK8Q0569J0	\N	\N	2026-06-16 23:25:01.397+05:30	2026-06-16 23:25:01.397+05:30	\N	\N	\N
cart_01KVAGDE25S8CKBYPP2T97KSCP	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KVAGDE26AMW146BD8QGG3CDP	\N	\N	2026-06-17 15:30:47.942+05:30	2026-06-17 15:30:47.942+05:30	\N	\N	\N
cart_01KRR8Q22Q6ZRS626W72C0V72P	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 16:58:31.32+05:30	2026-05-16 16:58:31.32+05:30	\N	\N	\N
cart_01KRRD7B0MRKGQD1MF4GJ4Q7RD	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 18:17:19.06+05:30	2026-05-16 18:17:19.06+05:30	\N	\N	\N
cart_01KV8V0CBK3T2MVV0PNH1YBK8E	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KV8V0CBK2MXX205BN3211SRF	\N	\N	2026-06-16 23:57:25.683+05:30	2026-06-16 23:57:25.683+05:30	\N	\N	\N
cart_01KV8V0CB1GW7T9SYN42720AC5	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KV8V0CB2BGTPJF28XC42B376	\N	\N	2026-06-16 23:57:25.667+05:30	2026-06-16 23:57:25.667+05:30	\N	\N	\N
cart_01KVAGDE2DBJ4JWMJK23DNFJBD	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KVAGDE2E0TFYGKH9MA8SG0EJ	\N	\N	2026-06-17 15:30:47.95+05:30	2026-06-17 15:30:47.95+05:30	\N	\N	\N
cart_01KRR8Q230050HFMCY967EKVB4	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	usd	caaddr_01KRR8QTSZS0Q6HTERQK331NCF	\N	\N	2026-05-16 16:58:31.329+05:30	2026-05-16 16:58:56.64+05:30	\N	\N	\N
cart_01KVAR79NYTCDQBCWECEN0NNX1	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KVAR79NZWH4RQGPX9YFP4NEJ	\N	\N	2026-06-17 17:47:15.456+05:30	2026-06-17 17:47:15.456+05:30	\N	\N	\N
cart_01KVAR79P1Q3FE0N6225PAHT74	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KVAR79P2S2KEZ5E8V6ZM5N2C	\N	\N	2026-06-17 17:47:15.458+05:30	2026-06-17 17:47:15.458+05:30	\N	\N	\N
cart_01KRR945DWMW2NTY9MZ41CJR9H	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	cus_01KRR32R60QYZKP37YDZ8WHDM5	sc_01KRKAX80VSSFAHXGWHE3PJX51	rehan.beg2000@gmail.com	usd	caaddr_01KRR94P2EPMHDSZBN7CB9RVQ9	caaddr_01KRR94P2E64384NJNXNRE12VV	\N	2026-05-16 17:05:40.734+05:30	2026-05-16 17:05:57.774+05:30	\N	\N	\N
cart_01KRRXCTY2ED0GK85YHNRNF4YG	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KRRXCTY2F64P7HYRMG9KNX0J	\N	\N	2026-05-16 22:59:56.418+05:30	2026-05-16 22:59:56.418+05:30	\N	\N	\N
cart_01KRRXCTXRBMSXT35EYWQSRBKY	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KRRXCTXTT4PKH56MZEYGMJQ0	\N	\N	2026-05-16 22:59:56.411+05:30	2026-05-16 22:59:56.411+05:30	\N	\N	\N
cart_01KVAR79QT9VAEZXM2HZJMCERQ	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KVAR79QTW97C3QYMRNNMB5ZC	\N	\N	2026-06-17 17:47:15.514+05:30	2026-06-17 17:47:15.514+05:30	\N	\N	\N
cart_01KRR945EHRPWR574RYFRM1XA4	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:05:40.753+05:30	2026-05-16 17:05:40.753+05:30	\N	\N	\N
cart_01KRRXCV0PBDCHKW6FF112WSS9	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KRRXCV0Q8VABF7MMNE397DNM	\N	\N	2026-05-16 22:59:56.503+05:30	2026-05-16 22:59:56.503+05:30	\N	\N	\N
cart_01KVAR79R9ZSG4N9WT69KJBB6N	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KVAR79R9BD3KYXY7PWW00RQV	\N	\N	2026-06-17 17:47:15.529+05:30	2026-06-17 17:47:15.529+05:30	\N	\N	\N
cart_01KRR9KJRT16XEDGC5Q5BD3SA8	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	cus_01KRR32R60QYZKP37YDZ8WHDM5	sc_01KRKAX80VSSFAHXGWHE3PJX51	rehan.beg2000@gmail.com	usd	caaddr_01KRR9KXZTC92YS63VD99PDZBY	caaddr_01KRR9KXZTT9WY562TCX9C0173	\N	2026-05-16 17:14:05.915+05:30	2026-05-16 17:14:17.402+05:30	\N	\N	\N
cart_01KRRXCV10A957WXQ5C8WJ8SWR	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	inr	caaddr_01KRRXCV1022QP6YHWFAH5C5GG	\N	\N	2026-05-16 22:59:56.513+05:30	2026-05-16 22:59:56.513+05:30	\N	\N	\N
cart_01KRRA1S0TZQ7V5BNWC2W1RFQC	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:21:51.066+05:30	2026-05-16 17:21:51.066+05:30	\N	\N	\N
cart_01KRRA1S0H92HFPDQCE3F2X36D	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:21:51.058+05:30	2026-05-16 17:21:51.058+05:30	\N	\N	\N
cart_01KRRA1S0SGNKPX5QHVFYGGANN	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:21:51.065+05:30	2026-05-16 17:21:51.065+05:30	\N	\N	\N
cart_01KRRA1S0PWW317RQV71XEBRP0	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	cus_01KRR32R60QYZKP37YDZ8WHDM5	sc_01KRKAX80VSSFAHXGWHE3PJX51	rehan.beg2000@gmail.com	usd	caaddr_01KRRA63G2V0K2NY4Z7RFTA8FX	caaddr_01KRRA63G277Y8ZAX8H4YVMJ7N	\N	2026-05-16 17:21:51.062+05:30	2026-05-16 17:24:12.866+05:30	\N	\N	\N
cart_01KRRB0MRQDSSGDDMQV3BVHFMG	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:38:42.519+05:30	2026-05-16 17:38:42.519+05:30	\N	\N	\N
cart_01KRRB0MRGDH88M49GY3RWCW6J	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:38:42.514+05:30	2026-05-16 17:38:42.514+05:30	\N	\N	\N
cart_01KRRB0MSH9WEBC7VMRBQ1EKR4	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:38:42.545+05:30	2026-05-16 17:38:42.545+05:30	\N	\N	\N
cart_01KRRB0MSJNFDCG5XG5RZ5508T	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	usd	caaddr_01KRRB1DKBCQ59WNSGG6CW5XNE	\N	\N	2026-05-16 17:38:42.546+05:30	2026-05-16 17:39:07.947+05:30	\N	\N	\N
cart_01KRRBE5T6CAJZ7DHV2XEJJJ8W	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:46:05.958+05:30	2026-05-16 17:46:05.958+05:30	\N	\N	\N
cart_01KRRBE5T18HFER764DR559DY1	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:46:05.955+05:30	2026-05-16 17:46:05.955+05:30	\N	\N	\N
cart_01KRRBE5W2M95FYRH8MP3S46PV	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:46:06.018+05:30	2026-05-16 17:46:06.018+05:30	\N	\N	\N
cart_01KRRBQG8S37Z1256K4EHARFM0	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:51:11.578+05:30	2026-05-16 17:51:11.578+05:30	\N	\N	\N
cart_01KRRBQG8V6X09CJ0VEH191HHJ	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:51:11.579+05:30	2026-05-16 17:51:11.579+05:30	\N	\N	\N
cart_01KRRBQG9GYPEF60EVNNVFMH7K	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 17:51:11.6+05:30	2026-05-16 17:51:11.6+05:30	\N	\N	\N
cart_01KRRCHGNMNQZQWHR09PNZJXGJ	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 18:05:23.956+05:30	2026-05-16 18:05:23.956+05:30	\N	\N	\N
cart_01KRQHSCDK60FA28ZVSNHR6FNS	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	eur	\N	\N	\N	2026-05-16 10:17:50.196+05:30	2026-05-16 10:17:50.196+05:30	\N	\N	\N
\.


--
-- Data for Name: cart_address; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_address (id, customer_id, company, first_name, last_name, address_1, address_2, city, country_code, province, postal_code, phone, metadata, created_at, updated_at, deleted_at) FROM stdin;
caaddr_01KRQQ8ES61AXT2SD7ESB7KQB4	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 11:53:27.015+05:30	2026-05-16 11:53:27.015+05:30	\N
caaddr_01KRR8QTSZS0Q6HTERQK331NCF	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 16:58:56.639+05:30	2026-05-16 16:58:56.639+05:30	\N
caaddr_01KRR94HJM3M3GMN6TSE0RNTT0	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 17:05:53.172+05:30	2026-05-16 17:05:53.172+05:30	\N
caaddr_01KRR94P2E64384NJNXNRE12VV	\N	\N	\N	\N	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 17:05:57.774+05:30	2026-05-16 17:05:57.774+05:30	\N
caaddr_01KRR94P2EPMHDSZBN7CB9RVQ9	\N	\N	\N	\N	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 17:05:57.774+05:30	2026-05-16 17:05:57.774+05:30	\N
caaddr_01KRR9KR5HKQNJBNA9R01TBQ8K	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 17:14:11.441+05:30	2026-05-16 17:14:11.441+05:30	\N
caaddr_01KRR9KXZTT9WY562TCX9C0173	\N	\N	\N	\N	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 17:14:17.402+05:30	2026-05-16 17:14:17.402+05:30	\N
caaddr_01KRR9KXZTC92YS63VD99PDZBY	\N	\N	\N	\N	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 17:14:17.402+05:30	2026-05-16 17:14:17.402+05:30	\N
caaddr_01KRRA5Z4SNB82D7WAQ6BGEDRF	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 17:24:08.41+05:30	2026-05-16 17:24:08.41+05:30	\N
caaddr_01KRRA63G277Y8ZAX8H4YVMJ7N	\N	\N	\N	\N	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 17:24:12.866+05:30	2026-05-16 17:24:12.866+05:30	\N
caaddr_01KRRA63G2V0K2NY4Z7RFTA8FX	\N	\N	\N	\N	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 17:24:12.866+05:30	2026-05-16 17:24:12.866+05:30	\N
caaddr_01KRRB1DKBCQ59WNSGG6CW5XNE	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 17:39:07.947+05:30	2026-05-16 17:39:07.947+05:30	\N
caaddr_01KRRBJMDDES9FTS2FEX0136VW	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 17:48:31.981+05:30	2026-05-16 17:48:31.981+05:30	\N
caaddr_01KRRCB6B5JPYKCT43B39HPCWQ	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 18:01:56.774+05:30	2026-05-16 18:01:56.774+05:30	\N
caaddr_01KRRD2SE0GH81KN50NJGMWVT5	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 18:14:49.984+05:30	2026-05-16 18:14:49.984+05:30	\N
caaddr_01KRREZH6A0AZBETX0VA42Y2C5	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 18:48:00.394+05:30	2026-05-16 18:48:00.394+05:30	\N
caaddr_01KRREZHF13A857SFS5K75R42T	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 18:48:00.673+05:30	2026-05-16 18:48:00.673+05:30	\N
caaddr_01KRREZVP1444D234769VK729D	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 18:48:11.138+05:30	2026-05-16 18:48:11.138+05:30	\N
caaddr_01KRREZVZTEFDTTACZAWR6JH63	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 18:48:11.45+05:30	2026-05-16 18:48:11.45+05:30	\N
caaddr_01KRRG2M5H81Z6PYER6MEJFA4C	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 19:07:10.321+05:30	2026-05-16 19:07:10.321+05:30	\N
caaddr_01KRRG2MFDRQS4FASDVGVGMP56	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 19:07:10.638+05:30	2026-05-16 19:07:10.638+05:30	\N
caaddr_01KRRJYS8MVNYMJRQM13V273ZS	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 19:57:30.196+05:30	2026-05-16 19:57:30.196+05:30	\N
caaddr_01KRRJYSJ77A27P8ZQH9MES5JW	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 19:57:30.503+05:30	2026-05-16 19:57:30.503+05:30	\N
caaddr_01KRRXCTXTT4PKH56MZEYGMJQ0	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 22:59:56.411+05:30	2026-05-16 22:59:56.411+05:30	\N
caaddr_01KRRXCTY2F64P7HYRMG9KNX0J	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 22:59:56.418+05:30	2026-05-16 22:59:56.418+05:30	\N
caaddr_01KRRXCV0Q8VABF7MMNE397DNM	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 22:59:56.503+05:30	2026-05-16 22:59:56.503+05:30	\N
caaddr_01KRRXCV1022QP6YHWFAH5C5GG	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 22:59:56.512+05:30	2026-05-16 22:59:56.512+05:30	\N
caaddr_01KRRYDTQZ0TD3B7VNW7E01R5F	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-16 23:17:57.567+05:30	2026-05-16 23:17:57.567+05:30	\N
caaddr_01KRRYE7N57ED91D93FN5FFGHX	\N	\N	Test	Customer	123 Safina Lane	\N	New Delhi	in	Delhi	110001	9876543210	\N	2026-05-16 23:18:10.789+05:30	2026-05-16 23:18:10.789+05:30	\N
caaddr_01KST6JR563D6PK5YNT0HQTVPJ	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-29 21:15:23.623+05:30	2026-05-29 21:15:23.623+05:30	\N
caaddr_01KST6JR5AZ7D2GCT7KSKGG0SP	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-05-29 21:15:23.626+05:30	2026-05-29 21:15:23.626+05:30	\N
caaddr_01KV8NPBF4KG2XWCDME29PP1DR	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-16 22:24:34.212+05:30	2026-06-16 22:24:34.212+05:30	\N
caaddr_01KV8S51MMRBR8AZSK8Q0569J0	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-16 23:25:01.397+05:30	2026-06-16 23:25:01.397+05:30	\N
caaddr_01KV8V0CBK2MXX205BN3211SRF	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-16 23:57:25.683+05:30	2026-06-16 23:57:25.683+05:30	\N
caaddr_01KV8V0CB2BGTPJF28XC42B376	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-16 23:57:25.667+05:30	2026-06-16 23:57:25.667+05:30	\N
caaddr_01KVA8TXZC849KS66TPHN3BFGJ	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 13:18:21.612+05:30	2026-06-17 13:18:21.612+05:30	\N
caaddr_01KVAGDE26AMW146BD8QGG3CDP	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 15:30:47.942+05:30	2026-06-17 15:30:47.942+05:30	\N
caaddr_01KVAGDE2E0TFYGKH9MA8SG0EJ	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 15:30:47.95+05:30	2026-06-17 15:30:47.95+05:30	\N
caaddr_01KVAR79P2S2KEZ5E8V6ZM5N2C	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 17:47:15.458+05:30	2026-06-17 17:47:15.458+05:30	\N
caaddr_01KVAR79NZWH4RQGPX9YFP4NEJ	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 17:47:15.455+05:30	2026-06-17 17:47:15.455+05:30	\N
caaddr_01KVAR79QTW97C3QYMRNNMB5ZC	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 17:47:15.514+05:30	2026-06-17 17:47:15.514+05:30	\N
caaddr_01KVAR79R9BD3KYXY7PWW00RQV	\N	\N	\N	\N	\N	\N	\N	in	\N	\N	\N	\N	2026-06-17 17:47:15.529+05:30	2026-06-17 17:47:15.529+05:30	\N
\.


--
-- Data for Name: cart_line_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_line_item (id, cart_id, title, subtitle, thumbnail, quantity, variant_id, product_id, product_title, product_description, product_subtitle, product_type, product_collection, product_handle, variant_sku, variant_barcode, variant_title, variant_option_values, requires_shipping, is_discountable, is_tax_inclusive, compare_at_unit_price, raw_compare_at_unit_price, unit_price, raw_unit_price, metadata, created_at, updated_at, deleted_at, product_type_id, is_custom_price, is_giftcard) FROM stdin;
cali_01KRR9KK1J697QE3XSYVQSWA0Y	cart_01KRR9KJRT16XEDGC5Q5BD3SA8	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	10	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 17:14:06.194+05:30	2026-05-16 17:14:11.496+05:30	\N	\N	f	f
cali_01KRQJ98ZXB5H4S5NM6JJGSC50	cart_01KRQHTHZDBKJY3DBRSWX06G4H	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	1	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	10	{"value": "10", "precision": 20}	{}	2026-05-16 10:26:30.973+05:30	2026-05-16 10:44:30.966+05:30	2026-05-16 10:44:30.963+05:30	\N	f	f
cali_01KRRA5R3A5CAYV39E398HXMYD	cart_01KRRA1S0PWW317RQV71XEBRP0	Medusa Shorts	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png	10	variant_01KRKAX87E1B87QYMX0YHM2QE1	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	Medusa Shorts	Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.	\N	\N	\N	shorts	SHORTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 17:24:01.195+05:30	2026-05-16 17:24:08.463+05:30	\N	\N	f	f
cali_01KRR8Q4JB3Z73P4H8YMRE1B5E	cart_01KRR8Q230050HFMCY967EKVB4	Medusa Shorts	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png	13	variant_01KRKAX87E1B87QYMX0YHM2QE1	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	Medusa Shorts	Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.	\N	\N	\N	shorts	SHORTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 16:58:33.867+05:30	2026-05-16 16:58:56.678+05:30	\N	\N	f	f
cali_01KRQQ886ATQ7ZBRAFQ3WH3CA1	cart_01KRQHTHZDBKJY3DBRSWX06G4H	Medusa T-Shirt	L / Black	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png	1	variant_01KRKAX87D771CKZ4VCV4T3X7E	prod_01KRKAX85SW40G1WEE2Z9MDAEB	Medusa T-Shirt	Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.	\N	\N	\N	t-shirt	SHIRT-L-BLACK	\N	L / Black	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 11:53:20.266+05:30	2026-05-16 14:57:45.949+05:30	2026-05-16 14:57:45.947+05:30	\N	f	f
cali_01KRQN6W23EA1DVP7Y15ZVR9RX	cart_01KRQHTHZDBKJY3DBRSWX06G4H	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	8	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 11:17:37.924+05:30	2026-05-16 16:34:53.655+05:30	\N	\N	f	f
cali_01KRR948DSNCH9NDT892BH33P0	cart_01KRR945DWMW2NTY9MZ41CJR9H	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	11	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 17:05:43.801+05:30	2026-05-16 17:05:53.216+05:30	\N	\N	f	f
cali_01KRRB14D0BGRNSC117A29ZPHV	cart_01KRRB0MSJNFDCG5XG5RZ5508T	Medusa Shorts	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png	12	variant_01KRKAX87E1B87QYMX0YHM2QE1	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	Medusa Shorts	Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.	\N	\N	\N	shorts	SHORTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 17:38:58.528+05:30	2026-05-16 17:39:07.98+05:30	\N	\N	f	f
cali_01KVAGWBA4NCF950JJSK5WCG83	cart_01KST6JR5AN6XH285Y8YK8VY13	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	2	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	10000	{"value": "10000", "precision": 20}	{}	2026-06-17 15:38:56.644+05:30	2026-06-17 15:43:30.486+05:30	\N	\N	f	f
cali_01KST6KB58CWDJYNAYVFAKYQVF	cart_01KST6JR5AN6XH285Y8YK8VY13	sdfsdf	Default variant	http://localhost:9000/static/1778940493345-WhatsApp%20Image%202026-04-07%20at%2017.18.26.jpeg	1	variant_01KRRHVFJXJS8T70KSZB4MM7C7	prod_01KRRHVFHKZNFNS6D1DW50VH43	sdfsdf	asfdsdf		\N	8X10	sdfsdf	\N	\N	Default variant	\N	t	t	f	\N	\N	20000	{"value": "20000", "precision": 20}	{}	2026-05-29 21:15:43.08+05:30	2026-05-29 21:18:34.857+05:30	\N	\N	f	f
\.


--
-- Data for Name: cart_line_item_adjustment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_line_item_adjustment (id, description, promotion_id, code, amount, raw_amount, provider_id, metadata, created_at, updated_at, deleted_at, item_id, is_tax_inclusive) FROM stdin;
\.


--
-- Data for Name: cart_line_item_tax_line; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_line_item_tax_line (id, description, tax_rate_id, code, rate, provider_id, metadata, created_at, updated_at, deleted_at, item_id) FROM stdin;
\.


--
-- Data for Name: cart_payment_collection; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_payment_collection (cart_id, payment_collection_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: cart_promotion; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_promotion (cart_id, promotion_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: cart_shipping_method; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_shipping_method (id, cart_id, name, description, amount, raw_amount, is_tax_inclusive, shipping_option_id, data, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: cart_shipping_method_adjustment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_shipping_method_adjustment (id, description, promotion_id, code, amount, raw_amount, provider_id, metadata, created_at, updated_at, deleted_at, shipping_method_id) FROM stdin;
\.


--
-- Data for Name: cart_shipping_method_tax_line; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.cart_shipping_method_tax_line (id, description, tax_rate_id, code, rate, provider_id, metadata, created_at, updated_at, deleted_at, shipping_method_id) FROM stdin;
\.


--
-- Data for Name: conversation; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.conversation (id, session_id, status, created_at, updated_at, deleted_at, customer_id, customer_name) FROM stdin;
01KV8ZBKTED0MVFJ2D3BP1B6SF	user-ju3o2v	agent_active	2026-06-17 01:13:28.079+05:30	2026-06-17 01:13:40.679+05:30	\N	cus_01KV8SQZ9G625TQEEN0G2CHWT3	Rizwan -
01KVA8XYJY1DEAD7P1DHNZGZKA	user-21pej4	agent_active	2026-06-17 13:20:00.543+05:30	2026-06-17 13:20:07.962+05:30	\N	cus_01KV8SQZ9G625TQEEN0G2CHWT3	Rizwan -
01KVAMKGZXB7ZPPVN26QPD1MB4	user-144l8q	agent_active	2026-06-17 16:44:01.853+05:30	2026-06-17 16:44:01.853+05:30	\N	cus_01KRR32R60QYZKP37YDZ8WHDM5	rehan beg
01KVANBYRHQSKA5SK6A2WG1V11	test-456	bot_active	2026-06-17 16:57:22.387+05:30	2026-06-17 16:57:22.387+05:30	\N	test	Test
01KVANKCMNQE8T3HT2DR61MTK1	user-5j6ltg	agent_active	2026-06-17 17:01:25.973+05:30	2026-06-17 17:01:29.414+05:30	\N	cus_01KRR32R60QYZKP37YDZ8WHDM5	rehan beg
01KVAP3KDBM6GWXBYTBBBPEHVE	user-2r06f	bot_active	2026-06-17 17:10:17.196+05:30	2026-06-17 17:12:15.514+05:30	\N	cus_01KRR32R60QYZKP37YDZ8WHDM5	rehan beg
\.


--
-- Data for Name: credit_line; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.credit_line (id, cart_id, reference, reference_id, amount, raw_amount, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: currency; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.currency (code, symbol, symbol_native, decimal_digits, rounding, raw_rounding, name, created_at, updated_at, deleted_at) FROM stdin;
usd	$	$	2	0	{"value": "0", "precision": 20}	US Dollar	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
cad	CA$	$	2	0	{"value": "0", "precision": 20}	Canadian Dollar	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
eur	€	€	2	0	{"value": "0", "precision": 20}	Euro	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
aed	AED	د.إ.‏	2	0	{"value": "0", "precision": 20}	United Arab Emirates Dirham	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
afn	Af	؋	0	0	{"value": "0", "precision": 20}	Afghan Afghani	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
all	ALL	Lek	0	0	{"value": "0", "precision": 20}	Albanian Lek	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
amd	AMD	դր.	0	0	{"value": "0", "precision": 20}	Armenian Dram	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
ars	AR$	$	2	0	{"value": "0", "precision": 20}	Argentine Peso	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
aud	AU$	$	2	0	{"value": "0", "precision": 20}	Australian Dollar	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
azn	man.	ман.	2	0	{"value": "0", "precision": 20}	Azerbaijani Manat	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
bam	KM	KM	2	0	{"value": "0", "precision": 20}	Bosnia-Herzegovina Convertible Mark	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
bdt	Tk	৳	2	0	{"value": "0", "precision": 20}	Bangladeshi Taka	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
bgn	BGN	лв.	2	0	{"value": "0", "precision": 20}	Bulgarian Lev	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
bhd	BD	د.ب.‏	3	0	{"value": "0", "precision": 20}	Bahraini Dinar	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
bif	FBu	FBu	0	0	{"value": "0", "precision": 20}	Burundian Franc	2026-05-14 19:00:38.379+05:30	2026-05-14 19:00:38.379+05:30	\N
bnd	BN$	$	2	0	{"value": "0", "precision": 20}	Brunei Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
bob	Bs	Bs	2	0	{"value": "0", "precision": 20}	Bolivian Boliviano	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
brl	R$	R$	2	0	{"value": "0", "precision": 20}	Brazilian Real	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
bwp	BWP	P	2	0	{"value": "0", "precision": 20}	Botswanan Pula	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
byn	Br	руб.	2	0	{"value": "0", "precision": 20}	Belarusian Ruble	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
bzd	BZ$	$	2	0	{"value": "0", "precision": 20}	Belize Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
cdf	CDF	FrCD	2	0	{"value": "0", "precision": 20}	Congolese Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
chf	CHF	CHF	2	0.05	{"value": "0.05", "precision": 20}	Swiss Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
clp	CL$	$	0	0	{"value": "0", "precision": 20}	Chilean Peso	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
cny	CN¥	CN¥	2	0	{"value": "0", "precision": 20}	Chinese Yuan	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
cop	CO$	$	0	0	{"value": "0", "precision": 20}	Colombian Peso	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
crc	₡	₡	0	0	{"value": "0", "precision": 20}	Costa Rican Colón	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
cve	CV$	CV$	2	0	{"value": "0", "precision": 20}	Cape Verdean Escudo	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
czk	Kč	Kč	2	0	{"value": "0", "precision": 20}	Czech Republic Koruna	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
djf	Fdj	Fdj	0	0	{"value": "0", "precision": 20}	Djiboutian Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
dkk	Dkr	kr	2	0	{"value": "0", "precision": 20}	Danish Krone	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
dop	RD$	RD$	2	0	{"value": "0", "precision": 20}	Dominican Peso	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
dzd	DA	د.ج.‏	2	0	{"value": "0", "precision": 20}	Algerian Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
eek	Ekr	kr	2	0	{"value": "0", "precision": 20}	Estonian Kroon	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
egp	EGP	ج.م.‏	2	0	{"value": "0", "precision": 20}	Egyptian Pound	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ern	Nfk	Nfk	2	0	{"value": "0", "precision": 20}	Eritrean Nakfa	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
etb	Br	Br	2	0	{"value": "0", "precision": 20}	Ethiopian Birr	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
gbp	£	£	2	0	{"value": "0", "precision": 20}	British Pound Sterling	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
gel	GEL	GEL	2	0	{"value": "0", "precision": 20}	Georgian Lari	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ghs	GH₵	GH₵	2	0	{"value": "0", "precision": 20}	Ghanaian Cedi	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
gnf	FG	FG	0	0	{"value": "0", "precision": 20}	Guinean Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
gtq	GTQ	Q	2	0	{"value": "0", "precision": 20}	Guatemalan Quetzal	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
hkd	HK$	$	2	0	{"value": "0", "precision": 20}	Hong Kong Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
hnl	HNL	L	2	0	{"value": "0", "precision": 20}	Honduran Lempira	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
hrk	kn	kn	2	0	{"value": "0", "precision": 20}	Croatian Kuna	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
huf	Ft	Ft	0	0	{"value": "0", "precision": 20}	Hungarian Forint	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
idr	Rp	Rp	0	0	{"value": "0", "precision": 20}	Indonesian Rupiah	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ils	₪	₪	2	0	{"value": "0", "precision": 20}	Israeli New Sheqel	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
inr	Rs	₹	2	0	{"value": "0", "precision": 20}	Indian Rupee	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
iqd	IQD	د.ع.‏	0	0	{"value": "0", "precision": 20}	Iraqi Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
irr	IRR	﷼	0	0	{"value": "0", "precision": 20}	Iranian Rial	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
isk	Ikr	kr	0	0	{"value": "0", "precision": 20}	Icelandic Króna	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
jmd	J$	$	2	0	{"value": "0", "precision": 20}	Jamaican Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
jod	JD	د.أ.‏	3	0	{"value": "0", "precision": 20}	Jordanian Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
jpy	¥	￥	0	0	{"value": "0", "precision": 20}	Japanese Yen	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
kes	Ksh	Ksh	2	0	{"value": "0", "precision": 20}	Kenyan Shilling	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
khr	KHR	៛	2	0	{"value": "0", "precision": 20}	Cambodian Riel	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
kmf	CF	FC	0	0	{"value": "0", "precision": 20}	Comorian Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
krw	₩	₩	0	0	{"value": "0", "precision": 20}	South Korean Won	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
kwd	KD	د.ك.‏	3	0	{"value": "0", "precision": 20}	Kuwaiti Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
kzt	KZT	тңг.	2	0	{"value": "0", "precision": 20}	Kazakhstani Tenge	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
lbp	LB£	ل.ل.‏	0	0	{"value": "0", "precision": 20}	Lebanese Pound	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
lkr	SLRs	SL Re	2	0	{"value": "0", "precision": 20}	Sri Lankan Rupee	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ltl	Lt	Lt	2	0	{"value": "0", "precision": 20}	Lithuanian Litas	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
lvl	Ls	Ls	2	0	{"value": "0", "precision": 20}	Latvian Lats	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
lyd	LD	د.ل.‏	3	0	{"value": "0", "precision": 20}	Libyan Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mad	MAD	د.م.‏	2	0	{"value": "0", "precision": 20}	Moroccan Dirham	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mdl	MDL	MDL	2	0	{"value": "0", "precision": 20}	Moldovan Leu	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mga	MGA	MGA	0	0	{"value": "0", "precision": 20}	Malagasy Ariary	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mkd	MKD	MKD	2	0	{"value": "0", "precision": 20}	Macedonian Denar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mmk	MMK	K	0	0	{"value": "0", "precision": 20}	Myanma Kyat	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mnt	MNT	₮	0	0	{"value": "0", "precision": 20}	Mongolian Tugrig	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mop	MOP$	MOP$	2	0	{"value": "0", "precision": 20}	Macanese Pataca	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mur	MURs	MURs	0	0	{"value": "0", "precision": 20}	Mauritian Rupee	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mwk	K	K	2	0	{"value": "0", "precision": 20}	Malawian Kwacha	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mxn	MX$	$	2	0	{"value": "0", "precision": 20}	Mexican Peso	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
myr	RM	RM	2	0	{"value": "0", "precision": 20}	Malaysian Ringgit	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
mzn	MTn	MTn	2	0	{"value": "0", "precision": 20}	Mozambican Metical	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
nad	N$	N$	2	0	{"value": "0", "precision": 20}	Namibian Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ngn	₦	₦	2	0	{"value": "0", "precision": 20}	Nigerian Naira	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
nio	C$	C$	2	0	{"value": "0", "precision": 20}	Nicaraguan Córdoba	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
nok	Nkr	kr	2	0	{"value": "0", "precision": 20}	Norwegian Krone	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
npr	NPRs	नेरू	2	0	{"value": "0", "precision": 20}	Nepalese Rupee	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
nzd	NZ$	$	2	0	{"value": "0", "precision": 20}	New Zealand Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
omr	OMR	ر.ع.‏	3	0	{"value": "0", "precision": 20}	Omani Rial	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
pab	B/.	B/.	2	0	{"value": "0", "precision": 20}	Panamanian Balboa	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
pen	S/.	S/.	2	0	{"value": "0", "precision": 20}	Peruvian Nuevo Sol	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
php	₱	₱	2	0	{"value": "0", "precision": 20}	Philippine Peso	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
pkr	PKRs	₨	0	0	{"value": "0", "precision": 20}	Pakistani Rupee	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
pln	zł	zł	2	0	{"value": "0", "precision": 20}	Polish Zloty	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
pyg	₲	₲	0	0	{"value": "0", "precision": 20}	Paraguayan Guarani	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
qar	QR	ر.ق.‏	2	0	{"value": "0", "precision": 20}	Qatari Rial	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ron	RON	RON	2	0	{"value": "0", "precision": 20}	Romanian Leu	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
rsd	din.	дин.	0	0	{"value": "0", "precision": 20}	Serbian Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
rub	RUB	₽.	2	0	{"value": "0", "precision": 20}	Russian Ruble	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
rwf	RWF	FR	0	0	{"value": "0", "precision": 20}	Rwandan Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
sar	SR	ر.س.‏	2	0	{"value": "0", "precision": 20}	Saudi Riyal	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
sdg	SDG	SDG	2	0	{"value": "0", "precision": 20}	Sudanese Pound	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
sek	Skr	kr	2	0	{"value": "0", "precision": 20}	Swedish Krona	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
sgd	S$	$	2	0	{"value": "0", "precision": 20}	Singapore Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
sos	Ssh	Ssh	0	0	{"value": "0", "precision": 20}	Somali Shilling	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
syp	SY£	ل.س.‏	0	0	{"value": "0", "precision": 20}	Syrian Pound	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
thb	฿	฿	2	0	{"value": "0", "precision": 20}	Thai Baht	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
tnd	DT	د.ت.‏	3	0	{"value": "0", "precision": 20}	Tunisian Dinar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
top	T$	T$	2	0	{"value": "0", "precision": 20}	Tongan Paʻanga	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
tjs	TJS	с.	2	0	{"value": "0", "precision": 20}	Tajikistani Somoni	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
try	₺	₺	2	0	{"value": "0", "precision": 20}	Turkish Lira	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ttd	TT$	$	2	0	{"value": "0", "precision": 20}	Trinidad and Tobago Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
twd	NT$	NT$	2	0	{"value": "0", "precision": 20}	New Taiwan Dollar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
tzs	TSh	TSh	0	0	{"value": "0", "precision": 20}	Tanzanian Shilling	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
uah	₴	₴	2	0	{"value": "0", "precision": 20}	Ukrainian Hryvnia	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
ugx	USh	USh	0	0	{"value": "0", "precision": 20}	Ugandan Shilling	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
uyu	$U	$	2	0	{"value": "0", "precision": 20}	Uruguayan Peso	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
uzs	UZS	UZS	0	0	{"value": "0", "precision": 20}	Uzbekistan Som	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
vef	Bs.F.	Bs.F.	2	0	{"value": "0", "precision": 20}	Venezuelan Bolívar	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
vnd	₫	₫	0	0	{"value": "0", "precision": 20}	Vietnamese Dong	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
xaf	FCFA	FCFA	0	0	{"value": "0", "precision": 20}	CFA Franc BEAC	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
xof	CFA	CFA	0	0	{"value": "0", "precision": 20}	CFA Franc BCEAO	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
xpf	₣	₣	0	0	{"value": "0", "precision": 20}	CFP Franc	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
yer	YR	ر.ي.‏	0	0	{"value": "0", "precision": 20}	Yemeni Rial	2026-05-14 19:00:38.38+05:30	2026-05-14 19:00:38.38+05:30	\N
zar	R	R	2	0	{"value": "0", "precision": 20}	South African Rand	2026-05-14 19:00:38.381+05:30	2026-05-14 19:00:38.381+05:30	\N
zmk	ZK	ZK	0	0	{"value": "0", "precision": 20}	Zambian Kwacha	2026-05-14 19:00:38.381+05:30	2026-05-14 19:00:38.381+05:30	\N
zwl	ZWL$	ZWL$	0	0	{"value": "0", "precision": 20}	Zimbabwean Dollar	2026-05-14 19:00:38.381+05:30	2026-05-14 19:00:38.381+05:30	\N
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.customer (id, company_name, first_name, last_name, email, phone, has_account, metadata, created_at, updated_at, deleted_at, created_by) FROM stdin;
cus_01KRKBA1JG7MF1N9WVAD1H5CJB	\N	RIZWAN	BEG	rizwan.beg2004@gmail.com	9953662052	t	\N	2026-05-14 19:07:38.384+05:30	2026-05-14 19:07:38.384+05:30	\N	\N
cus_01KRR2XSTJ8SCJMR3GH9EM9JMW	\N	New	User	newuser1778924840@test.com	\N	t	\N	2026-05-16 15:17:20.786+05:30	2026-05-16 15:17:20.786+05:30	\N	\N
cus_01KRR32R60QYZKP37YDZ8WHDM5	\N	rehan	beg	rehan.beg2000@gmail.com	\N	t	\N	2026-05-16 15:20:02.944+05:30	2026-05-16 15:20:02.944+05:30	\N	\N
cus_01KRR2MEERQVEPBJ5QN5F8DJ1V	\N	Full	Flow	fullflow@test.com	+911234567890	t	\N	2026-05-16 15:12:14.232+05:30	2026-05-16 15:26:56.929+05:30	\N	\N
cus_01KRRBQ2Y3FA65XV7EK0J27AWQ	\N	\N	\N	guest@safinacarpets.com	\N	f	\N	2026-05-16 17:50:57.924+05:30	2026-05-16 17:50:57.924+05:30	\N	\N
cus_01KRRYE7MKBW1HK4CJNRBCT8AG	\N	\N	\N	test@safinacarpets.com	\N	f	\N	2026-05-16 23:18:10.771+05:30	2026-05-16 23:18:10.771+05:30	\N	\N
cus_01KRS3D9A4KZZDEV4C93QMQH6M	\N	Shariq	-	shariq.beg2011@gmail.com	\N	t	\N	2026-05-17 00:45:02.596+05:30	2026-05-17 00:45:02.596+05:30	\N	\N
cus_01KV8SQZ9G625TQEEN0G2CHWT3	\N	Rizwan	-	rehan.beg2004@gmail.com	\N	t	\N	2026-06-16 23:35:21.584+05:30	2026-06-16 23:35:21.584+05:30	\N	\N
\.


--
-- Data for Name: customer_account_holder; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.customer_account_holder (customer_id, account_holder_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: customer_address; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.customer_address (id, customer_id, address_name, is_default_shipping, is_default_billing, company, first_name, last_name, address_1, address_2, city, country_code, province, postal_code, phone, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: customer_group; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.customer_group (id, name, metadata, created_by, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: customer_group_customer; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.customer_group_customer (id, customer_id, customer_group_id, metadata, created_at, updated_at, created_by, deleted_at) FROM stdin;
\.


--
-- Data for Name: favorite; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.favorite (id, customer_id, customer_name, customer_email, product_id, product_handle, product_title, product_thumbnail, created_at, updated_at, deleted_at) FROM stdin;
01KVAR8A8BSEJCSGNE0K5ZHH4D	cus_01KRR32R60QYZKP37YDZ8WHDM5	Rehan	rehan.beg2000@gmail.com	prod_01KRKAX85S1C8DAVTQKJ8W5XN4		Medusa Shorts	\N	2026-06-17 17:47:48.811+05:30	2026-06-17 17:47:48.811+05:30	\N
01KVAR8C8TD88P40AEHQHBNTZZ	cus_01KRR32R60QYZKP37YDZ8WHDM5	Rehan	rehan.beg2000@gmail.com	prod_01KRKAX85SAJS7C9BVGSQ01501		Medusa Sweatpants	\N	2026-06-17 17:47:50.874+05:30	2026-06-17 17:47:50.874+05:30	\N
\.


--
-- Data for Name: fulfillment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.fulfillment (id, location_id, packed_at, shipped_at, delivered_at, canceled_at, data, provider_id, shipping_option_id, metadata, delivery_address_id, created_at, updated_at, deleted_at, marked_shipped_by, created_by, requires_shipping) FROM stdin;
ful_01KRRDV7YQANNNK0J8T9Z30BJ1	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	2026-05-16 18:28:11.279+05:30	\N	\N	2026-05-16 18:28:11.333+05:30	{}	manual_manual	so_01KRKAX844FAGSQ8VENNDN7ZND	\N	fuladdr_01KRRDV7YQ9VVR37YMVXG8Z9HK	2026-05-16 18:28:11.288+05:30	2026-05-16 18:28:11.336+05:30	\N	\N	\N	t
ful_01KRRDWJJ5R5CXF35DM8GNTV50	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	2026-05-16 18:28:54.912+05:30	\N	\N	2026-05-16 18:28:54.928+05:30	{}	manual_manual	so_01KRKAX844CAACB1HFXT870YBG	\N	fuladdr_01KRRDWJJ55HPAFEDNJZ60Y14A	2026-05-16 18:28:54.918+05:30	2026-05-16 18:28:54.93+05:30	\N	\N	\N	t
ful_01KRRDX2ZBX58GHM8QE98QR23Z	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	2026-05-16 18:29:11.719+05:30	\N	\N	2026-05-16 18:29:11.732+05:30	{}	manual_manual	so_01KRKAX844FAGSQ8VENNDN7ZND	\N	fuladdr_01KRRDX2ZB9EK65PXNSE91ZJXF	2026-05-16 18:29:11.724+05:30	2026-05-16 18:29:11.734+05:30	\N	\N	\N	t
ful_01KRRDVHD1YHG1XRXSJA0YZ4BE	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	2026-05-16 18:28:20.958+05:30	2026-05-16 18:29:36.5+05:30	2026-05-16 18:30:14.449+05:30	\N	{}	manual_manual	so_01KRKAX844FAGSQ8VENNDN7ZND	\N	fuladdr_01KRRDVHD19QCNSDBVSN3BF2W9	2026-05-16 18:28:20.961+05:30	2026-05-16 18:30:14.458+05:30	\N	user_01KRKDN2SH796294F8NGPNDGER	\N	t
\.


--
-- Data for Name: fulfillment_address; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.fulfillment_address (id, company, first_name, last_name, address_1, address_2, city, country_code, province, postal_code, phone, metadata, created_at, updated_at, deleted_at) FROM stdin;
fuladdr_01KRRDV7YQ9VVR37YMVXG8Z9HK	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
fuladdr_01KRRDVHD19QCNSDBVSN3BF2W9	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
fuladdr_01KRRDWJJ55HPAFEDNJZ60Y14A	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
fuladdr_01KRRDX2ZB9EK65PXNSE91ZJXF	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
\.


--
-- Data for Name: fulfillment_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.fulfillment_item (id, title, sku, barcode, quantity, raw_quantity, line_item_id, inventory_item_id, fulfillment_id, created_at, updated_at, deleted_at) FROM stdin;
fulit_01KRRDV7YQ6SK01BV95K8WH88R	S	SWEATPANTS-S		13	{"value": "13", "precision": 20}	ordli_01KRRD3TB1Y53FWE647W70XGAE	iitem_01KRKAX885DW7F6GTECYFDDB3W	ful_01KRRDV7YQANNNK0J8T9Z30BJ1	2026-05-16 18:28:11.288+05:30	2026-05-16 18:28:11.288+05:30	\N
fulit_01KRRDVHD1P34VJEJZM64QEWYY	S	SWEATPANTS-S		11	{"value": "11", "precision": 20}	ordli_01KRRD3TB1Y53FWE647W70XGAE	iitem_01KRKAX885DW7F6GTECYFDDB3W	ful_01KRRDVHD1YHG1XRXSJA0YZ4BE	2026-05-16 18:28:20.962+05:30	2026-05-16 18:28:20.962+05:30	\N
fulit_01KRRDWJJ5R7PHRKC9MHK9BKBF	S	SWEATPANTS-S		2	{"value": "2", "precision": 20}	ordli_01KRRD3TB1Y53FWE647W70XGAE	\N	ful_01KRRDWJJ5R5CXF35DM8GNTV50	2026-05-16 18:28:54.918+05:30	2026-05-16 18:28:54.918+05:30	\N
fulit_01KRRDX2ZBD8C4CXWNEG5C1G9B	S	SWEATPANTS-S		2	{"value": "2", "precision": 20}	ordli_01KRRD3TB1Y53FWE647W70XGAE	\N	ful_01KRRDX2ZBX58GHM8QE98QR23Z	2026-05-16 18:29:11.724+05:30	2026-05-16 18:29:11.724+05:30	\N
\.


--
-- Data for Name: fulfillment_label; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.fulfillment_label (id, tracking_number, tracking_url, label_url, fulfillment_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: fulfillment_provider; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.fulfillment_provider (id, is_enabled, created_at, updated_at, deleted_at) FROM stdin;
manual_manual	t	2026-05-14 19:00:38.388+05:30	2026-05-14 19:00:38.388+05:30	\N
\.


--
-- Data for Name: fulfillment_set; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.fulfillment_set (id, name, type, metadata, created_at, updated_at, deleted_at) FROM stdin;
fuset_01KRKAX836BEEQWNEA5375G05Q	European Warehouse delivery	shipping	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
\.


--
-- Data for Name: geo_zone; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.geo_zone (id, type, country_code, province_code, city, service_zone_id, postal_expression, metadata, created_at, updated_at, deleted_at) FROM stdin;
fgz_01KRKAX8356SN58GA4PWXA2C52	country	gb	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
fgz_01KRKAX8354HE0R8PQNXWKEVKM	country	de	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
fgz_01KRKAX835E2MV9C5GNA8H597W	country	dk	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
fgz_01KRKAX8352Y58K2R92A0CS9H7	country	se	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
fgz_01KRKAX836FVWFXC9WFTXJWFF3	country	fr	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
fgz_01KRKAX836N36WV9PGTMSKTB2F	country	es	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
fgz_01KRKAX836QZMPG79VBKXQTR6X	country	it	\N	\N	serzo_01KRKAX836PTHMYK4MWQS2VFVS	\N	\N	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.image (id, url, metadata, created_at, updated_at, deleted_at, rank, product_id) FROM stdin;
img_01KRKAX85VXETM4P8TY4FH40F7	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB
img_01KRKAX85V05YAQT4244GX7VF5	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	1	prod_01KRKAX85SW40G1WEE2Z9MDAEB
img_01KRKAX85VE97D9XMHMYSBS3SZ	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	2	prod_01KRKAX85SW40G1WEE2Z9MDAEB
img_01KRKAX85V57TZ40T0N3C6FVR1	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	3	prod_01KRKAX85SW40G1WEE2Z9MDAEB
img_01KRKAX85VQ9ZKS2DCWFCMK8KZ	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	0	prod_01KRKAX85SSZ7EZKG0TPF5MHR8
img_01KRKAX85VFNVCFGNN9SDVEK38	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	1	prod_01KRKAX85SSZ7EZKG0TPF5MHR8
img_01KRKAX85W7NGNSGAV1C6GJ8WF	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	0	prod_01KRKAX85SAJS7C9BVGSQ01501
img_01KRKAX85WGASE788T5VNBZY3J	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	1	prod_01KRKAX85SAJS7C9BVGSQ01501
img_01KRKAX85W8ED283A2GT11CHE3	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	0	prod_01KRKAX85S1C8DAVTQKJ8W5XN4
img_01KRKAX85WM3KM4RBZA3PHEM4J	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N	1	prod_01KRKAX85S1C8DAVTQKJ8W5XN4
img_01KRQH1R35W38NNCF5PD38HD7K	http://localhost:9000/static/1778906095684-Screenshot%202026-05-14%20at%2011.15.02%C3%A2%C2%80%C2%AFPM.png	\N	2026-05-16 10:04:55.721+05:30	2026-05-16 10:04:55.721+05:30	\N	0	prod_01KRQH1R306RGYAFZFEE3W6KCH
img_01KRRHVFHN5T4ZWX6NA63A5KJB	http://localhost:9000/static/1778940493345-WhatsApp%20Image%202026-04-07%20at%2017.18.26.jpeg	\N	2026-05-16 19:38:13.366+05:30	2026-05-16 19:38:13.366+05:30	\N	0	prod_01KRRHVFHKZNFNS6D1DW50VH43
\.


--
-- Data for Name: inventory_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.inventory_item (id, created_at, updated_at, deleted_at, sku, origin_country, hs_code, mid_code, material, weight, length, height, width, requires_shipping, description, title, thumbnail, metadata) FROM stdin;
iitem_01KRKAX885RADK48W19TJ6MVXA	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-S-BLACK	\N	\N	\N	\N	\N	\N	\N	\N	t	S / Black	S / Black	\N	\N
iitem_01KRKAX885D3WY68N1HPCFYSMD	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-S-WHITE	\N	\N	\N	\N	\N	\N	\N	\N	t	S / White	S / White	\N	\N
iitem_01KRKAX8856XYYK6DAJHTASWRZ	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-M-BLACK	\N	\N	\N	\N	\N	\N	\N	\N	t	M / Black	M / Black	\N	\N
iitem_01KRKAX885JDSHRW9VH96JFT6Q	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-M-WHITE	\N	\N	\N	\N	\N	\N	\N	\N	t	M / White	M / White	\N	\N
iitem_01KRKAX885KT3MNRGRR5F5A2R7	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-L-BLACK	\N	\N	\N	\N	\N	\N	\N	\N	t	L / Black	L / Black	\N	\N
iitem_01KRKAX8857MFNCFVYZCY3FCG6	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-L-WHITE	\N	\N	\N	\N	\N	\N	\N	\N	t	L / White	L / White	\N	\N
iitem_01KRKAX88598SNDKGAQJAJHM7T	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-XL-BLACK	\N	\N	\N	\N	\N	\N	\N	\N	t	XL / Black	XL / Black	\N	\N
iitem_01KRKAX88523800H8F7HN39HWS	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHIRT-XL-WHITE	\N	\N	\N	\N	\N	\N	\N	\N	t	XL / White	XL / White	\N	\N
iitem_01KRKAX885661YXBCB2KXW7SCF	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATSHIRT-S	\N	\N	\N	\N	\N	\N	\N	\N	t	S	S	\N	\N
iitem_01KRKAX8851Z62F9TY9X1HE5MT	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATSHIRT-M	\N	\N	\N	\N	\N	\N	\N	\N	t	M	M	\N	\N
iitem_01KRKAX8859KTA9BEFCW3KS6WS	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATSHIRT-L	\N	\N	\N	\N	\N	\N	\N	\N	t	L	L	\N	\N
iitem_01KRKAX885RNAJY1HAB357DHV9	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATSHIRT-XL	\N	\N	\N	\N	\N	\N	\N	\N	t	XL	XL	\N	\N
iitem_01KRKAX885DW7F6GTECYFDDB3W	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATPANTS-S	\N	\N	\N	\N	\N	\N	\N	\N	t	S	S	\N	\N
iitem_01KRKAX8854KTE6G6NCKETYNF0	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATPANTS-M	\N	\N	\N	\N	\N	\N	\N	\N	t	M	M	\N	\N
iitem_01KRKAX8859CXB95BT0ACSY594	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATPANTS-L	\N	\N	\N	\N	\N	\N	\N	\N	t	L	L	\N	\N
iitem_01KRKAX885XD6X93XRXC2J0CTA	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SWEATPANTS-XL	\N	\N	\N	\N	\N	\N	\N	\N	t	XL	XL	\N	\N
iitem_01KRKAX885VZXVDDDG5RD4JMEF	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHORTS-S	\N	\N	\N	\N	\N	\N	\N	\N	t	S	S	\N	\N
iitem_01KRKAX885PGHTJYWXF4JB0XXF	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHORTS-M	\N	\N	\N	\N	\N	\N	\N	\N	t	M	M	\N	\N
iitem_01KRKAX885QHYVZ6TW1GC35NZM	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHORTS-L	\N	\N	\N	\N	\N	\N	\N	\N	t	L	L	\N	\N
iitem_01KRKAX885MJZHGVQGVCQNJZ9K	2026-05-14 19:00:39.238+05:30	2026-05-14 19:00:39.238+05:30	\N	SHORTS-XL	\N	\N	\N	\N	\N	\N	\N	\N	t	XL	XL	\N	\N
iitem_01KRQH1R63R2NDYJM4DNQ8FE44	2026-05-16 10:04:55.812+05:30	2026-05-16 10:04:55.812+05:30	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	Default variant	Default variant	\N	\N
\.


--
-- Data for Name: inventory_level; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.inventory_level (id, created_at, updated_at, deleted_at, inventory_item_id, location_id, stocked_quantity, reserved_quantity, incoming_quantity, metadata, raw_stocked_quantity, raw_reserved_quantity, raw_incoming_quantity) FROM stdin;
ilev_01KRKAX8A881HKDWNJ38H8HMPD	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX8851Z62F9TY9X1HE5MT	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A94KC5QH9EF0BH4SGV	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX88523800H8F7HN39HWS	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9APHDS4ZCFAAPR4BS	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX8854KTE6G6NCKETYNF0	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9B1B8X4Z7A50V2ZQ0	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885661YXBCB2KXW7SCF	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9BQ9XM6J63EG79EYD	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX8856XYYK6DAJHTASWRZ	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A92K4104R3R8YVG4YY	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX8857MFNCFVYZCY3FCG6	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A98P4SGFF3BRCG26VN	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX88598SNDKGAQJAJHM7T	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9NCDC4HJVYZMSAE7E	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX8859CXB95BT0ACSY594	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A95CHF8NT0FENV0THR	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX8859KTA9BEFCW3KS6WS	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9G4PCZ2C1FPEE7AKK	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885D3WY68N1HPCFYSMD	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9GCBNDTFAJ9RD591N	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885JDSHRW9VH96JFT6Q	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9TZPQW8CSGM18NZPY	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885KT3MNRGRR5F5A2R7	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9X41GXYER3BJEMRMR	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885MJZHGVQGVCQNJZ9K	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9QTFMA4JCF6EVM8ZZ	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885PGHTJYWXF4JB0XXF	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9HKD69AHSXTB6GP8J	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885QHYVZ6TW1GC35NZM	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9GQ48A4AECTJ6ESPF	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885RADK48W19TJ6MVXA	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9WE0F4MSWF5PNBE0B	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885RNAJY1HAB357DHV9	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9A5V97JVWWB6WCGG7	2026-05-14 19:00:39.305+05:30	2026-05-14 19:00:39.305+05:30	\N	iitem_01KRKAX885VZXVDDDG5RD4JMEF	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9CTJQG28QMKQBBXF7	2026-05-14 19:00:39.306+05:30	2026-05-14 19:00:39.306+05:30	\N	iitem_01KRKAX885XD6X93XRXC2J0CTA	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	1000000	0	0	\N	{"value": "1000000", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
ilev_01KRKAX8A9VZF4RY4SKXSH4MR9	2026-05-14 19:00:39.305+05:30	2026-05-16 18:28:20.994+05:30	\N	iitem_01KRKAX885DW7F6GTECYFDDB3W	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	999989	0	0	\N	{"value": "999989", "precision": 20}	{"value": "0", "precision": 20}	{"value": "0", "precision": 20}
\.


--
-- Data for Name: invite; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.invite (id, email, accepted, token, expires_at, metadata, created_at, updated_at, deleted_at) FROM stdin;
invite_01KRKAX9XP34JKYXHB5YWSZ1M7	admin@medusa-test.com	f	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imludml0ZV8wMUtSS0FYOVhQMzRKS1lYSEI1WVdTWjFNNyIsImVtYWlsIjoiYWRtaW5AbWVkdXNhLXRlc3QuY29tIiwiaWF0IjoxNzc4NzY1NDQwLCJleHAiOjE3Nzg4NTE4NDAsImp0aSI6Ijc1ODIwMWE4LWNmZmYtNDBmOC1hODRhLTdiNDQ3YTlhNjdiMSJ9.1bxx4ZJ1zTQ6euB-CyTnV7gneKj_uvkUze0xKH5nwWY	2026-05-15 19:00:40.95+05:30	\N	2026-05-14 19:00:40.953+05:30	2026-05-14 19:00:40.953+05:30	\N
\.


--
-- Data for Name: invite_rbac_role; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.invite_rbac_role (invite_id, rbac_role_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: link_module_migrations; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.link_module_migrations (id, table_name, link_descriptor, created_at) FROM stdin;
1	cart_payment_collection	{"toModel": "payment_collection", "toModule": "payment", "fromModel": "cart", "fromModule": "cart"}	2026-05-14 19:00:37.174736
2	cart_promotion	{"toModel": "promotions", "toModule": "promotion", "fromModel": "cart", "fromModule": "cart"}	2026-05-14 19:00:37.18186
3	customer_account_holder	{"toModel": "account_holder", "toModule": "payment", "fromModel": "customer", "fromModule": "customer"}	2026-05-14 19:00:37.184227
4	location_fulfillment_provider	{"toModel": "fulfillment_provider", "toModule": "fulfillment", "fromModel": "location", "fromModule": "stock_location"}	2026-05-14 19:00:37.187754
5	location_fulfillment_set	{"toModel": "fulfillment_set", "toModule": "fulfillment", "fromModel": "location", "fromModule": "stock_location"}	2026-05-14 19:00:37.190745
6	invite_rbac_role	{"toModel": "rbac_role", "toModule": "rbac", "fromModel": "invite", "fromModule": "user"}	2026-05-14 19:00:37.193872
7	order_cart	{"toModel": "cart", "toModule": "cart", "fromModel": "order", "fromModule": "order"}	2026-05-14 19:00:37.196888
8	order_fulfillment	{"toModel": "fulfillments", "toModule": "fulfillment", "fromModel": "order", "fromModule": "order"}	2026-05-14 19:00:37.199723
9	order_payment_collection	{"toModel": "payment_collection", "toModule": "payment", "fromModel": "order", "fromModule": "order"}	2026-05-14 19:00:37.202596
10	order_promotion	{"toModel": "promotions", "toModule": "promotion", "fromModel": "order", "fromModule": "order"}	2026-05-14 19:00:37.206366
11	return_fulfillment	{"toModel": "fulfillments", "toModule": "fulfillment", "fromModel": "return", "fromModule": "order"}	2026-05-14 19:00:37.20906
12	product_sales_channel	{"toModel": "sales_channel", "toModule": "sales_channel", "fromModel": "product", "fromModule": "product"}	2026-05-14 19:00:37.232731
13	product_shipping_profile	{"toModel": "shipping_profile", "toModule": "fulfillment", "fromModel": "product", "fromModule": "product"}	2026-05-14 19:00:37.255737
14	product_variant_inventory_item	{"toModel": "inventory", "toModule": "inventory", "fromModel": "variant", "fromModule": "product"}	2026-05-14 19:00:37.258383
15	product_variant_price_set	{"toModel": "price_set", "toModule": "pricing", "fromModel": "variant", "fromModule": "product"}	2026-05-14 19:00:37.261213
16	publishable_api_key_sales_channel	{"toModel": "sales_channel", "toModule": "sales_channel", "fromModel": "api_key", "fromModule": "api_key"}	2026-05-14 19:00:37.264714
17	region_payment_provider	{"toModel": "payment_provider", "toModule": "payment", "fromModel": "region", "fromModule": "region"}	2026-05-14 19:00:37.267816
18	sales_channel_stock_location	{"toModel": "location", "toModule": "stock_location", "fromModel": "sales_channel", "fromModule": "sales_channel"}	2026-05-14 19:00:37.314262
19	shipping_option_price_set	{"toModel": "price_set", "toModule": "pricing", "fromModel": "shipping_option", "fromModule": "fulfillment"}	2026-05-14 19:00:37.332331
20	user_rbac_role	{"toModel": "rbac_role", "toModule": "rbac", "fromModel": "user", "fromModule": "user"}	2026-05-14 19:00:37.334688
\.


--
-- Data for Name: location_fulfillment_provider; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.location_fulfillment_provider (stock_location_id, fulfillment_provider_id, id, created_at, updated_at, deleted_at) FROM stdin;
sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	manual_manual	locfp_01KRKAX82ZW899H85T98VZ63CG	2026-05-14 19:00:39.070949+05:30	2026-05-14 19:00:39.070949+05:30	\N
\.


--
-- Data for Name: location_fulfillment_set; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.location_fulfillment_set (stock_location_id, fulfillment_set_id, id, created_at, updated_at, deleted_at) FROM stdin;
sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	fuset_01KRKAX836BEEQWNEA5375G05Q	locfs_01KRKAX83JK766VT1CB90VH259	2026-05-14 19:00:39.090133+05:30	2026-05-14 19:00:39.090133+05:30	\N
\.


--
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.message (id, sender_type, content, conversation_id, created_at, updated_at, deleted_at) FROM stdin;
01KV8ZBKVRE8T6KCCDHSTBA99J	user	tell me about this company?	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:13:28.121+05:30	2026-06-17 01:13:28.121+05:30	\N
01KV8ZBR8K0JP3RTWAZAMKH6RJ	bot	At Safina Carpets, we're proud to share our rich heritage. Our journey began with a passion for traditional craftsmanship, and over the years, we've perfected the art of hand-knotting exquisite carpets. Our products are a testament to this dedication, with each piece carefully woven to bring warmth and elegance to any space.\n\nWe offer a range of stunning carpets, from classic designs to modern interpretations, all made with the finest materials and attention to detail.\n\n- Size: 8x10 ft (243x305 cm)\n- Material: Wool\n- Colors: Earthy tones\n- Design: Traditional Persian\n- Density: 150-170 KPSI\n- Origin: Weaved in India 100% Handmade (Hand Knotted)\n- Pile Height: 10MM - 15MM\n- Durability: Built to last for decades\n- Perfect for: Living rooms, bedrooms\n- Hypoallergenic, Eco-friendly, Mind relaxing\n\nBuying confidence:\n- 30-day return policy\n- Free shipping on orders over $1,000\n- 10-year warranty on all products	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:13:32.628+05:30	2026-06-17 01:13:32.628+05:30	\N
01KV8ZC7Z0KFQ18CWPYGKA1K24	user	hii , hello	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:13:48.704+05:30	2026-06-17 01:13:48.704+05:30	\N
01KV8ZCZYEXV2WH64CQ7D57WGV	human_agent	hello sir , how can i assist you ? 	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:14:13.262+05:30	2026-06-17 01:14:13.262+05:30	\N
01KV8ZDF860858JSSZABKJ8CX7	user	thank you	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:14:28.935+05:30	2026-06-17 01:14:28.935+05:30	\N
01KV8ZDXYTSQYN23D11HA7Q2XZ	user	hh	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:14:43.994+05:30	2026-06-17 01:14:43.994+05:30	\N
01KV8ZEG99ENMN2N7GH0BD2SJS	human_agent	nice to meet you , i m good what about you ? 	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:15:02.762+05:30	2026-06-17 01:15:02.762+05:30	\N
01KV8ZEX268EMDAQXRGZAP2KNG	human_agent	what would you like to know about me ? 	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:15:15.846+05:30	2026-06-17 01:15:15.846+05:30	\N
01KV8ZF1M1F40FVC1QV1MQZCQD	human_agent	i am a	01KV8ZBKTED0MVFJ2D3BP1B6SF	2026-06-17 01:15:20.513+05:30	2026-06-17 01:15:20.513+05:30	\N
01KVA8XYK46AFWC8ZWYA1KJZTP	user	I want to buy rugs , could you share some details how the rugs and all	01KVA8XYJY1DEAD7P1DHNZGZKA	2026-06-17 13:20:00.549+05:30	2026-06-17 13:20:00.549+05:30	\N
01KVA8Y0GHK388HN4MK55CNMYC	bot	At Safina Carpets, we offer a range of exquisite rugs that cater to diverse tastes and spaces. Our available sizes include:\n\n- 2x3 feet (60x90 cm)\n- 3x5 feet (90x150 cm)\n- 5x8 feet (150x240 cm)\n- 8x10 feet (240x300 cm)\n\nOur rugs are crafted from premium materials such as wool, silk, and a blend of natural fibers. Some of our popular models include the 'Sahara', 'Mumbai', and 'Kashmir' collections.\n\n- Buying confidence:\n- 30-day return policy for a full refund.\n- Free shipping on orders over 5x8 feet.\n- 10-year warranty on all handmade rugs.	01KVA8XYJY1DEAD7P1DHNZGZKA	2026-06-17 13:20:02.514+05:30	2026-06-17 13:20:02.514+05:30	\N
01KVAMPMNYDZ4RMJ0X0RXYVF2C	user	tell me about safina carpets	01KVAMKGZXB7ZPPVN26QPD1MB4	2026-06-17 16:45:43.934+05:30	2026-06-17 16:45:43.934+05:30	\N
01KVAMQ5SQ9MA0YV16VX4G1VEK	user	hello	01KVAMKGZXB7ZPPVN26QPD1MB4	2026-06-17 16:46:01.463+05:30	2026-06-17 16:46:01.463+05:30	\N
01KVAMQC4VRPS11SQC9V0CEKR2	user	ji	01KVAMKGZXB7ZPPVN26QPD1MB4	2026-06-17 16:46:07.963+05:30	2026-06-17 16:46:07.963+05:30	\N
01KVAMRG92JPJB4JMPTER19ZFG	human_agent	hii	01KVAMKGZXB7ZPPVN26QPD1MB4	2026-06-17 16:46:44.963+05:30	2026-06-17 16:46:44.963+05:30	\N
01KVANBYYE0ZV9CD13TWNEP0QB	user	Hello	01KVANBYRHQSKA5SK6A2WG1V11	2026-06-17 16:57:22.574+05:30	2026-06-17 16:57:22.574+05:30	\N
01KVANC0P9PJB8T76C7DX3CHZ9	bot	I may need a bit more detail or a photo to confirm, as the provided context does not mention the 2022 Ford F-150 model. However, I can tell you that Safina Carpets is a premium carpet brand, and we specialize in high-quality, handmade carpets.\n\nIf you'd like to know more about our products, I'd be happy to help. Could you please provide more information about the 2022 Ford F-150 model you're interested in?	01KVANBYRHQSKA5SK6A2WG1V11	2026-06-17 16:57:24.368+05:30	2026-06-17 16:57:24.368+05:30	\N
01KVANKCN416MC0N7F6EC2QDHA	user	hii	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:01:25.988+05:30	2026-06-17 17:01:25.988+05:30	\N
01KVANKEJC2S56TFPF3XZ8EA6T	bot	At Safina Carpets, we're happy to help with any questions. "Hii" seems to be a casual greeting, similar to "hello." If you're reaching out to us, we're excited to assist you in finding the perfect handmade carpet. \n* Our carpets are built to last for decades, ensuring your investment is protected.\n* We offer 100% handmade, eco-friendly products for a clear conscience.\n* Please feel free to ask about our return policy for more information.	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:01:27.949+05:30	2026-06-17 17:01:27.949+05:30	\N
01KVANKKDB4D2KQ11BV75QSA71	user	hello	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:01:32.908+05:30	2026-06-17 17:01:32.908+05:30	\N
01KVANMHB3562PTGV45J1MWH4A	human_agent	yes please 	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:03.555+05:30	2026-06-17 17:02:03.555+05:30	\N
01KVANN4KW2ZXPG7E2EPQJXA6N	user	what do you know about this company?	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:23.292+05:30	2026-06-17 17:02:23.292+05:30	\N
01KVANNQXE41Z2H9SZT2PXKWEQ	user	sdfl	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:43.054+05:30	2026-06-17 17:02:43.054+05:30	\N
01KVANNS467QN3FA5VRA51W7XT	user	sdfnsls	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:44.295+05:30	2026-06-17 17:02:44.295+05:30	\N
01KVANNSSX8C0MC4YFWRMQGETD	user	sdfs	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:44.989+05:30	2026-06-17 17:02:44.989+05:30	\N
01KVANNTYZJG3CNM93NK5PWRQA	user	sdf	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:46.176+05:30	2026-06-17 17:02:46.176+05:30	\N
01KVANNWC0EMSG4PEZ14W77919	user	sdkfbksds	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:47.616+05:30	2026-06-17 17:02:47.616+05:30	\N
01KVANNX4K83W9GFHP9DQM65YH	user	sdfs	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:48.404+05:30	2026-06-17 17:02:48.404+05:30	\N
01KVANNXVWF1HCDT50E2KNWMHN	user	sdfs	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:49.148+05:30	2026-06-17 17:02:49.148+05:30	\N
01KVANP89ZG02S91N097J4CB78	user	reply	01KVANKCMNQE8T3HT2DR61MTK1	2026-06-17 17:02:59.839+05:30	2026-06-17 17:02:59.839+05:30	\N
01KVAP3KDJVW53X6FB15A2SH32	user	hello	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:10:17.202+05:30	2026-06-17 17:10:17.202+05:30	\N
01KVAP3P2YSS85889WE0A6R68Y	bot	Hello. Welcome to Safina Carpets, where heritage meets luxury. We're excited to help you find the perfect handmade carpet. Our collection features exquisite, 100% handmade pieces, carefully crafted in India. \n* We're here to guide you through your carpet journey\n* Our carpets are built to last for decades with proper care\n* Please feel free to ask about our return policy or any other query you may have	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:10:19.936+05:30	2026-06-17 17:10:19.936+05:30	\N
01KVAP3S0QZFYGRPRM7TRCRZPD	user	Hii	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:10:22.936+05:30	2026-06-17 17:10:22.936+05:30	\N
01KVAP48W3KEM8TDT5F3FJXQBV	user	what do you know about this company?	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:10:39.171+05:30	2026-06-17 17:10:39.171+05:30	\N
01KVAP4A1GBX236RYTBEJ4M2VA	bot	At Safina Carpets, we pride ourselves on offering high-quality, handmade carpets. Our carpets are weaved in India, 100% handmade, and built to last for decades. \n* We offer a premium product for a discerning customer.\n* Our carpets are designed to provide a calming atmosphere.\n* Please contact us for more information on our available carpets.	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:10:40.369+05:30	2026-06-17 17:10:40.369+05:30	\N
01KVAP6S16TYF48R6E54ZAVG2Z	user	ok	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:12:01.254+05:30	2026-06-17 17:12:01.254+05:30	\N
01KVAP76YXAP13T8DVW3MZ9YYC	user	ok	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:12:15.517+05:30	2026-06-17 17:12:15.517+05:30	\N
01KVAP788BRMMDM9HF8GF7WWPS	bot	At Safina Carpets, we pride ourselves on offering high-quality, handmade carpets. Our carpets are carefully crafted to provide a premium experience. \n* We stand behind the quality of our carpets with a satisfaction guarantee.\n* Our carpets are designed to be durable and long-lasting.\n* If you have any questions or concerns, our dedicated team is here to help.	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:12:16.844+05:30	2026-06-17 17:12:16.844+05:30	\N
01KVAP95RPNZNV93H9VBG0M591	user	am i talking to a company bot or ai company bot ?	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:13:19.831+05:30	2026-06-17 17:13:19.831+05:30	\N
01KVAP971W6E214MXHQX85VSY6	bot	You're interacting with a professional sales & heritage assistant for Safina Carpets. I'm here to provide you with personalized support and guidance in finding the perfect carpet for your needs. \n* We're committed to providing exceptional customer service\n* Our carpets are carefully crafted to ensure your satisfaction\n* You can trust our expertise in helping you make an informed purchase decision	01KVAP3KDBM6GWXBYTBBBPEHVE	2026-06-17 17:13:21.148+05:30	2026-06-17 17:13:21.148+05:30	\N
\.


--
-- Data for Name: mikro_orm_migrations; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.mikro_orm_migrations (id, name, executed_at) FROM stdin;
1	Migration20240307161216	2026-05-14 19:00:35.397899+05:30
2	Migration20241210073813	2026-05-14 19:00:35.397899+05:30
3	Migration20250106142624	2026-05-14 19:00:35.397899+05:30
4	Migration20250120110820	2026-05-14 19:00:35.397899+05:30
5	Migration20240307132720	2026-05-14 19:00:35.473898+05:30
6	Migration20240719123015	2026-05-14 19:00:35.473898+05:30
7	Migration20241213063611	2026-05-14 19:00:35.473898+05:30
8	Migration20251010131115	2026-05-14 19:00:35.473898+05:30
9	InitialSetup20240401153642	2026-05-14 19:00:35.53496+05:30
10	Migration20240601111544	2026-05-14 19:00:35.53496+05:30
11	Migration202408271511	2026-05-14 19:00:35.53496+05:30
12	Migration20241122120331	2026-05-14 19:00:35.53496+05:30
13	Migration20241125090957	2026-05-14 19:00:35.53496+05:30
14	Migration20250411073236	2026-05-14 19:00:35.53496+05:30
15	Migration20250516081326	2026-05-14 19:00:35.53496+05:30
16	Migration20250910154539	2026-05-14 19:00:35.53496+05:30
17	Migration20250911092221	2026-05-14 19:00:35.53496+05:30
18	Migration20250929204438	2026-05-14 19:00:35.53496+05:30
19	Migration20251008132218	2026-05-14 19:00:35.53496+05:30
20	Migration20251011090511	2026-05-14 19:00:35.53496+05:30
21	Migration20260224120000	2026-05-14 19:00:35.53496+05:30
22	Migration20260301002050	2026-05-14 19:00:35.53496+05:30
23	Migration20260306120000	2026-05-14 19:00:35.53496+05:30
24	Migration20230929122253	2026-05-14 19:00:35.708568+05:30
25	Migration20240322094407	2026-05-14 19:00:35.708568+05:30
26	Migration20240322113359	2026-05-14 19:00:35.708568+05:30
27	Migration20240322120125	2026-05-14 19:00:35.708568+05:30
28	Migration20240626133555	2026-05-14 19:00:35.708568+05:30
29	Migration20240704094505	2026-05-14 19:00:35.708568+05:30
30	Migration20241127114534	2026-05-14 19:00:35.708568+05:30
31	Migration20241127223829	2026-05-14 19:00:35.708568+05:30
32	Migration20241128055359	2026-05-14 19:00:35.708568+05:30
33	Migration20241212190401	2026-05-14 19:00:35.708568+05:30
34	Migration20250408145122	2026-05-14 19:00:35.708568+05:30
35	Migration20250409122219	2026-05-14 19:00:35.708568+05:30
36	Migration20251009110625	2026-05-14 19:00:35.708568+05:30
37	Migration20251112192723	2026-05-14 19:00:35.708568+05:30
38	Migration20260429163502	2026-05-14 19:00:35.708568+05:30
39	Migration20240227120221	2026-05-14 19:00:35.796771+05:30
40	Migration20240617102917	2026-05-14 19:00:35.796771+05:30
41	Migration20240624153824	2026-05-14 19:00:35.796771+05:30
42	Migration20241211061114	2026-05-14 19:00:35.796771+05:30
43	Migration20250113094144	2026-05-14 19:00:35.796771+05:30
44	Migration20250120110700	2026-05-14 19:00:35.796771+05:30
45	Migration20250226130616	2026-05-14 19:00:35.796771+05:30
46	Migration20250508081510	2026-05-14 19:00:35.796771+05:30
47	Migration20250828075407	2026-05-14 19:00:35.796771+05:30
48	Migration20250909083125	2026-05-14 19:00:35.796771+05:30
49	Migration20250916120552	2026-05-14 19:00:35.796771+05:30
50	Migration20250917143818	2026-05-14 19:00:35.796771+05:30
51	Migration20250919122137	2026-05-14 19:00:35.796771+05:30
52	Migration20251006000000	2026-05-14 19:00:35.796771+05:30
53	Migration20251015113934	2026-05-14 19:00:35.796771+05:30
54	Migration20251107050148	2026-05-14 19:00:35.796771+05:30
55	Migration20240124154000	2026-05-14 19:00:35.879833+05:30
56	Migration20240524123112	2026-05-14 19:00:35.879833+05:30
57	Migration20240602110946	2026-05-14 19:00:35.879833+05:30
58	Migration20241211074630	2026-05-14 19:00:35.879833+05:30
59	Migration20251010130829	2026-05-14 19:00:35.879833+05:30
60	Migration20240115152146	2026-05-14 19:00:35.910935+05:30
61	Migration20240222170223	2026-05-14 19:00:35.926106+05:30
62	Migration20240831125857	2026-05-14 19:00:35.926106+05:30
63	Migration20241106085918	2026-05-14 19:00:35.926106+05:30
64	Migration20241205095237	2026-05-14 19:00:35.926106+05:30
65	Migration20241216183049	2026-05-14 19:00:35.926106+05:30
66	Migration20241218091938	2026-05-14 19:00:35.926106+05:30
67	Migration20250120115059	2026-05-14 19:00:35.926106+05:30
68	Migration20250212131240	2026-05-14 19:00:35.926106+05:30
69	Migration20250326151602	2026-05-14 19:00:35.926106+05:30
70	Migration20250508081553	2026-05-14 19:00:35.926106+05:30
71	Migration20251017153909	2026-05-14 19:00:35.926106+05:30
72	Migration20251208130704	2026-05-14 19:00:35.926106+05:30
73	Migration20240205173216	2026-05-14 19:00:35.985625+05:30
74	Migration20240624200006	2026-05-14 19:00:35.985625+05:30
75	Migration20250120110744	2026-05-14 19:00:35.985625+05:30
76	InitialSetup20240221144943	2026-05-14 19:00:36.252907+05:30
77	Migration20240604080145	2026-05-14 19:00:36.252907+05:30
78	Migration20241205122700	2026-05-14 19:00:36.252907+05:30
79	Migration20251015123842	2026-05-14 19:00:36.252907+05:30
80	InitialSetup20240227075933	2026-05-14 19:00:36.302027+05:30
81	Migration20240621145944	2026-05-14 19:00:36.302027+05:30
82	Migration20241206083313	2026-05-14 19:00:36.302027+05:30
83	Migration20251202184737	2026-05-14 19:00:36.302027+05:30
84	Migration20251212161429	2026-05-14 19:00:36.302027+05:30
85	Migration20240227090331	2026-05-14 19:00:36.365531+05:30
86	Migration20240710135844	2026-05-14 19:00:36.365531+05:30
87	Migration20240924114005	2026-05-14 19:00:36.365531+05:30
88	Migration20241212052837	2026-05-14 19:00:36.365531+05:30
89	InitialSetup20240228133303	2026-05-14 19:00:36.4457+05:30
90	Migration20240624082354	2026-05-14 19:00:36.4457+05:30
91	Migration20240225134525	2026-05-14 19:00:36.480229+05:30
92	Migration20240806072619	2026-05-14 19:00:36.480229+05:30
93	Migration20241211151053	2026-05-14 19:00:36.480229+05:30
94	Migration20250115160517	2026-05-14 19:00:36.480229+05:30
95	Migration20250120110552	2026-05-14 19:00:36.480229+05:30
96	Migration20250123122334	2026-05-14 19:00:36.480229+05:30
97	Migration20250206105639	2026-05-14 19:00:36.480229+05:30
98	Migration20250207132723	2026-05-14 19:00:36.480229+05:30
99	Migration20250625084134	2026-05-14 19:00:36.480229+05:30
100	Migration20250924135437	2026-05-14 19:00:36.480229+05:30
101	Migration20250929124701	2026-05-14 19:00:36.480229+05:30
102	Migration20240219102530	2026-05-14 19:00:36.586204+05:30
103	Migration20240604100512	2026-05-14 19:00:36.586204+05:30
104	Migration20240715102100	2026-05-14 19:00:36.586204+05:30
105	Migration20240715174100	2026-05-14 19:00:36.586204+05:30
106	Migration20240716081800	2026-05-14 19:00:36.586204+05:30
107	Migration20240801085921	2026-05-14 19:00:36.586204+05:30
108	Migration20240821164505	2026-05-14 19:00:36.586204+05:30
109	Migration20240821170920	2026-05-14 19:00:36.586204+05:30
110	Migration20240827133639	2026-05-14 19:00:36.586204+05:30
111	Migration20240902195921	2026-05-14 19:00:36.586204+05:30
112	Migration20240913092514	2026-05-14 19:00:36.586204+05:30
113	Migration20240930122627	2026-05-14 19:00:36.586204+05:30
114	Migration20241014142943	2026-05-14 19:00:36.586204+05:30
115	Migration20241106085223	2026-05-14 19:00:36.586204+05:30
116	Migration20241129124827	2026-05-14 19:00:36.586204+05:30
117	Migration20241217162224	2026-05-14 19:00:36.586204+05:30
118	Migration20250326151554	2026-05-14 19:00:36.586204+05:30
119	Migration20250522181137	2026-05-14 19:00:36.586204+05:30
120	Migration20250702095353	2026-05-14 19:00:36.586204+05:30
121	Migration20250704120229	2026-05-14 19:00:36.586204+05:30
122	Migration20250910130000	2026-05-14 19:00:36.586204+05:30
123	Migration20251016160403	2026-05-14 19:00:36.586204+05:30
124	Migration20251016182939	2026-05-14 19:00:36.586204+05:30
125	Migration20251017155709	2026-05-14 19:00:36.586204+05:30
126	Migration20251114100559	2026-05-14 19:00:36.586204+05:30
127	Migration20251125164002	2026-05-14 19:00:36.586204+05:30
128	Migration20251210112909	2026-05-14 19:00:36.586204+05:30
129	Migration20251210112924	2026-05-14 19:00:36.586204+05:30
130	Migration20251225120947	2026-05-14 19:00:36.586204+05:30
131	Migration20260106185528	2026-05-14 19:00:36.586204+05:30
132	Migration20250717162007	2026-05-14 19:00:36.805187+05:30
133	Migration20260127081758	2026-05-14 19:00:36.805187+05:30
134	Migration20240205025928	2026-05-14 19:00:36.828705+05:30
135	Migration20240529080336	2026-05-14 19:00:36.828705+05:30
136	Migration20241202100304	2026-05-14 19:00:36.828705+05:30
137	Migration20240214033943	2026-05-14 19:00:36.864975+05:30
138	Migration20240703095850	2026-05-14 19:00:36.864975+05:30
139	Migration20241202103352	2026-05-14 19:00:36.864975+05:30
140	Migration20240311145700_InitialSetupMigration	2026-05-14 19:00:36.891496+05:30
141	Migration20240821170957	2026-05-14 19:00:36.891496+05:30
142	Migration20240917161003	2026-05-14 19:00:36.891496+05:30
143	Migration20241217110416	2026-05-14 19:00:36.891496+05:30
144	Migration20250113122235	2026-05-14 19:00:36.891496+05:30
145	Migration20250120115002	2026-05-14 19:00:36.891496+05:30
146	Migration20250822130931	2026-05-14 19:00:36.891496+05:30
147	Migration20250825132614	2026-05-14 19:00:36.891496+05:30
148	Migration20251114133146	2026-05-14 19:00:36.891496+05:30
149	Migration20240509083918_InitialSetupMigration	2026-05-14 19:00:36.964956+05:30
150	Migration20240628075401	2026-05-14 19:00:36.964956+05:30
151	Migration20240830094712	2026-05-14 19:00:36.964956+05:30
152	Migration20250120110514	2026-05-14 19:00:36.964956+05:30
153	Migration20251028172715	2026-05-14 19:00:36.964956+05:30
154	Migration20251121123942	2026-05-14 19:00:36.964956+05:30
155	Migration20251121150408	2026-05-14 19:00:36.964956+05:30
156	Migration20231228143900	2026-05-14 19:00:37.020661+05:30
157	Migration20241206101446	2026-05-14 19:00:37.020661+05:30
158	Migration20250128174331	2026-05-14 19:00:37.020661+05:30
159	Migration20250505092459	2026-05-14 19:00:37.020661+05:30
160	Migration20250819104213	2026-05-14 19:00:37.020661+05:30
161	Migration20250819110924	2026-05-14 19:00:37.020661+05:30
162	Migration20250908080305	2026-05-14 19:00:37.020661+05:30
163	Migration20260616173146	2026-06-16 23:01:54.469105+05:30
164	Migration20260616193555	2026-06-17 01:06:05.498589+05:30
165	Migration20260617083235	2026-06-17 14:02:38.819574+05:30
166	Migration20260617102706	2026-06-17 15:57:09.888015+05:30
167	Migration20260617115057	2026-06-17 17:21:06.189214+05:30
168	Migration20260617121440	2026-06-17 17:44:43.417723+05:30
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.notification (id, "to", channel, template, data, trigger_type, resource_id, resource_type, receiver_id, original_notification_id, idempotency_key, external_id, provider_id, created_at, updated_at, deleted_at, status, "from", provider_data) FROM stdin;
\.


--
-- Data for Name: notification_provider; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.notification_provider (id, handle, name, is_enabled, channels, created_at, updated_at, deleted_at) FROM stdin;
local	local	local	t	{feed}	2026-05-14 19:00:38.389+05:30	2026-05-14 19:00:38.389+05:30	\N
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public."order" (id, region_id, display_id, customer_id, version, sales_channel_id, status, is_draft_order, email, currency_code, shipping_address_id, billing_address_id, no_notification, metadata, created_at, updated_at, deleted_at, canceled_at, custom_display_id, locale) FROM stdin;
order_01KRRCCGTC656Q2J8DECFBFZEP	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	2	cus_01KRR32R60QYZKP37YDZ8WHDM5	1	sc_01KRKAX80VSSFAHXGWHE3PJX51	pending	f	rehan.beg2000@gmail.com	inr	ordaddr_01KRRCCGT9VGYGCWPGSMX9XM8D	ordaddr_01KRRCCGT9CKJD2FZD8JD82FV3	\N	{"source": "razorpay_custom_flow", "cart_id": "cart_01KRRBQG9XHK5GKQSVDD6D35W6", "payment_status": "captured", "razorpay_order_id": "order_Sq2Kk1M8dZS6ZQ", "razorpay_signature": "b46590a638399e2d99fb0364bbc3c8d9c23d6e1c564469b29179cc20f3bcfca4", "razorpay_payment_id": "pay_Sq2KzMzkW8Q7cV"}	2026-05-16 18:02:40.27+05:30	2026-05-16 18:02:40.27+05:30	\N	\N	\N	\N
order_01KRRBQ301JRER2G3KP7RAGK94	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	1	cus_01KRRBQ2Y3FA65XV7EK0J27AWQ	2	sc_01KRKAX80VSSFAHXGWHE3PJX51	canceled	f	guest@safinacarpets.com	usd	ordaddr_01KRRBQ2ZZQHFTQX6HZPBC8RND	ordaddr_01KRRBQ2ZZ33EEQW4W9H3A2MM4	\N	{"source": "razorpay_custom_flow", "cart_id": "cart_01KRRBE5VX2AGCPS4SK33VBFRB", "payment_status": "captured", "razorpay_order_id": "order_Sq28TkSYunOhWE", "razorpay_signature": "a6057657d0d106a7c5f1163570e180465597fe6bcb648284042563da946dbf24", "razorpay_payment_id": "pay_Sq28cxEmv62DVQ"}	2026-05-16 17:50:57.989+05:30	2026-05-16 18:05:40.522+05:30	\N	2026-05-16 18:05:40.521+05:30	\N	\N
order_01KRRD3TB0BYGSG5RE4Z14QXS4	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	3	cus_01KRR32R60QYZKP37YDZ8WHDM5	4	sc_01KRKAX80VSSFAHXGWHE3PJX51	pending	f	rehan.beg2000@gmail.com	inr	ordaddr_01KRRD3TAZ1814TCX5XGMF20TQ	ordaddr_01KRRD3TAY3ABG6ED1RSMB9JY3	\N	{"source": "razorpay_custom_flow", "cart_id": "cart_01KRRCHGNQMAN5MSQB0KK2XPDS", "payment_status": "captured", "razorpay_order_id": "order_Sq2YKVEcsUazIY", "razorpay_signature": "8813c4207db929e5723b00aad9e3f179c8882333be7403797d3634d31c363d1d", "razorpay_payment_id": "pay_Sq2YRDt4mYMkDW"}	2026-05-16 18:15:23.682+05:30	2026-05-16 18:30:14.506+05:30	\N	\N	\N	\N
order_01KRRK0CMEMSVF8VBR9Q4YK9KK	reg_01KRKAX81XA5QQ02YB4BG7MC90	4	cus_01KRR32R60QYZKP37YDZ8WHDM5	1	sc_01KRKAX80VSSFAHXGWHE3PJX51	pending	f	rehan.beg2000@gmail.com	eur	ordaddr_01KRRK0CMB6Q5DV8FMY9TR9CJX	ordaddr_01KRRK0CMB8YSNJXV7YB3SXXN0	\N	{"source": "razorpay_custom_flow", "cart_id": "cart_01KRRD7B19M5HHE3SWC8HARQMD", "payment_status": "captured", "razorpay_order_id": "order_Sq4In0M18F9pOQ", "razorpay_signature": "1e436e4578ed05e047cc36cb7953bdf9a69dfa4640550d27e30b5bac5c777f44", "razorpay_payment_id": "pay_Sq4J74aTPJ9mBq"}	2026-05-16 19:58:22.801+05:30	2026-05-16 19:58:22.801+05:30	\N	\N	\N	\N
order_01KRRYFJYZYDHRQ1M2TK4SV7NH	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	5	cus_01KRRYE7MKBW1HK4CJNRBCT8AG	1	sc_01KRKAX80VSSFAHXGWHE3PJX51	pending	f	test@safinacarpets.com	inr	ordaddr_01KRRYFJYTNY9YHMGKZZ93AK2E	ordaddr_01KRRYFJYTYS1RRQ13NPR7CMHT	\N	{"source": "razorpay_custom_flow", "cart_id": "cart_01KRRYDTQWV83PFDJJCNZ03CCW", "payment_status": "captured", "razorpay_order_id": "order_Sq7j5bDjXk44Q0", "razorpay_payment_id": "pay_test_12345"}	2026-05-16 23:18:55.141+05:30	2026-05-16 23:18:55.141+05:30	\N	\N	\N	\N
order_01KVAGAZ7VQFTH2T3S3J92Y4AM	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	6	cus_01KV8SQZ9G625TQEEN0G2CHWT3	1	sc_01KRKAX80VSSFAHXGWHE3PJX51	pending	f	rehan.beg2004@gmail.com	inr	ordaddr_01KVAGAZ7S3E7A4GNDJ7RF9YD3	ordaddr_01KVAGAZ7S47HVMVXZDZM12S93	\N	{"source": "razorpay_custom_flow", "cart_id": "cart_01KVA8TXZBSBF0HH86G557SQ50", "payment_status": "captured", "razorpay_order_id": "order_T2enthiykr5mBS", "razorpay_signature": "421832de86a4ae113297f592033f7ecc77fd1103676704c900d47a478fc5169a", "razorpay_payment_id": "pay_T2ep0deSXaIjme"}	2026-06-17 15:29:27.229+05:30	2026-06-17 15:29:27.229+05:30	\N	\N	\N	\N
\.


--
-- Data for Name: order_address; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_address (id, customer_id, company, first_name, last_name, address_1, address_2, city, country_code, province, postal_code, phone, metadata, created_at, updated_at, deleted_at) FROM stdin;
ordaddr_01KRRBQ2ZZ33EEQW4W9H3A2MM4	\N	\N	\N	\N	Not provided	\N	Not provided	in	\N	000000	\N	\N	2026-05-16 17:50:57.989+05:30	2026-05-16 17:50:57.989+05:30	\N
ordaddr_01KRRBQ2ZZQHFTQX6HZPBC8RND	\N	\N	\N	\N	Not provided	\N	Not provided	in	\N	000000	\N	\N	2026-05-16 17:50:57.989+05:30	2026-05-16 17:50:57.989+05:30	\N
ordaddr_01KRRCCGT9CKJD2FZD8JD82FV3	\N	\N	\N	\N	Not provided	\N	Not provided	in	\N	000000	\N	\N	2026-05-16 18:02:40.27+05:30	2026-05-16 18:02:40.27+05:30	\N
ordaddr_01KRRCCGT9VGYGCWPGSMX9XM8D	\N	\N	\N	\N	Not provided	\N	Not provided	in	\N	000000	\N	\N	2026-05-16 18:02:40.27+05:30	2026-05-16 18:02:40.27+05:30	\N
ordaddr_01KRRD3TAY3ABG6ED1RSMB9JY3	\N	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
ordaddr_01KRRD3TAZ1814TCX5XGMF20TQ	\N	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
ordaddr_01KRRK0CMB8YSNJXV7YB3SXXN0	\N	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 19:58:22.801+05:30	2026-05-16 19:58:22.801+05:30	\N
ordaddr_01KRRK0CMB6Q5DV8FMY9TR9CJX	\N	\N	rehan	beg	G-20 Madanpur khadar	\N	110076	in	\N	110076	\N	\N	2026-05-16 19:58:22.801+05:30	2026-05-16 19:58:22.801+05:30	\N
ordaddr_01KRRYFJYTYS1RRQ13NPR7CMHT	\N	\N	Test	Customer	123 Safina Lane	\N	New Delhi	in	Delhi	110001	9876543210	\N	2026-05-16 23:18:55.141+05:30	2026-05-16 23:18:55.141+05:30	\N
ordaddr_01KRRYFJYTNY9YHMGKZZ93AK2E	\N	\N	Test	Customer	123 Safina Lane	\N	New Delhi	in	Delhi	110001	9876543210	\N	2026-05-16 23:18:55.141+05:30	2026-05-16 23:18:55.141+05:30	\N
ordaddr_01KVAGAZ7S47HVMVXZDZM12S93	\N	\N	Rizwan	-	fdfd	\N	dfd	in	Rajasthan	232322	9978662223	\N	2026-06-17 15:29:27.229+05:30	2026-06-17 15:29:27.229+05:30	\N
ordaddr_01KVAGAZ7S3E7A4GNDJ7RF9YD3	\N	\N	Rizwan	-	fdfd	\N	dfd	in	Rajasthan	232322	9978662223	\N	2026-06-17 15:29:27.229+05:30	2026-06-17 15:29:27.229+05:30	\N
\.


--
-- Data for Name: order_cart; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_cart (order_id, cart_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_change; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_change (id, order_id, version, description, status, internal_note, created_by, requested_by, requested_at, confirmed_by, confirmed_at, declined_by, declined_reason, metadata, declined_at, canceled_by, canceled_at, created_at, updated_at, change_type, deleted_at, return_id, claim_id, exchange_id, carry_over_promotions) FROM stdin;
ordch_01KRRCJ0RKVX7SB3AKHH5S0H7V	order_01KRRBQ301JRER2G3KP7RAGK94	2	\N	confirmed	\N	\N	\N	\N	\N	2026-05-16 18:05:40.472+05:30	\N	\N	\N	\N	\N	\N	2026-05-16 18:05:40.435+05:30	2026-05-16 18:05:40.506+05:30	credit_line	\N	\N	\N	\N	\N
ordch_01KRRDVHDYR33YPHGC2KM11NMT	order_01KRRD3TB0BYGSG5RE4Z14QXS4	2	\N	confirmed	\N	\N	\N	\N	\N	2026-05-16 18:28:21.002+05:30	\N	\N	\N	\N	\N	\N	2026-05-16 18:28:20.991+05:30	2026-05-16 18:28:21.004+05:30	\N	\N	\N	\N	\N	\N
ordch_01KRRDXV5QG6YQ6P4A4NPM4APH	order_01KRRD3TB0BYGSG5RE4Z14QXS4	3	\N	confirmed	\N	user_01KRKDN2SH796294F8NGPNDGER	\N	\N	\N	2026-05-16 18:29:36.513+05:30	\N	\N	\N	\N	\N	\N	2026-05-16 18:29:36.504+05:30	2026-05-16 18:29:36.514+05:30	\N	\N	\N	\N	\N	\N
ordch_01KRRDZ0859JK1QXDF3DAFXDAE	order_01KRRD3TB0BYGSG5RE4Z14QXS4	4	\N	confirmed	\N	\N	\N	\N	\N	2026-05-16 18:30:14.478+05:30	\N	\N	\N	\N	\N	\N	2026-05-16 18:30:14.469+05:30	2026-05-16 18:30:14.48+05:30	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: order_change_action; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_change_action (id, order_id, version, ordering, order_change_id, reference, reference_id, action, details, amount, raw_amount, internal_note, applied, created_at, updated_at, deleted_at, return_id, claim_id, exchange_id) FROM stdin;
ordchact_01KRRCJ0SB40NZXWWC4N812PRB	order_01KRRBQ301JRER2G3KP7RAGK94	2	1	ordch_01KRRCJ0RKVX7SB3AKHH5S0H7V	payment_collection	\N	CREDIT_LINE_ADD	{}	0	{"value": "0", "precision": 20}	\N	t	2026-05-16 18:05:40.459+05:30	2026-05-16 18:05:40.516+05:30	\N	\N	\N	\N
ordchact_01KRRDVHDYBR219N14989BJMX3	order_01KRRD3TB0BYGSG5RE4Z14QXS4	2	2	ordch_01KRRDVHDYR33YPHGC2KM11NMT	fulfillment	ful_01KRRDVHD1YHG1XRXSJA0YZ4BE	FULFILL_ITEM	{"quantity": 11, "reference_id": "ordli_01KRRD3TB1Y53FWE647W70XGAE"}	\N	\N	\N	t	2026-05-16 18:28:20.991+05:30	2026-05-16 18:28:21.03+05:30	\N	\N	\N	\N
ordchact_01KRRDXV5QX8DC9FB9HK0X4HN8	order_01KRRD3TB0BYGSG5RE4Z14QXS4	3	3	ordch_01KRRDXV5QG6YQ6P4A4NPM4APH	fulfillment	ful_01KRRDVHD1YHG1XRXSJA0YZ4BE	SHIP_ITEM	{"quantity": "11", "reference_id": "ordli_01KRRD3TB1Y53FWE647W70XGAE"}	\N	\N	\N	t	2026-05-16 18:29:36.504+05:30	2026-05-16 18:29:36.536+05:30	\N	\N	\N	\N
ordchact_01KRRDZ084RZ78H62HABJ9TJ6X	order_01KRRD3TB0BYGSG5RE4Z14QXS4	4	4	ordch_01KRRDZ0859JK1QXDF3DAFXDAE	fulfillment	ful_01KRRDVHD1YHG1XRXSJA0YZ4BE	DELIVER_ITEM	{"quantity": "11", "reference_id": "ordli_01KRRD3TB1Y53FWE647W70XGAE"}	\N	\N	\N	t	2026-05-16 18:30:14.469+05:30	2026-05-16 18:30:14.506+05:30	\N	\N	\N	\N
\.


--
-- Data for Name: order_claim; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_claim (id, order_id, return_id, order_version, display_id, type, no_notification, refund_amount, raw_refund_amount, metadata, created_at, updated_at, deleted_at, canceled_at, created_by) FROM stdin;
\.


--
-- Data for Name: order_claim_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_claim_item (id, claim_id, item_id, is_additional_item, reason, quantity, raw_quantity, note, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_claim_item_image; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_claim_item_image (id, claim_item_id, url, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_credit_line; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_credit_line (id, order_id, reference, reference_id, amount, raw_amount, metadata, created_at, updated_at, deleted_at, version) FROM stdin;
ordcl_01KRRCJ0TTD3AGWWBGP20D9J96	order_01KRRBQ301JRER2G3KP7RAGK94	payment_collection	\N	0	{"value": "0", "precision": 20}	{"created_in_version": 2}	2026-05-16 18:05:40.507+05:30	2026-05-16 18:05:40.507+05:30	\N	2
\.


--
-- Data for Name: order_exchange; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_exchange (id, order_id, return_id, order_version, display_id, no_notification, allow_backorder, difference_due, raw_difference_due, metadata, created_at, updated_at, deleted_at, canceled_at, created_by) FROM stdin;
\.


--
-- Data for Name: order_exchange_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_exchange_item (id, exchange_id, item_id, quantity, raw_quantity, note, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_fulfillment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_fulfillment (order_id, fulfillment_id, id, created_at, updated_at, deleted_at) FROM stdin;
order_01KRRD3TB0BYGSG5RE4Z14QXS4	ful_01KRRDVHD1YHG1XRXSJA0YZ4BE	ordful_01KRRDVHDQ0QQAK7GJM0XKK39A	2026-05-16 18:28:20.983429+05:30	2026-05-16 18:28:20.983429+05:30	\N
\.


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_item (id, order_id, version, item_id, quantity, raw_quantity, fulfilled_quantity, raw_fulfilled_quantity, shipped_quantity, raw_shipped_quantity, return_requested_quantity, raw_return_requested_quantity, return_received_quantity, raw_return_received_quantity, return_dismissed_quantity, raw_return_dismissed_quantity, written_off_quantity, raw_written_off_quantity, metadata, created_at, updated_at, deleted_at, delivered_quantity, raw_delivered_quantity, unit_price, raw_unit_price, compare_at_unit_price, raw_compare_at_unit_price) FROM stdin;
orditem_01KRRBQ3041B3CV8TREYR4K0N9	order_01KRRBQ301JRER2G3KP7RAGK94	1	ordli_01KRRBQ303FNH6P726FEMS87VE	11	{"value": "11", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 17:50:57.989+05:30	2026-05-16 17:50:57.989+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
orditem_01KRRCCGTD6V9NKQPYC15J3197	order_01KRRCCGTC656Q2J8DECFBFZEP	1	ordli_01KRRCCGTDS1J7NP60NS4P09EM	11	{"value": "11", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 18:02:40.27+05:30	2026-05-16 18:02:40.27+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
orditem_01KRRCJ0TSESMYKRCQYM0CK0J9	order_01KRRBQ301JRER2G3KP7RAGK94	2	ordli_01KRRBQ303FNH6P726FEMS87VE	11	{"value": "11", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 18:05:40.507+05:30	2026-05-16 18:05:40.507+05:30	\N	0	{"value": "0", "precision": 20}	15	{"value": "15", "precision": 20}	\N	\N
orditem_01KRRD3TB1A40YP9BCD9EKWB8P	order_01KRRD3TB0BYGSG5RE4Z14QXS4	1	ordli_01KRRD3TB1Y53FWE647W70XGAE	13	{"value": "13", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
orditem_01KRRDVHF36TPKY9B1RTK8THV8	order_01KRRD3TB0BYGSG5RE4Z14QXS4	2	ordli_01KRRD3TB1Y53FWE647W70XGAE	13	{"value": "13", "precision": 20}	11	{"value": "11", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 18:28:21.03+05:30	2026-05-16 18:28:21.03+05:30	\N	0	{"value": "0", "precision": 20}	15	{"value": "15", "precision": 20}	\N	\N
orditem_01KRRDXV6NX1JCPKXDW38QMZXT	order_01KRRD3TB0BYGSG5RE4Z14QXS4	3	ordli_01KRRD3TB1Y53FWE647W70XGAE	13	{"value": "13", "precision": 20}	11	{"value": "11", "precision": 20}	11	{"value": "11", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 18:29:36.535+05:30	2026-05-16 18:29:36.535+05:30	\N	0	{"value": "0", "precision": 20}	15	{"value": "15", "precision": 20}	\N	\N
orditem_01KRRDZ097XNJ7XJ9KYVZQB9F0	order_01KRRD3TB0BYGSG5RE4Z14QXS4	4	ordli_01KRRD3TB1Y53FWE647W70XGAE	13	{"value": "13", "precision": 20}	11	{"value": "11", "precision": 20}	11	{"value": "11", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 18:30:14.506+05:30	2026-05-16 18:30:14.506+05:30	\N	11	{"value": "11", "precision": 20}	15	{"value": "15", "precision": 20}	\N	\N
orditem_01KRRK0CMHPJWP2D12W14216T5	order_01KRRK0CMEMSVF8VBR9Q4YK9KK	1	ordli_01KRRK0CMFTEGPCJ5WWYR2PKJR	1	{"value": "1", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 19:58:22.802+05:30	2026-05-16 19:58:22.802+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
orditem_01KRRK0CMHVBYP4KGGD8ZZ4C8K	order_01KRRK0CMEMSVF8VBR9Q4YK9KK	1	ordli_01KRRK0CMFH6WDVYFCD9GHE3GF	1	{"value": "1", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 19:58:22.802+05:30	2026-05-16 19:58:22.802+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
orditem_01KRRYFJZ4YBNWFSDZHV04CYR3	order_01KRRYFJYZYDHRQ1M2TK4SV7NH	1	ordli_01KRRYFJZ3HRDWNQ80T3DE9H5Z	1	{"value": "1", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-05-16 23:18:55.141+05:30	2026-05-16 23:18:55.141+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
orditem_01KVAGAZ7WM8VA33BE1SBQED2Y	order_01KVAGAZ7VQFTH2T3S3J92Y4AM	1	ordli_01KVAGAZ7WCVK5A6SZC1Z9SEXB	1	{"value": "1", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	0	{"value": "0", "precision": 20}	{}	2026-06-17 15:29:27.229+05:30	2026-06-17 15:29:27.229+05:30	\N	0	{"value": "0", "precision": 20}	\N	\N	\N	\N
\.


--
-- Data for Name: order_line_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_line_item (id, totals_id, title, subtitle, thumbnail, variant_id, product_id, product_title, product_description, product_subtitle, product_type, product_collection, product_handle, variant_sku, variant_barcode, variant_title, variant_option_values, requires_shipping, is_discountable, is_tax_inclusive, compare_at_unit_price, raw_compare_at_unit_price, unit_price, raw_unit_price, metadata, created_at, updated_at, deleted_at, is_custom_price, product_type_id, is_giftcard) FROM stdin;
ordli_01KRRBQ303FNH6P726FEMS87VE	\N	Medusa T-Shirt	L / Black	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png	variant_01KRKAX87D771CKZ4VCV4T3X7E	prod_01KRKAX85SW40G1WEE2Z9MDAEB	Medusa T-Shirt	Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.	\N	\N	\N	t-shirt	SHIRT-L-BLACK	\N	L / Black	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 17:50:57.989+05:30	2026-05-16 17:50:57.989+05:30	\N	t	\N	f
ordli_01KRRCCGTDS1J7NP60NS4P09EM	\N	Medusa T-Shirt	L / Black	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png	variant_01KRKAX87D771CKZ4VCV4T3X7E	prod_01KRKAX85SW40G1WEE2Z9MDAEB	Medusa T-Shirt	Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.	\N	\N	\N	t-shirt	SHIRT-L-BLACK	\N	L / Black	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 18:02:40.27+05:30	2026-05-16 18:02:40.27+05:30	\N	t	\N	f
ordli_01KRRD3TB1Y53FWE647W70XGAE	\N	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	15	{"value": "15", "precision": 20}	{}	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N	t	\N	f
ordli_01KRRK0CMFTEGPCJ5WWYR2PKJR	\N	Medusa Shorts	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png	variant_01KRKAX87E1B87QYMX0YHM2QE1	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	Medusa Shorts	Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.	\N	\N	\N	shorts	SHORTS-S	\N	S	\N	t	t	f	\N	\N	1000	{"value": "1000", "precision": 20}	{}	2026-05-16 19:58:22.801+05:30	2026-05-16 19:58:22.801+05:30	\N	t	\N	f
ordli_01KRRK0CMFH6WDVYFCD9GHE3GF	\N	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	1000	{"value": "1000", "precision": 20}	{}	2026-05-16 19:58:22.802+05:30	2026-05-16 19:58:22.802+05:30	\N	t	\N	f
ordli_01KRRYFJZ3HRDWNQ80T3DE9H5Z	\N	sdfsdf	Default variant	http://localhost:9000/static/1778940493345-WhatsApp%20Image%202026-04-07%20at%2017.18.26.jpeg	variant_01KRRHVFJXJS8T70KSZB4MM7C7	prod_01KRRHVFHKZNFNS6D1DW50VH43	sdfsdf	asfdsdf		\N	8X10	sdfsdf	\N	\N	Default variant	\N	f	t	f	\N	\N	2000000	{"value": "2000000", "precision": 20}	{}	2026-05-16 23:18:55.141+05:30	2026-05-16 23:18:55.141+05:30	\N	t	\N	f
ordli_01KVAGAZ7WCVK5A6SZC1Z9SEXB	\N	Medusa Sweatpants	S	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	variant_01KRKAX87E1Y1SQT8EDPQ88JP5	prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	\N	\N	\N	sweatpants	SWEATPANTS-S	\N	S	\N	t	t	f	\N	\N	1000000	{"value": "1000000", "precision": 20}	{}	2026-06-17 15:29:27.229+05:30	2026-06-17 15:29:27.229+05:30	\N	t	\N	f
\.


--
-- Data for Name: order_line_item_adjustment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_line_item_adjustment (id, description, promotion_id, code, amount, raw_amount, provider_id, created_at, updated_at, item_id, deleted_at, is_tax_inclusive, version) FROM stdin;
\.


--
-- Data for Name: order_line_item_tax_line; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_line_item_tax_line (id, description, tax_rate_id, code, rate, raw_rate, provider_id, created_at, updated_at, item_id, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_payment_collection; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_payment_collection (order_id, payment_collection_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_promotion; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_promotion (order_id, promotion_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_shipping; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_shipping (id, order_id, version, shipping_method_id, created_at, updated_at, deleted_at, return_id, claim_id, exchange_id) FROM stdin;
\.


--
-- Data for Name: order_shipping_method; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_shipping_method (id, name, description, amount, raw_amount, is_tax_inclusive, shipping_option_id, data, metadata, created_at, updated_at, deleted_at, is_custom_amount) FROM stdin;
\.


--
-- Data for Name: order_shipping_method_adjustment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_shipping_method_adjustment (id, description, promotion_id, code, amount, raw_amount, provider_id, created_at, updated_at, shipping_method_id, deleted_at, version) FROM stdin;
\.


--
-- Data for Name: order_shipping_method_tax_line; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_shipping_method_tax_line (id, description, tax_rate_id, code, rate, raw_rate, provider_id, created_at, updated_at, shipping_method_id, deleted_at) FROM stdin;
\.


--
-- Data for Name: order_summary; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_summary (id, order_id, version, totals, created_at, updated_at, deleted_at) FROM stdin;
ordsum_01KRRBQ30190Y7N91QEQRN1XXP	order_01KRRBQ301JRER2G3KP7RAGK94	1	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 165, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 165, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 165, "original_order_total": 165, "raw_accounting_total": {"value": "165", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "165", "precision": 20}, "raw_current_order_total": {"value": "165", "precision": 20}, "raw_original_order_total": {"value": "165", "precision": 20}}	2026-05-16 17:50:57.989+05:30	2026-05-16 17:50:57.989+05:30	\N
ordsum_01KRRCCGTBQ20K5QKF4YFDTPYE	order_01KRRCCGTC656Q2J8DECFBFZEP	1	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 165, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 165, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 165, "original_order_total": 165, "raw_accounting_total": {"value": "165", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "165", "precision": 20}, "raw_current_order_total": {"value": "165", "precision": 20}, "raw_original_order_total": {"value": "165", "precision": 20}}	2026-05-16 18:02:40.27+05:30	2026-05-16 18:02:40.27+05:30	\N
ordsum_01KRRCJ0TT599Q1YK5RA3AQYXP	order_01KRRBQ301JRER2G3KP7RAGK94	2	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 165, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 165, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 165, "original_order_total": 165, "raw_accounting_total": {"value": "165", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "165", "precision": 20}, "raw_current_order_total": {"value": "165", "precision": 20}, "raw_original_order_total": {"value": "165", "precision": 20}}	2026-05-16 18:05:40.507+05:30	2026-05-16 18:05:40.507+05:30	\N
ordsum_01KRRD3TB0X627K141WP0FP3D2	order_01KRRD3TB0BYGSG5RE4Z14QXS4	1	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 195, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 195, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 195, "original_order_total": 195, "raw_accounting_total": {"value": "195", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "195", "precision": 20}, "raw_current_order_total": {"value": "195", "precision": 20}, "raw_original_order_total": {"value": "195", "precision": 20}}	2026-05-16 18:15:23.682+05:30	2026-05-16 18:15:23.682+05:30	\N
ordsum_01KRRDVHF3A4Q78RRQP61FW93G	order_01KRRD3TB0BYGSG5RE4Z14QXS4	2	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 195, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 195, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 195, "original_order_total": 195, "raw_accounting_total": {"value": "195", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "195", "precision": 20}, "raw_current_order_total": {"value": "195", "precision": 20}, "raw_original_order_total": {"value": "195", "precision": 20}}	2026-05-16 18:28:21.03+05:30	2026-05-16 18:28:21.03+05:30	\N
ordsum_01KRRDXV6N081P2VB2AZKT0A04	order_01KRRD3TB0BYGSG5RE4Z14QXS4	3	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 195, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 195, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 195, "original_order_total": 195, "raw_accounting_total": {"value": "195", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "195", "precision": 20}, "raw_current_order_total": {"value": "195", "precision": 20}, "raw_original_order_total": {"value": "195", "precision": 20}}	2026-05-16 18:29:36.535+05:30	2026-05-16 18:29:36.535+05:30	\N
ordsum_01KRRDZ098PNVMS8EJ8FDY1DS6	order_01KRRD3TB0BYGSG5RE4Z14QXS4	4	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 195, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 195, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 195, "original_order_total": 195, "raw_accounting_total": {"value": "195", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "195", "precision": 20}, "raw_current_order_total": {"value": "195", "precision": 20}, "raw_original_order_total": {"value": "195", "precision": 20}}	2026-05-16 18:30:14.506+05:30	2026-05-16 18:30:14.506+05:30	\N
ordsum_01KRRK0CME6RV2E2RN3Q7Z6SNV	order_01KRRK0CMEMSVF8VBR9Q4YK9KK	1	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 2000, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 2000, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 2000, "original_order_total": 2000, "raw_accounting_total": {"value": "2000", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "2000", "precision": 20}, "raw_current_order_total": {"value": "2000", "precision": 20}, "raw_original_order_total": {"value": "2000", "precision": 20}}	2026-05-16 19:58:22.803+05:30	2026-05-16 19:58:22.803+05:30	\N
ordsum_01KRRYFJYY44EJ0D9CH2B6FGTW	order_01KRRYFJYZYDHRQ1M2TK4SV7NH	1	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 2000000, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 2000000, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 2000000, "original_order_total": 2000000, "raw_accounting_total": {"value": "2000000", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "2000000", "precision": 20}, "raw_current_order_total": {"value": "2000000", "precision": 20}, "raw_original_order_total": {"value": "2000000", "precision": 20}}	2026-05-16 23:18:55.142+05:30	2026-05-16 23:18:55.142+05:30	\N
ordsum_01KVAGAZ7VDC7YSTAAYENNX07Q	order_01KVAGAZ7VQFTH2T3S3J92Y4AM	1	{"paid_total": 0, "raw_paid_total": {"value": "0", "precision": 20}, "refunded_total": 0, "accounting_total": 1000000, "credit_line_total": 0, "transaction_total": 0, "pending_difference": 1000000, "raw_refunded_total": {"value": "0", "precision": 20}, "current_order_total": 1000000, "original_order_total": 1000000, "raw_accounting_total": {"value": "1000000", "precision": 20}, "raw_credit_line_total": {"value": "0", "precision": 20}, "raw_transaction_total": {"value": "0", "precision": 20}, "raw_pending_difference": {"value": "1000000", "precision": 20}, "raw_current_order_total": {"value": "1000000", "precision": 20}, "raw_original_order_total": {"value": "1000000", "precision": 20}}	2026-06-17 15:29:27.229+05:30	2026-06-17 15:29:27.229+05:30	\N
\.


--
-- Data for Name: order_transaction; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.order_transaction (id, order_id, version, amount, raw_amount, currency_code, reference, reference_id, created_at, updated_at, deleted_at, return_id, claim_id, exchange_id) FROM stdin;
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.payment (id, amount, raw_amount, currency_code, provider_id, data, created_at, updated_at, deleted_at, captured_at, canceled_at, payment_collection_id, payment_session_id, metadata) FROM stdin;
\.


--
-- Data for Name: payment_collection; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.payment_collection (id, currency_code, amount, raw_amount, authorized_amount, raw_authorized_amount, captured_amount, raw_captured_amount, refunded_amount, raw_refunded_amount, created_at, updated_at, deleted_at, completed_at, status, metadata) FROM stdin;
\.


--
-- Data for Name: payment_collection_payment_providers; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.payment_collection_payment_providers (payment_collection_id, payment_provider_id) FROM stdin;
\.


--
-- Data for Name: payment_provider; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.payment_provider (id, is_enabled, created_at, updated_at, deleted_at) FROM stdin;
pp_system_default	t	2026-05-14 19:00:38.388+05:30	2026-05-14 19:00:38.388+05:30	\N
\.


--
-- Data for Name: payment_session; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.payment_session (id, currency_code, amount, raw_amount, provider_id, data, context, status, authorized_at, payment_collection_id, metadata, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.price (id, title, price_set_id, currency_code, raw_amount, rules_count, created_at, updated_at, deleted_at, price_list_id, amount, min_quantity, max_quantity, raw_min_quantity, raw_max_quantity) FROM stdin;
price_01KRKAX84D231SZXWD9H1YECDN	\N	pset_01KRKAX84D16769CS6M8504FSC	usd	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX84D300W0KEJHWKBJER6	\N	pset_01KRKAX84D16769CS6M8504FSC	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX84DVGAQ7M2EPY8J5SQB	\N	pset_01KRKAX84D16769CS6M8504FSC	eur	{"value": "10", "precision": 20}	1	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX84DD2CZVS54758E35A9	\N	pset_01KRKAX84DK9GD9KJ6FGSAPNED	usd	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX84DYBY71BMZ2NK41A1Y	\N	pset_01KRKAX84DK9GD9KJ6FGSAPNED	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX84DFW4VEH76S5CNPANW	\N	pset_01KRKAX84DK9GD9KJ6FGSAPNED	eur	{"value": "10", "precision": 20}	1	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88S1FTK41R427SBRGRM	\N	pset_01KRKAX88SPBPGR14EZQDW4C4D	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88SM7C8ST9JS17Q0YCJ	\N	pset_01KRKAX88SPBPGR14EZQDW4C4D	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SG0YNFXEE7EZVCXSS	\N	pset_01KRKAX88SGD1WCKJV2YRV9GP1	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88SZ4JB2Y0K3FYGDN8P	\N	pset_01KRKAX88SGD1WCKJV2YRV9GP1	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SKJ1AKM6RP8XT9DKG	\N	pset_01KRKAX88SKK5QDPNCQ650N1G9	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88S8BEBF66F99RAXGKY	\N	pset_01KRKAX88SKK5QDPNCQ650N1G9	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SDY88HHY2EQSH55WB	\N	pset_01KRKAX88SC2V579VJN8ZA384Z	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88SZR7NNQFVVP0TF0DG	\N	pset_01KRKAX88SC2V579VJN8ZA384Z	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SWM6MC99S04N3PA7F	\N	pset_01KRKAX88SFJP18RFSVKEQVN92	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88S1WJFKXZTARTS1PAC	\N	pset_01KRKAX88SFJP18RFSVKEQVN92	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SD9T1VQCAHY2JKAC4	\N	pset_01KRKAX88SY5RY1Z35MH06EETZ	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88STT38GP998BEXWMT1	\N	pset_01KRKAX88SY5RY1Z35MH06EETZ	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SFAP75WNGHR0M58Y4	\N	pset_01KRKAX88SN1V0FZCHVZSY3JVT	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88SQ70QS8XYYF7WDW47	\N	pset_01KRKAX88SN1V0FZCHVZSY3JVT	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SR5J955BVGAX7REWE	\N	pset_01KRKAX88SDPRTVYHDEC36YMS5	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88SHQTPMK01NT4CKWVT	\N	pset_01KRKAX88SDPRTVYHDEC36YMS5	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88SN01VP3MH6JESQHB4	\N	pset_01KRKAX88SMW9Q8JY86J6C4F2N	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88SKJQGEZNYZ7KVP3KF	\N	pset_01KRKAX88SMW9Q8JY86J6C4F2N	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TCFQNCF2E1JTCMJ78	\N	pset_01KRKAX88TYQZHBW0ES3G5EG46	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88T5F41TBRC96GCG8ZJ	\N	pset_01KRKAX88TYQZHBW0ES3G5EG46	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TRGP49XWWEKWDWQYR	\N	pset_01KRKAX88T80ZEZNANMCHNF66V	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88TGCHM2YBZMNKCEDF7	\N	pset_01KRKAX88T80ZEZNANMCHNF66V	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TQF3VXZ8GH1J78R31	\N	pset_01KRKAX88TDXWSTRT1W1DP7MCY	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88TPDHTEQPKPX1GRY0M	\N	pset_01KRKAX88TDXWSTRT1W1DP7MCY	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88T0MKYZX0C41RE7DK7	\N	pset_01KRKAX88TB6A8FH26XP3FWT65	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88T8QMDSYDDKY298EVK	\N	pset_01KRKAX88TB6A8FH26XP3FWT65	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TH78WHN05GANBYGHJ	\N	pset_01KRKAX88TW1B4HWC592KKS98T	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88T0CPXS3BPA7RXTNCW	\N	pset_01KRKAX88TW1B4HWC592KKS98T	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TR5AZMVCVH4QWXNWC	\N	pset_01KRKAX88TFP6964WQMRQMZRXT	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88TC8NGDYEHAS17CRF5	\N	pset_01KRKAX88TFP6964WQMRQMZRXT	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TT7S5MSQ4Q107X1T8	\N	pset_01KRKAX88TNWE14GBADK65B29N	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88TBK40TA4KNQERE443	\N	pset_01KRKAX88TNWE14GBADK65B29N	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TEVBDHWRXCN6RJCRP	\N	pset_01KRKAX88T2ZWE0W7BKYCT0WXQ	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88TN546BN8JDZHC5T75	\N	pset_01KRKAX88T2ZWE0W7BKYCT0WXQ	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88TF5HMJ53QG32JD756	\N	pset_01KRKAX88TBBQ6Z42KJJ1SGN66	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88TPQB01ZAM70PC5TW3	\N	pset_01KRKAX88TBBQ6Z42KJJ1SGN66	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88T613AHS13WQSZ13XA	\N	pset_01KRKAX88TAHWRXRJVFEQDW8MY	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88T8GDA8N5YVKPE6NT2	\N	pset_01KRKAX88TAHWRXRJVFEQDW8MY	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRKAX88V761BTRMG1TPJPA4K	\N	pset_01KRKAX88VCJ4W4F1H6BQNEVKS	eur	{"value": "10", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	10	\N	\N	\N	\N
price_01KRKAX88VV649T317CEPXXNJ3	\N	pset_01KRKAX88VCJ4W4F1H6BQNEVKS	usd	{"value": "15", "precision": 20}	0	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N	\N	15	\N	\N	\N	\N
price_01KRQH1R6QQTQ7GMP72FHWWBQB	\N	pset_01KRQH1R6QZYK8044QRH1H9MJB	eur	{"value": "2333", "precision": 20}	0	2026-05-16 10:04:55.831+05:30	2026-05-16 10:04:55.831+05:30	\N	\N	2333	\N	\N	\N	\N
price_01KRQH1R6Q8XM404QSTQ4BKTR9	\N	pset_01KRQH1R6QZYK8044QRH1H9MJB	usd	{"value": "2333", "precision": 20}	0	2026-05-16 10:04:55.832+05:30	2026-05-16 10:04:55.832+05:30	\N	\N	2333	\N	\N	\N	\N
price_01KRQH1R6Q1TKBR8BSRGWQ2G61	\N	pset_01KRQH1R6QZYK8044QRH1H9MJB	eur	{"value": "2333", "precision": 20}	1	2026-05-16 10:04:55.832+05:30	2026-05-16 10:04:55.832+05:30	\N	\N	2333	\N	\N	\N	\N
price_01KRRHVFKJPJ5B4E7070N1809G	\N	pset_01KRRHVFKKND1ACV5TEWJV786T	inr	{"value": "20000", "precision": 20}	0	2026-05-16 19:38:13.427+05:30	2026-05-16 19:38:13.427+05:30	\N	\N	20000	\N	\N	\N	\N
price_01KRRHVFKJNQ8V6F1HE89B7MC8	\N	pset_01KRRHVFKKND1ACV5TEWJV786T	inr	{"value": "20000", "precision": 20}	1	2026-05-16 19:38:13.427+05:30	2026-05-16 19:38:13.427+05:30	\N	\N	20000	\N	\N	\N	\N
price_01KV8QTRWPZWWDN668JSZ6K0ZA	\N	pset_01KRKAX88SFJP18RFSVKEQVN92	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.182+05:30	2026-06-16 23:01:56.182+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRWXQSGVY50SWZXF1XS1	\N	pset_01KRKAX88SN1V0FZCHVZSY3JVT	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.189+05:30	2026-06-16 23:01:56.189+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRWZB5KK8SPHBQ31H9YV	\N	pset_01KRKAX88SPBPGR14EZQDW4C4D	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.191+05:30	2026-06-16 23:01:56.191+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX03HW36XA7CQR0NXBQ	\N	pset_01KRKAX88SGD1WCKJV2YRV9GP1	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.192+05:30	2026-06-16 23:01:56.192+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX14CQHVVAM28F07C0V	\N	pset_01KRKAX88SC2V579VJN8ZA384Z	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.193+05:30	2026-06-16 23:01:56.193+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX20GDFW4MHZ5EWNT7J	\N	pset_01KRKAX88SY5RY1Z35MH06EETZ	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.194+05:30	2026-06-16 23:01:56.194+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX4HQDVBS42K42EKT7Q	\N	pset_01KRKAX88SKK5QDPNCQ650N1G9	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.196+05:30	2026-06-16 23:01:56.196+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX51QDGQZ3EX3J953AT	\N	pset_01KRKAX88T2ZWE0W7BKYCT0WXQ	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.197+05:30	2026-06-16 23:01:56.197+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX532B6KBKNWDFN6S4E	\N	pset_01KRKAX88TB6A8FH26XP3FWT65	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.198+05:30	2026-06-16 23:01:56.198+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX7DRJQRQMVR0MBKD2S	\N	pset_01KRKAX88TAHWRXRJVFEQDW8MY	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.199+05:30	2026-06-16 23:01:56.199+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX7MSXD9WHVXFH5X9RY	\N	pset_01KRKAX88TNWE14GBADK65B29N	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.2+05:30	2026-06-16 23:01:56.2+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX8VNVZ7NHVCRX66RNH	\N	pset_01KRKAX88SMW9Q8JY86J6C4F2N	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.2+05:30	2026-06-16 23:01:56.2+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRX9148X0CTWXY8Y2Z9S	\N	pset_01KRKAX88SDPRTVYHDEC36YMS5	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.201+05:30	2026-06-16 23:01:56.201+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXARAVDHDDBT74BZWN4	\N	pset_01KRKAX88TW1B4HWC592KKS98T	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.202+05:30	2026-06-16 23:01:56.202+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXBRWTGAPAZYPCJD2W1	\N	pset_01KRKAX88VCJ4W4F1H6BQNEVKS	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.203+05:30	2026-06-16 23:01:56.203+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXD8T0CRE0P3YRXT6C4	\N	pset_01KRKAX88TDXWSTRT1W1DP7MCY	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.205+05:30	2026-06-16 23:01:56.205+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXENGRR2RQP1WY7HHD9	\N	pset_01KRKAX88T80ZEZNANMCHNF66V	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.206+05:30	2026-06-16 23:01:56.206+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXFMFQQP3WDXMMMYKQP	\N	pset_01KRKAX88TBBQ6Z42KJJ1SGN66	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.207+05:30	2026-06-16 23:01:56.207+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXFK2S3EQXDA2WVXGJA	\N	pset_01KRKAX88TYQZHBW0ES3G5EG46	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.207+05:30	2026-06-16 23:01:56.207+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXG1JDHQ4D5R6YDXHHG	\N	pset_01KRKAX88TFP6964WQMRQMZRXT	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.208+05:30	2026-06-16 23:01:56.208+05:30	\N	\N	10000	\N	\N	\N	\N
price_01KV8QTRXHHVN2XZG0TQDK44KT	\N	pset_01KRQH1R6QZYK8044QRH1H9MJB	inr	{"value": "10000", "precision": 20}	0	2026-06-16 23:01:56.209+05:30	2026-06-16 23:01:56.209+05:30	\N	\N	10000	\N	\N	\N	\N
\.


--
-- Data for Name: price_list; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.price_list (id, status, starts_at, ends_at, rules_count, title, description, type, created_at, updated_at, deleted_at, metadata) FROM stdin;
\.


--
-- Data for Name: price_list_rule; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.price_list_rule (id, price_list_id, created_at, updated_at, deleted_at, value, attribute) FROM stdin;
\.


--
-- Data for Name: price_preference; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.price_preference (id, attribute, value, is_tax_inclusive, created_at, updated_at, deleted_at) FROM stdin;
prpref_01KRKAX81SNDSQ4RJCQPF4NBKX	currency_code	eur	f	2026-05-14 19:00:39.033+05:30	2026-05-14 19:00:39.033+05:30	\N
prpref_01KRKAX81SM536DZG87AGTWMKQ	currency_code	usd	f	2026-05-14 19:00:39.033+05:30	2026-05-14 19:00:39.033+05:30	\N
prpref_01KRKAX82CEJ4RY31STRT5HSM4	region_id	reg_01KRKAX81XA5QQ02YB4BG7MC90	f	2026-05-14 19:00:39.052+05:30	2026-05-14 19:00:39.052+05:30	\N
prpref_01KRQKQ7GR0ZQHNPRVD0KP7N81	region_id	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	f	2026-05-16 10:51:36.792+05:30	2026-05-16 10:51:36.792+05:30	\N
\.


--
-- Data for Name: price_rule; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.price_rule (id, value, priority, price_id, created_at, updated_at, deleted_at, attribute, operator) FROM stdin;
prule_01KRKAX84D1W5GYSTB3YJTR17N	reg_01KRKAX81XA5QQ02YB4BG7MC90	0	price_01KRKAX84DVGAQ7M2EPY8J5SQB	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	region_id	eq
prule_01KRKAX84D4NH05ZJJB3XB2HN3	reg_01KRKAX81XA5QQ02YB4BG7MC90	0	price_01KRKAX84DFW4VEH76S5CNPANW	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N	region_id	eq
prule_01KRQH1R6QMDF19FBJW34MA55Z	reg_01KRKAX81XA5QQ02YB4BG7MC90	0	price_01KRQH1R6Q1TKBR8BSRGWQ2G61	2026-05-16 10:04:55.832+05:30	2026-05-16 10:04:55.832+05:30	\N	region_id	eq
prule_01KRRHVFKJDYGX13P5FJ29Y9NT	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	0	price_01KRRHVFKJNQ8V6F1HE89B7MC8	2026-05-16 19:38:13.427+05:30	2026-05-16 19:38:13.427+05:30	\N	region_id	eq
\.


--
-- Data for Name: price_set; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.price_set (id, created_at, updated_at, deleted_at) FROM stdin;
pset_01KRKAX84D16769CS6M8504FSC	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N
pset_01KRKAX84DK9GD9KJ6FGSAPNED	2026-05-14 19:00:39.117+05:30	2026-05-14 19:00:39.117+05:30	\N
pset_01KRKAX88SPBPGR14EZQDW4C4D	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SGD1WCKJV2YRV9GP1	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SKK5QDPNCQ650N1G9	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SC2V579VJN8ZA384Z	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SFJP18RFSVKEQVN92	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SY5RY1Z35MH06EETZ	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SN1V0FZCHVZSY3JVT	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SDPRTVYHDEC36YMS5	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88SMW9Q8JY86J6C4F2N	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TYQZHBW0ES3G5EG46	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88T80ZEZNANMCHNF66V	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TDXWSTRT1W1DP7MCY	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TB6A8FH26XP3FWT65	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TW1B4HWC592KKS98T	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TFP6964WQMRQMZRXT	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TNWE14GBADK65B29N	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88T2ZWE0W7BKYCT0WXQ	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TBBQ6Z42KJJ1SGN66	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88TAHWRXRJVFEQDW8MY	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRKAX88VCJ4W4F1H6BQNEVKS	2026-05-14 19:00:39.259+05:30	2026-05-14 19:00:39.259+05:30	\N
pset_01KRQH1R6QZYK8044QRH1H9MJB	2026-05-16 10:04:55.831+05:30	2026-05-16 10:04:55.831+05:30	\N
pset_01KRRHVFKKND1ACV5TEWJV786T	2026-05-16 19:38:13.427+05:30	2026-05-16 19:38:13.427+05:30	\N
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product (id, title, handle, subtitle, description, is_giftcard, status, thumbnail, weight, length, height, width, origin_country, hs_code, mid_code, material, collection_id, type_id, discountable, external_id, created_at, updated_at, deleted_at, metadata) FROM stdin;
prod_01KRKAX85SW40G1WEE2Z9MDAEB	Medusa T-Shirt	t-shirt	\N	Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.	f	published	https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png	400	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N	\N
prod_01KRKAX85SSZ7EZKG0TPF5MHR8	Medusa Sweatshirt	sweatshirt	\N	Reimagine the feeling of a classic sweatshirt. With our cotton sweatshirt, everyday essentials no longer have to be ordinary.	f	published	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png	400	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N	\N
prod_01KRKAX85SAJS7C9BVGSQ01501	Medusa Sweatpants	sweatpants	\N	Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.	f	published	https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png	400	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N	\N
prod_01KRKAX85S1C8DAVTQKJ8W5XN4	Medusa Shorts	shorts	\N	Reimagine the feeling of classic shorts. With our cotton shorts, everyday essentials no longer have to be ordinary.	f	published	https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png	400	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N	\N
prod_01KRQH1R306RGYAFZFEE3W6KCH	Terracotta Tribal Wool Rug 4x6: Hand-Knotted Geometric Carpet	terracotta-tribal-wool-rug-4x6-hand-knotted-geometric-carpet		Size: 4x6 feet (122 x 183 cm)\nMaterial: 95% Wool and 5% Cotton\nColors: Terracotta Red, Black, Beige & Olive Green\nDesign: Traditional Tribal Geometric Motif with Central Medallions\nDensity: 130-150 KPSI\nOrigin: Handwoven in India – 100% Handmade (Hand Knotted)\nPile Height: 8MM - 12MM\nDurability: Strong and designed for high-traffic areas, Washable\nSuggested for: Living Room, Bedroom, Study, or Hallway\nHypoallergenic, Eco-friendly, Rustic & Timeless\n\nThis 4x6 ft tribal wool rug features terracotta red tones with black, beige, and olive green geometric motifs. Hand-knotted for durability and tradition, it is eco-friendly and hypoallergenic. A rustic yet elegant piece, perfect for adding timeless character to living rooms, bedrooms, or hallways.\n\n“No tariffs, customs, or import taxes — hassle-free delivery, we handle all import fees, nothing more to pay (Delivered Duty Paid).”\n\nMessage us if you have any questions, we‘ll be delighted to assist you 🙂	f	published	http://localhost:9000/static/1778906095684-Screenshot%202026-05-14%20at%2011.15.02%C3%A2%C2%80%C2%AFPM.png	20	9	5	6	in			\N	\N	\N	t	\N	2026-05-16 10:04:55.718+05:30	2026-05-16 10:05:51.242+05:30	\N	\N
prod_01KRRHVFHKZNFNS6D1DW50VH43	sdfsdf	sdfsdf		asfdsdf	f	published	http://localhost:9000/static/1778940493345-WhatsApp%20Image%202026-04-07%20at%2017.18.26.jpeg	\N	\N	\N	\N	\N	\N	\N	\N	pcol_01KRQH4040BQH87DTQ622PMAK4	\N	t	\N	2026-05-16 19:38:13.366+05:30	2026-05-16 19:38:13.366+05:30	\N	\N
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_category (id, name, description, handle, mpath, is_active, is_internal, rank, parent_category_id, created_at, updated_at, deleted_at, metadata, external_id) FROM stdin;
pcat_01KRKAX85J654XYVT5259K0A17	Shirts		shirts	pcat_01KRKAX85J654XYVT5259K0A17	t	f	0	\N	2026-05-14 19:00:39.155+05:30	2026-05-14 19:00:39.155+05:30	\N	\N	\N
pcat_01KRKAX85KRGE2KXKACTHH6474	Sweatshirts		sweatshirts	pcat_01KRKAX85KRGE2KXKACTHH6474	t	f	1	\N	2026-05-14 19:00:39.155+05:30	2026-05-14 19:00:39.155+05:30	\N	\N	\N
pcat_01KRKAX85KX2HNBN44QT6J5HVV	Pants		pants	pcat_01KRKAX85KX2HNBN44QT6J5HVV	t	f	2	\N	2026-05-14 19:00:39.155+05:30	2026-05-14 19:00:39.155+05:30	\N	\N	\N
pcat_01KRKAX85K24FAQ5X2574WJGD8	Merch		merch	pcat_01KRKAX85K24FAQ5X2574WJGD8	t	f	3	\N	2026-05-14 19:00:39.155+05:30	2026-05-14 19:00:39.155+05:30	\N	\N	\N
\.


--
-- Data for Name: product_category_product; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_category_product (product_id, product_category_id) FROM stdin;
prod_01KRKAX85SW40G1WEE2Z9MDAEB	pcat_01KRKAX85J654XYVT5259K0A17
prod_01KRKAX85SSZ7EZKG0TPF5MHR8	pcat_01KRKAX85KRGE2KXKACTHH6474
prod_01KRKAX85SAJS7C9BVGSQ01501	pcat_01KRKAX85KX2HNBN44QT6J5HVV
prod_01KRKAX85S1C8DAVTQKJ8W5XN4	pcat_01KRKAX85K24FAQ5X2574WJGD8
prod_01KRRHVFHKZNFNS6D1DW50VH43	pcat_01KRKAX85KRGE2KXKACTHH6474
\.


--
-- Data for Name: product_collection; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_collection (id, title, handle, metadata, created_at, updated_at, deleted_at, external_id) FROM stdin;
pcol_01KRQH4040BQH87DTQ622PMAK4	8X10	8x10	\N	2026-05-16 10:06:09.470266+05:30	2026-05-16 10:06:09.470266+05:30	\N	\N
\.


--
-- Data for Name: product_option; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_option (id, title, product_id, metadata, created_at, updated_at, deleted_at) FROM stdin;
opt_01KRKAX85TP15QY2N5CSQBDTV8	Size	prod_01KRKAX85SW40G1WEE2Z9MDAEB	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N
opt_01KRKAX85VZ2XHR10VHB366WZJ	Color	prod_01KRKAX85SW40G1WEE2Z9MDAEB	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
opt_01KRKAX85VTH3KRYKF0X8AQKS6	Size	prod_01KRKAX85SSZ7EZKG0TPF5MHR8	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
opt_01KRKAX85W0F7PAH3AQQ830H5C	Size	prod_01KRKAX85SAJS7C9BVGSQ01501	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
opt_01KRKAX85W3H8TV5ZX3P46AG1N	Size	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
opt_01KRQH1R34XVNDR0ZB3DDS745P	Default option	prod_01KRQH1R306RGYAFZFEE3W6KCH	\N	2026-05-16 10:04:55.721+05:30	2026-05-16 10:04:55.721+05:30	\N
opt_01KRRHVFHMEFABF9XF76CVX23W	Default option	prod_01KRRHVFHKZNFNS6D1DW50VH43	\N	2026-05-16 19:38:13.366+05:30	2026-05-16 19:38:13.366+05:30	\N
\.


--
-- Data for Name: product_option_value; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_option_value (id, value, option_id, metadata, created_at, updated_at, deleted_at) FROM stdin;
optval_01KRKAX85T9GZ2M9HT7MDKPJ1M	S	opt_01KRKAX85TP15QY2N5CSQBDTV8	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N
optval_01KRKAX85TN4ZVZWW1PJ6HACCX	M	opt_01KRKAX85TP15QY2N5CSQBDTV8	\N	2026-05-14 19:00:39.164+05:30	2026-05-14 19:00:39.164+05:30	\N
optval_01KRKAX85TFK2G7VRZ75E9QP3E	L	opt_01KRKAX85TP15QY2N5CSQBDTV8	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85TF4AC94DJ7BGS62MZ	XL	opt_01KRKAX85TP15QY2N5CSQBDTV8	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85T80S8DKHV8FHAS69P	Black	opt_01KRKAX85VZ2XHR10VHB366WZJ	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85TSPFJ1KY83S0W9SJR	White	opt_01KRKAX85VZ2XHR10VHB366WZJ	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85VDRBZ33T27HSQ83BQ	S	opt_01KRKAX85VTH3KRYKF0X8AQKS6	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85V6T5ARVHT0RJJQX7Z	M	opt_01KRKAX85VTH3KRYKF0X8AQKS6	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85V4ZZB5VCFQE8DBQAX	L	opt_01KRKAX85VTH3KRYKF0X8AQKS6	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85V4XH8T08MEXZX6QY5	XL	opt_01KRKAX85VTH3KRYKF0X8AQKS6	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85VB78YQY67VB5QSW3B	S	opt_01KRKAX85W0F7PAH3AQQ830H5C	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85V7Q5SZH27HHYF1MQQ	M	opt_01KRKAX85W0F7PAH3AQQ830H5C	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85V34H70GSFSCEA0KJM	L	opt_01KRKAX85W0F7PAH3AQQ830H5C	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85VNZW5Q9JMYT3XGS4C	XL	opt_01KRKAX85W0F7PAH3AQQ830H5C	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85WNB0H8BFXJQ84WCZT	S	opt_01KRKAX85W3H8TV5ZX3P46AG1N	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85WACZ8GF50CE91V3BX	M	opt_01KRKAX85W3H8TV5ZX3P46AG1N	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85WZYPCDT1WHA14ST20	L	opt_01KRKAX85W3H8TV5ZX3P46AG1N	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRKAX85WETTT9R25ERR7BZJ9	XL	opt_01KRKAX85W3H8TV5ZX3P46AG1N	\N	2026-05-14 19:00:39.165+05:30	2026-05-14 19:00:39.165+05:30	\N
optval_01KRQH1R332ZK3SAY54JE5QS2Z	Default option value	opt_01KRQH1R34XVNDR0ZB3DDS745P	\N	2026-05-16 10:04:55.721+05:30	2026-05-16 10:04:55.721+05:30	\N
optval_01KRRHVFHMS2CFS66KFF42YE3G	Default option value	opt_01KRRHVFHMEFABF9XF76CVX23W	\N	2026-05-16 19:38:13.366+05:30	2026-05-16 19:38:13.366+05:30	\N
\.


--
-- Data for Name: product_sales_channel; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_sales_channel (product_id, sales_channel_id, id, created_at, updated_at, deleted_at) FROM stdin;
prod_01KRKAX85SW40G1WEE2Z9MDAEB	sc_01KRKAX80VSSFAHXGWHE3PJX51	prodsc_01KRKAX86NKA1Z132GF133CFSM	2026-05-14 19:00:39.18973+05:30	2026-05-14 19:00:39.18973+05:30	\N
prod_01KRKAX85SSZ7EZKG0TPF5MHR8	sc_01KRKAX80VSSFAHXGWHE3PJX51	prodsc_01KRKAX86PZ55F2KHJP8R2DN4T	2026-05-14 19:00:39.18973+05:30	2026-05-14 19:00:39.18973+05:30	\N
prod_01KRKAX85SAJS7C9BVGSQ01501	sc_01KRKAX80VSSFAHXGWHE3PJX51	prodsc_01KRKAX86PEWF2QM8RZJEXBG6H	2026-05-14 19:00:39.18973+05:30	2026-05-14 19:00:39.18973+05:30	\N
prod_01KRKAX85S1C8DAVTQKJ8W5XN4	sc_01KRKAX80VSSFAHXGWHE3PJX51	prodsc_01KRKAX86P99HDVAE5DZ9PDPP1	2026-05-14 19:00:39.18973+05:30	2026-05-14 19:00:39.18973+05:30	\N
prod_01KRQH1R306RGYAFZFEE3W6KCH	sc_01KRKAX80VSSFAHXGWHE3PJX51	prodsc_01KRQH1R4WGATTZ9G7115HFXE1	2026-05-16 10:04:55.771836+05:30	2026-05-16 10:04:55.771836+05:30	\N
prod_01KRRHVFHKZNFNS6D1DW50VH43	sc_01KRKAX80VSSFAHXGWHE3PJX51	prodsc_01KRRHVFJ901BWC9RR4BYR1YRE	2026-05-16 19:38:13.384721+05:30	2026-05-16 19:38:13.384721+05:30	\N
\.


--
-- Data for Name: product_shipping_profile; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_shipping_profile (product_id, shipping_profile_id, id, created_at, updated_at, deleted_at) FROM stdin;
prod_01KRKAX85SW40G1WEE2Z9MDAEB	sp_01KRKAX8064JAAAYG8QHC83G6W	prodsp_01KRKAX86YPTDB78D3YEV01ACA	2026-05-14 19:00:39.198276+05:30	2026-05-14 19:00:39.198276+05:30	\N
prod_01KRKAX85SSZ7EZKG0TPF5MHR8	sp_01KRKAX8064JAAAYG8QHC83G6W	prodsp_01KRKAX86Y0ZDC1RVZ6JW701Q6	2026-05-14 19:00:39.198276+05:30	2026-05-14 19:00:39.198276+05:30	\N
prod_01KRKAX85SAJS7C9BVGSQ01501	sp_01KRKAX8064JAAAYG8QHC83G6W	prodsp_01KRKAX86Y4FARAEWYWRK4XE7S	2026-05-14 19:00:39.198276+05:30	2026-05-14 19:00:39.198276+05:30	\N
prod_01KRKAX85S1C8DAVTQKJ8W5XN4	sp_01KRKAX8064JAAAYG8QHC83G6W	prodsp_01KRKAX86YKNZWW3PGBGX5BVQK	2026-05-14 19:00:39.198276+05:30	2026-05-14 19:00:39.198276+05:30	\N
prod_01KRQH1R306RGYAFZFEE3W6KCH	sp_01KRKAX8064JAAAYG8QHC83G6W	prodsp_01KRQH1R5A5Q9V2A2V9VCMG5RJ	2026-05-16 10:04:55.786577+05:30	2026-05-16 10:04:55.786577+05:30	\N
prod_01KRRHVFHKZNFNS6D1DW50VH43	sp_01KRKAX8064JAAAYG8QHC83G6W	prodsp_01KRRHVFJKEMPZ1B99F9XDKZ2B	2026-05-16 19:38:13.394902+05:30	2026-05-16 19:38:13.394902+05:30	\N
\.


--
-- Data for Name: product_tag; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_tag (id, value, metadata, created_at, updated_at, deleted_at, external_id) FROM stdin;
\.


--
-- Data for Name: product_tags; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_tags (product_id, product_tag_id) FROM stdin;
\.


--
-- Data for Name: product_type; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_type (id, value, metadata, created_at, updated_at, deleted_at, external_id) FROM stdin;
\.


--
-- Data for Name: product_variant; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_variant (id, title, sku, barcode, ean, upc, allow_backorder, manage_inventory, hs_code, origin_country, mid_code, material, weight, length, height, width, metadata, variant_rank, product_id, created_at, updated_at, deleted_at, thumbnail) FROM stdin;
variant_01KRKAX87DF20H9NG1RQ8M3E21	S / Black	SHIRT-S-BLACK	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.214+05:30	2026-05-14 19:00:39.214+05:30	\N	\N
variant_01KRKAX87DG717J928RY8059HJ	S / White	SHIRT-S-WHITE	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87DZ41CFRNQER9QH7E7	M / Black	SHIRT-M-BLACK	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87DQ96VR8DNDVZS512M	M / White	SHIRT-M-WHITE	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87D771CKZ4VCV4T3X7E	L / Black	SHIRT-L-BLACK	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87DTGTAJT51QGJZZN4X	L / White	SHIRT-L-WHITE	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87DBKS18M3F5MM7Q6KM	XL / Black	SHIRT-XL-BLACK	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87ECSS43MM7FKJ133W8	XL / White	SHIRT-XL-WHITE	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SW40G1WEE2Z9MDAEB	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87E9HYCFRMT76239MFR	S	SWEATSHIRT-S	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SSZ7EZKG0TPF5MHR8	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EVP89K9B3RNPPZM47	M	SWEATSHIRT-M	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SSZ7EZKG0TPF5MHR8	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EMJKVDG8P4Y3PC6P1	L	SWEATSHIRT-L	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SSZ7EZKG0TPF5MHR8	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EH982YP17F264ZVGP	XL	SWEATSHIRT-XL	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SSZ7EZKG0TPF5MHR8	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87E1Y1SQT8EDPQ88JP5	S	SWEATPANTS-S	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SAJS7C9BVGSQ01501	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EFW58DG3WF66N17QD	M	SWEATPANTS-M	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SAJS7C9BVGSQ01501	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EY3VZ4WAJZQBJYKX8	L	SWEATPANTS-L	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SAJS7C9BVGSQ01501	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87E7A3MAEY1RF6Z64MD	XL	SWEATPANTS-XL	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85SAJS7C9BVGSQ01501	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87E1B87QYMX0YHM2QE1	S	SHORTS-S	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EQYR8AC973EZPEW7S	M	SHORTS-M	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87E339PKKJZY7Z520GT	L	SHORTS-L	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRKAX87EG0VMGHDMDEJ2V51P	XL	SHORTS-XL	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRKAX85S1C8DAVTQKJ8W5XN4	2026-05-14 19:00:39.215+05:30	2026-05-14 19:00:39.215+05:30	\N	\N
variant_01KRQH1R5S3398ABKBQKMVT6EX	Default variant	\N	\N	\N	\N	f	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRQH1R306RGYAFZFEE3W6KCH	2026-05-16 10:04:55.802+05:30	2026-05-16 10:04:55.802+05:30	\N	\N
variant_01KRRHVFJXJS8T70KSZB4MM7C7	Default variant	\N	\N	\N	\N	f	f	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	prod_01KRRHVFHKZNFNS6D1DW50VH43	2026-05-16 19:38:13.406+05:30	2026-05-16 19:38:13.406+05:30	\N	\N
\.


--
-- Data for Name: product_variant_inventory_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_variant_inventory_item (variant_id, inventory_item_id, id, required_quantity, created_at, updated_at, deleted_at) FROM stdin;
variant_01KRKAX87DF20H9NG1RQ8M3E21	iitem_01KRKAX885RADK48W19TJ6MVXA	pvitem_01KRKAX88GJBT9HFRPYD58EX6T	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87DG717J928RY8059HJ	iitem_01KRKAX885D3WY68N1HPCFYSMD	pvitem_01KRKAX88G2Y5KB7XXP8VFTYZF	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87DZ41CFRNQER9QH7E7	iitem_01KRKAX8856XYYK6DAJHTASWRZ	pvitem_01KRKAX88GZW9YGG7RASPYQSNP	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87DQ96VR8DNDVZS512M	iitem_01KRKAX885JDSHRW9VH96JFT6Q	pvitem_01KRKAX88G2A6K4V41ATTE9P72	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87D771CKZ4VCV4T3X7E	iitem_01KRKAX885KT3MNRGRR5F5A2R7	pvitem_01KRKAX88G3KPXZ61WDVP7XMJC	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87DTGTAJT51QGJZZN4X	iitem_01KRKAX8857MFNCFVYZCY3FCG6	pvitem_01KRKAX88GTD6ZPYSD0SHR1NMQ	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87DBKS18M3F5MM7Q6KM	iitem_01KRKAX88598SNDKGAQJAJHM7T	pvitem_01KRKAX88G8ZWFPXDJMAN84TRZ	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87ECSS43MM7FKJ133W8	iitem_01KRKAX88523800H8F7HN39HWS	pvitem_01KRKAX88G8EP9XT97R5TWBNBE	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87E9HYCFRMT76239MFR	iitem_01KRKAX885661YXBCB2KXW7SCF	pvitem_01KRKAX88GMJQKMGVDYR8F2E6Q	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EVP89K9B3RNPPZM47	iitem_01KRKAX8851Z62F9TY9X1HE5MT	pvitem_01KRKAX88GNEVM0AQ5FK9P7T0A	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EMJKVDG8P4Y3PC6P1	iitem_01KRKAX8859KTA9BEFCW3KS6WS	pvitem_01KRKAX88GA996M3NSB6C3PR0Q	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EH982YP17F264ZVGP	iitem_01KRKAX885RNAJY1HAB357DHV9	pvitem_01KRKAX88G0TDH2GAPZBBW7X36	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87E1Y1SQT8EDPQ88JP5	iitem_01KRKAX885DW7F6GTECYFDDB3W	pvitem_01KRKAX88GSXT8CF5CCJ1Q8CZ8	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EFW58DG3WF66N17QD	iitem_01KRKAX8854KTE6G6NCKETYNF0	pvitem_01KRKAX88G0P9T0M2G52VR0NQ4	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EY3VZ4WAJZQBJYKX8	iitem_01KRKAX8859CXB95BT0ACSY594	pvitem_01KRKAX88HENPPQDJ02KQ6QTG6	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87E7A3MAEY1RF6Z64MD	iitem_01KRKAX885XD6X93XRXC2J0CTA	pvitem_01KRKAX88HSR98977TQZ4SX41D	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87E1B87QYMX0YHM2QE1	iitem_01KRKAX885VZXVDDDG5RD4JMEF	pvitem_01KRKAX88HS9PAGXB17649C3S0	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EQYR8AC973EZPEW7S	iitem_01KRKAX885PGHTJYWXF4JB0XXF	pvitem_01KRKAX88H390XMQPYM1D7YXXR	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87E339PKKJZY7Z520GT	iitem_01KRKAX885QHYVZ6TW1GC35NZM	pvitem_01KRKAX88H1F09H1Q3T7Z9Z7H8	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRKAX87EG0VMGHDMDEJ2V51P	iitem_01KRKAX885MJZHGVQGVCQNJZ9K	pvitem_01KRKAX88H7C1RYRA2B0NZBZRZ	1	2026-05-14 19:00:39.248129+05:30	2026-05-14 19:00:39.248129+05:30	\N
variant_01KRQH1R5S3398ABKBQKMVT6EX	iitem_01KRQH1R63R2NDYJM4DNQ8FE44	pvitem_01KRQH1R6E4XWP82W9C1YKYQDF	1	2026-05-16 10:04:55.822576+05:30	2026-05-16 10:04:55.822576+05:30	\N
\.


--
-- Data for Name: product_variant_option; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_variant_option (variant_id, option_value_id) FROM stdin;
variant_01KRKAX87DF20H9NG1RQ8M3E21	optval_01KRKAX85T9GZ2M9HT7MDKPJ1M
variant_01KRKAX87DF20H9NG1RQ8M3E21	optval_01KRKAX85T80S8DKHV8FHAS69P
variant_01KRKAX87DG717J928RY8059HJ	optval_01KRKAX85T9GZ2M9HT7MDKPJ1M
variant_01KRKAX87DG717J928RY8059HJ	optval_01KRKAX85TSPFJ1KY83S0W9SJR
variant_01KRKAX87DZ41CFRNQER9QH7E7	optval_01KRKAX85TN4ZVZWW1PJ6HACCX
variant_01KRKAX87DZ41CFRNQER9QH7E7	optval_01KRKAX85T80S8DKHV8FHAS69P
variant_01KRKAX87DQ96VR8DNDVZS512M	optval_01KRKAX85TN4ZVZWW1PJ6HACCX
variant_01KRKAX87DQ96VR8DNDVZS512M	optval_01KRKAX85TSPFJ1KY83S0W9SJR
variant_01KRKAX87D771CKZ4VCV4T3X7E	optval_01KRKAX85TFK2G7VRZ75E9QP3E
variant_01KRKAX87D771CKZ4VCV4T3X7E	optval_01KRKAX85T80S8DKHV8FHAS69P
variant_01KRKAX87DTGTAJT51QGJZZN4X	optval_01KRKAX85TFK2G7VRZ75E9QP3E
variant_01KRKAX87DTGTAJT51QGJZZN4X	optval_01KRKAX85TSPFJ1KY83S0W9SJR
variant_01KRKAX87DBKS18M3F5MM7Q6KM	optval_01KRKAX85TF4AC94DJ7BGS62MZ
variant_01KRKAX87DBKS18M3F5MM7Q6KM	optval_01KRKAX85T80S8DKHV8FHAS69P
variant_01KRKAX87ECSS43MM7FKJ133W8	optval_01KRKAX85TF4AC94DJ7BGS62MZ
variant_01KRKAX87ECSS43MM7FKJ133W8	optval_01KRKAX85TSPFJ1KY83S0W9SJR
variant_01KRKAX87E9HYCFRMT76239MFR	optval_01KRKAX85VDRBZ33T27HSQ83BQ
variant_01KRKAX87EVP89K9B3RNPPZM47	optval_01KRKAX85V6T5ARVHT0RJJQX7Z
variant_01KRKAX87EMJKVDG8P4Y3PC6P1	optval_01KRKAX85V4ZZB5VCFQE8DBQAX
variant_01KRKAX87EH982YP17F264ZVGP	optval_01KRKAX85V4XH8T08MEXZX6QY5
variant_01KRKAX87E1Y1SQT8EDPQ88JP5	optval_01KRKAX85VB78YQY67VB5QSW3B
variant_01KRKAX87EFW58DG3WF66N17QD	optval_01KRKAX85V7Q5SZH27HHYF1MQQ
variant_01KRKAX87EY3VZ4WAJZQBJYKX8	optval_01KRKAX85V34H70GSFSCEA0KJM
variant_01KRKAX87E7A3MAEY1RF6Z64MD	optval_01KRKAX85VNZW5Q9JMYT3XGS4C
variant_01KRKAX87E1B87QYMX0YHM2QE1	optval_01KRKAX85WNB0H8BFXJQ84WCZT
variant_01KRKAX87EQYR8AC973EZPEW7S	optval_01KRKAX85WACZ8GF50CE91V3BX
variant_01KRKAX87E339PKKJZY7Z520GT	optval_01KRKAX85WZYPCDT1WHA14ST20
variant_01KRKAX87EG0VMGHDMDEJ2V51P	optval_01KRKAX85WETTT9R25ERR7BZJ9
variant_01KRQH1R5S3398ABKBQKMVT6EX	optval_01KRQH1R332ZK3SAY54JE5QS2Z
variant_01KRRHVFJXJS8T70KSZB4MM7C7	optval_01KRRHVFHMS2CFS66KFF42YE3G
\.


--
-- Data for Name: product_variant_price_set; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_variant_price_set (variant_id, price_set_id, id, created_at, updated_at, deleted_at) FROM stdin;
variant_01KRKAX87DF20H9NG1RQ8M3E21	pset_01KRKAX88SPBPGR14EZQDW4C4D	pvps_01KRKAX89JV68Y1ZPQB6K3RPFP	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87DG717J928RY8059HJ	pset_01KRKAX88SGD1WCKJV2YRV9GP1	pvps_01KRKAX89JGX2946M7J20X9Z61	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87DZ41CFRNQER9QH7E7	pset_01KRKAX88SKK5QDPNCQ650N1G9	pvps_01KRKAX89JMWJVX4YWCM09FNFR	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87DQ96VR8DNDVZS512M	pset_01KRKAX88SC2V579VJN8ZA384Z	pvps_01KRKAX89JCCE8QCW9BFRSJ5BR	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87D771CKZ4VCV4T3X7E	pset_01KRKAX88SFJP18RFSVKEQVN92	pvps_01KRKAX89JWHTECD4DM6R27TV9	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87DTGTAJT51QGJZZN4X	pset_01KRKAX88SY5RY1Z35MH06EETZ	pvps_01KRKAX89J54JQ2G4MZB7TNAT1	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87DBKS18M3F5MM7Q6KM	pset_01KRKAX88SN1V0FZCHVZSY3JVT	pvps_01KRKAX89JQVEQYDZASWHATYC3	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87ECSS43MM7FKJ133W8	pset_01KRKAX88SDPRTVYHDEC36YMS5	pvps_01KRKAX89J0V1HX8SZD3T3H0RA	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87E9HYCFRMT76239MFR	pset_01KRKAX88SMW9Q8JY86J6C4F2N	pvps_01KRKAX89J78JA0MX2BK3EZEYD	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EVP89K9B3RNPPZM47	pset_01KRKAX88TYQZHBW0ES3G5EG46	pvps_01KRKAX89JZN2XM04BEW47871G	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EMJKVDG8P4Y3PC6P1	pset_01KRKAX88T80ZEZNANMCHNF66V	pvps_01KRKAX89JPF4E7DM801PY4BFD	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EH982YP17F264ZVGP	pset_01KRKAX88TDXWSTRT1W1DP7MCY	pvps_01KRKAX89JEXHV8682EKF8KZJJ	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87E1Y1SQT8EDPQ88JP5	pset_01KRKAX88TB6A8FH26XP3FWT65	pvps_01KRKAX89KGZY8E8EFXGNWZETV	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EFW58DG3WF66N17QD	pset_01KRKAX88TW1B4HWC592KKS98T	pvps_01KRKAX89KCFJYH6P8YGWZ5618	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EY3VZ4WAJZQBJYKX8	pset_01KRKAX88TFP6964WQMRQMZRXT	pvps_01KRKAX89KHZTE830DGXBC8E0P	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87E7A3MAEY1RF6Z64MD	pset_01KRKAX88TNWE14GBADK65B29N	pvps_01KRKAX89K74EEZQC8GTGB1ZF9	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87E1B87QYMX0YHM2QE1	pset_01KRKAX88T2ZWE0W7BKYCT0WXQ	pvps_01KRKAX89KKXK44QC5FMWSM812	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EQYR8AC973EZPEW7S	pset_01KRKAX88TBBQ6Z42KJJ1SGN66	pvps_01KRKAX89K9ZN63ZX3BJNMF4HR	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87E339PKKJZY7Z520GT	pset_01KRKAX88TAHWRXRJVFEQDW8MY	pvps_01KRKAX89KNZBCKTMGKDDP9B80	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRKAX87EG0VMGHDMDEJ2V51P	pset_01KRKAX88VCJ4W4F1H6BQNEVKS	pvps_01KRKAX89K22PQZJB16QCDZ83D	2026-05-14 19:00:39.282294+05:30	2026-05-14 19:00:39.282294+05:30	\N
variant_01KRQH1R5S3398ABKBQKMVT6EX	pset_01KRQH1R6QZYK8044QRH1H9MJB	pvps_01KRQH1R7KMTXQGPVWMDW5AHCA	2026-05-16 10:04:55.858858+05:30	2026-05-16 10:04:55.858858+05:30	\N
variant_01KRRHVFJXJS8T70KSZB4MM7C7	pset_01KRRHVFKKND1ACV5TEWJV786T	pvps_01KRRHVFM3E4R33GDCMN84N71T	2026-05-16 19:38:13.44347+05:30	2026-05-16 19:38:13.44347+05:30	\N
\.


--
-- Data for Name: product_variant_product_image; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.product_variant_product_image (id, variant_id, image_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion (id, code, campaign_id, is_automatic, type, created_at, updated_at, deleted_at, status, is_tax_inclusive, "limit", used, metadata) FROM stdin;
\.


--
-- Data for Name: promotion_application_method; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_application_method (id, value, raw_value, max_quantity, apply_to_quantity, buy_rules_min_quantity, type, target_type, allocation, promotion_id, created_at, updated_at, deleted_at, currency_code) FROM stdin;
\.


--
-- Data for Name: promotion_campaign; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_campaign (id, name, description, campaign_identifier, starts_at, ends_at, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: promotion_campaign_budget; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_campaign_budget (id, type, campaign_id, "limit", raw_limit, used, raw_used, created_at, updated_at, deleted_at, currency_code, attribute) FROM stdin;
\.


--
-- Data for Name: promotion_campaign_budget_usage; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_campaign_budget_usage (id, attribute_value, used, budget_id, raw_used, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: promotion_promotion_rule; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_promotion_rule (promotion_id, promotion_rule_id) FROM stdin;
\.


--
-- Data for Name: promotion_rule; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_rule (id, description, attribute, operator, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: promotion_rule_value; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.promotion_rule_value (id, promotion_rule_id, value, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: property_label; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.property_label (id, entity, property, label, description, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: provider_identity; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.provider_identity (id, entity_id, provider, auth_identity_id, user_metadata, provider_metadata, created_at, updated_at, deleted_at) FROM stdin;
01KRKDN2W6RGSYYF5JY45D5WDP	rizwan.beg2004@gmail.com	emailpass	authid_01KRKDN2W7KMMWASX37EFCV8MV	\N	{"password": "c2NyeXB0AA8AAAAIAAAAAQFrRcxX88/FVq8umDyFROrrGA8VnvM0TT026maH8Hv3IPXD+SRo5dNaAgJf7LjC/YjJZBkF8bPEWeRZCl5xzXwBj6ZOwcOjP9EHMsqj2cd/"}	2026-05-14 19:48:37.319+05:30	2026-05-14 19:48:37.319+05:30	\N
01KRQGM5HSTXVJ218JXXFTK8QN	admin@safina.com	emailpass	authid_01KRQGM5HT4ZPHD8GHKKVF5J44	\N	{"password": "c2NyeXB0AA8AAAAIAAAAAeIVttKd/CFjH8HA5JLg50xxr7ujvZwcHe0c4Z465In0g2WfSGVHqgiip92+uENWvOpaPwvt2fWqLZGxyhNEJyVvRrG+kGYNKnBmd18yF4b1"}	2026-05-16 09:57:30.746+05:30	2026-05-16 09:57:30.746+05:30	\N
01KRR2M3BP74AJ6194CB5DE41Q	probe2@test.com	emailpass	authid_01KRR2M3BSF6NPPZK224T21X00	\N	{"password": "c2NyeXB0AA8AAAAIAAAAAXF9EH0/2U71JDTgv7VgtGcemFEvZC/VZylOGTAkCD+u8FgjeoFgmJfJ1P8YRn/iDZpYr67EWmBhMZ2PD+3Etp/XE0LprUx+u3o7Utckhilx"}	2026-05-16 15:12:02.873+05:30	2026-05-16 15:12:02.873+05:30	\N
01KRR2MDWSC1AV0YHXANA79FHX	fullflow@test.com	emailpass	authid_01KRR2MDWSGGDCQCDM1876ZE85	\N	{"password": "c2NyeXB0AA8AAAAIAAAAAWZhzc1gGDe/EmQYVTyQIZ1vZSl7vPok2oP8ojrFzC0jclQj3piaJ/xFYtO2EL9a0/TEGnCKCsvHLQmFPd1MLNDJVlj4hNIDMHWjZvt+fMMV"}	2026-05-16 15:12:13.657+05:30	2026-05-16 15:12:13.657+05:30	\N
01KRR2XS99Q4JH984XEPCRN7ND	newuser1778924840@test.com	emailpass	authid_01KRR2XS998745FYNYWP63PT9P	\N	{"password": "c2NyeXB0AA8AAAAIAAAAARQGIxp0kbotTFhyoZ2RLpDtJX7aPoBUv8ByioNWDbj0mQtnomQPaac3AVgvxYyzoIa1ku2LgPNQZeMueNB6N0IXaKvGZ38u7hexwyg77GA5"}	2026-05-16 15:17:20.235+05:30	2026-05-16 15:17:20.235+05:30	\N
01KRR32R5DMSKJPY3CS5353ZET	rehan.beg2000@gmail.com	emailpass	authid_01KRR32R5EJ9TNE33XS3TZBZP7	\N	{"password": "c2NyeXB0AA8AAAAIAAAAAQQBUnF004fMfYINJXpYftiphBVZy8hpZLPgAE5PN7C925rLENdbOUfRwahqkznxtEmusMaFW4hek6jwjXLX9buwpAMM+9Sbk33T5jizLnwm"}	2026-05-16 15:20:02.926+05:30	2026-05-16 15:20:02.926+05:30	\N
01KRS3D97A6JR6EMG0EXRK2QGC	shariq.beg2011@gmail.com	emailpass	authid_01KRS3D97BTX5D2WT0YA1GP37Z	\N	{"password": "c2NyeXB0AA8AAAAIAAAAAdGqOXLf90y4Ypail0XGZ65l+gq6krDn/YGKgSKEBq7XOLIjHh8ryxaMVgG+RvcFf08fp/rtXXrkpkAOLpuZTeQ4MuDfrLd6v9esDyhgM0Tx"}	2026-05-17 00:45:02.508+05:30	2026-05-17 00:45:02.508+05:30	\N
01KV8SQZ7VH909EKBSWDMPMBKE	rehan.beg2004@gmail.com	emailpass	authid_01KV8SQZ7V4TQRS7Q6FRCK8W2P	\N	{"password": "c2NyeXB0AA8AAAAIAAAAATYT6xLpu+pNGVZ575fvmGZwTru5GnZNkaRPPiNRGjgKbE4PdIrxEyGt+ff7upIIFbZYjMyWGYqTzvMw1acJsUihUnnhZalFt6nHRXcwEMlR"}	2026-06-16 23:35:21.532+05:30	2026-06-16 23:35:21.532+05:30	\N
\.


--
-- Data for Name: publishable_api_key_sales_channel; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.publishable_api_key_sales_channel (publishable_key_id, sales_channel_id, id, created_at, updated_at, deleted_at) FROM stdin;
apk_01KRKAX8101BTF6FFC0QWAHNXS	sc_01KRKAX80VSSFAHXGWHE3PJX51	pksc_01KRKAX818K71A62GKZ60FE09H	2026-05-14 19:00:39.015895+05:30	2026-05-14 19:00:39.015895+05:30	\N
apk_01KRQHQVZE778J4KAMW4A34B7W	sc_01KRKAX80VSSFAHXGWHE3PJX51	pksc_01KRQJ5FNJZGG5RCMN3SDWT904	2026-05-16 10:24:26.737312+05:30	2026-05-16 10:24:26.737312+05:30	\N
\.


--
-- Data for Name: refund; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.refund (id, amount, raw_amount, payment_id, created_at, updated_at, deleted_at, created_by, metadata, refund_reason_id, note) FROM stdin;
\.


--
-- Data for Name: refund_reason; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.refund_reason (id, label, description, metadata, created_at, updated_at, deleted_at, code) FROM stdin;
refr_01KRKAX5MF5V74AR4XJQKE9W0X	Shipping Issue	Refund due to lost, delayed, or misdelivered shipment	\N	2026-05-14 19:00:36.480229+05:30	2026-05-14 19:00:36.480229+05:30	\N	shipping_issue
refr_01KRKAX5MFGK6B9MVKJAA848TG	Customer Care Adjustment	Refund given as goodwill or compensation for inconvenience	\N	2026-05-14 19:00:36.480229+05:30	2026-05-14 19:00:36.480229+05:30	\N	customer_care_adjustment
refr_01KRKAX5MFNKYVNX9ZSYDWWPA5	Pricing Error	Refund to correct an overcharge, missing discount, or incorrect price	\N	2026-05-14 19:00:36.480229+05:30	2026-05-14 19:00:36.480229+05:30	\N	pricing_error
\.


--
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.region (id, name, currency_code, metadata, created_at, updated_at, deleted_at, automatic_taxes) FROM stdin;
reg_01KRKAX81XA5QQ02YB4BG7MC90	Europe	eur	\N	2026-05-14 19:00:39.041+05:30	2026-05-14 19:00:39.041+05:30	\N	t
reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	India	inr	\N	2026-05-16 10:51:36.776+05:30	2026-05-16 18:42:58.346+05:30	\N	t
\.


--
-- Data for Name: region_country; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.region_country (iso_2, iso_3, num_code, name, display_name, region_id, metadata, created_at, updated_at, deleted_at) FROM stdin;
af	afg	004	AFGHANISTAN	Afghanistan	\N	\N	2026-05-14 19:00:38.364+05:30	2026-05-14 19:00:38.364+05:30	\N
al	alb	008	ALBANIA	Albania	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
dz	dza	012	ALGERIA	Algeria	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
as	asm	016	AMERICAN SAMOA	American Samoa	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ad	and	020	ANDORRA	Andorra	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ao	ago	024	ANGOLA	Angola	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ai	aia	660	ANGUILLA	Anguilla	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
aq	ata	010	ANTARCTICA	Antarctica	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ag	atg	028	ANTIGUA AND BARBUDA	Antigua and Barbuda	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ar	arg	032	ARGENTINA	Argentina	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
am	arm	051	ARMENIA	Armenia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
aw	abw	533	ARUBA	Aruba	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
au	aus	036	AUSTRALIA	Australia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
at	aut	040	AUSTRIA	Austria	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
az	aze	031	AZERBAIJAN	Azerbaijan	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bs	bhs	044	BAHAMAS	Bahamas	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bh	bhr	048	BAHRAIN	Bahrain	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bd	bgd	050	BANGLADESH	Bangladesh	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bb	brb	052	BARBADOS	Barbados	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
by	blr	112	BELARUS	Belarus	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
be	bel	056	BELGIUM	Belgium	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bz	blz	084	BELIZE	Belize	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bj	ben	204	BENIN	Benin	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bm	bmu	060	BERMUDA	Bermuda	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bt	btn	064	BHUTAN	Bhutan	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bo	bol	068	BOLIVIA	Bolivia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bq	bes	535	BONAIRE, SINT EUSTATIUS AND SABA	Bonaire, Sint Eustatius and Saba	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ba	bih	070	BOSNIA AND HERZEGOVINA	Bosnia and Herzegovina	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bw	bwa	072	BOTSWANA	Botswana	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bv	bvd	074	BOUVET ISLAND	Bouvet Island	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
br	bra	076	BRAZIL	Brazil	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
io	iot	086	BRITISH INDIAN OCEAN TERRITORY	British Indian Ocean Territory	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bn	brn	096	BRUNEI DARUSSALAM	Brunei Darussalam	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bg	bgr	100	BULGARIA	Bulgaria	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bf	bfa	854	BURKINA FASO	Burkina Faso	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
bi	bdi	108	BURUNDI	Burundi	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
kh	khm	116	CAMBODIA	Cambodia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cm	cmr	120	CAMEROON	Cameroon	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ca	can	124	CANADA	Canada	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cv	cpv	132	CAPE VERDE	Cape Verde	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ky	cym	136	CAYMAN ISLANDS	Cayman Islands	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cf	caf	140	CENTRAL AFRICAN REPUBLIC	Central African Republic	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
td	tcd	148	CHAD	Chad	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cl	chl	152	CHILE	Chile	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cn	chn	156	CHINA	China	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cx	cxr	162	CHRISTMAS ISLAND	Christmas Island	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cc	cck	166	COCOS (KEELING) ISLANDS	Cocos (Keeling) Islands	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
co	col	170	COLOMBIA	Colombia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
km	com	174	COMOROS	Comoros	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cg	cog	178	CONGO	Congo	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cd	cod	180	CONGO, THE DEMOCRATIC REPUBLIC OF THE	Congo, the Democratic Republic of the	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ck	cok	184	COOK ISLANDS	Cook Islands	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cr	cri	188	COSTA RICA	Costa Rica	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ci	civ	384	COTE D'IVOIRE	Cote D'Ivoire	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
hr	hrv	191	CROATIA	Croatia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cu	cub	192	CUBA	Cuba	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cw	cuw	531	CURAÇAO	Curaçao	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cy	cyp	196	CYPRUS	Cyprus	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
cz	cze	203	CZECH REPUBLIC	Czech Republic	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
dj	dji	262	DJIBOUTI	Djibouti	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
dm	dma	212	DOMINICA	Dominica	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
do	dom	214	DOMINICAN REPUBLIC	Dominican Republic	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ec	ecu	218	ECUADOR	Ecuador	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
eg	egy	818	EGYPT	Egypt	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
sv	slv	222	EL SALVADOR	El Salvador	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gq	gnq	226	EQUATORIAL GUINEA	Equatorial Guinea	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
er	eri	232	ERITREA	Eritrea	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ee	est	233	ESTONIA	Estonia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
et	eth	231	ETHIOPIA	Ethiopia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
fk	flk	238	FALKLAND ISLANDS (MALVINAS)	Falkland Islands (Malvinas)	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
fo	fro	234	FAROE ISLANDS	Faroe Islands	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
fj	fji	242	FIJI	Fiji	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
fi	fin	246	FINLAND	Finland	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gf	guf	254	FRENCH GUIANA	French Guiana	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
pf	pyf	258	FRENCH POLYNESIA	French Polynesia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
tf	atf	260	FRENCH SOUTHERN TERRITORIES	French Southern Territories	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ga	gab	266	GABON	Gabon	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gm	gmb	270	GAMBIA	Gambia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ge	geo	268	GEORGIA	Georgia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gh	gha	288	GHANA	Ghana	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gi	gib	292	GIBRALTAR	Gibraltar	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gr	grc	300	GREECE	Greece	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gl	grl	304	GREENLAND	Greenland	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gd	grd	308	GRENADA	Grenada	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gp	glp	312	GUADELOUPE	Guadeloupe	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gu	gum	316	GUAM	Guam	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gt	gtm	320	GUATEMALA	Guatemala	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gg	ggy	831	GUERNSEY	Guernsey	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gn	gin	324	GUINEA	Guinea	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gw	gnb	624	GUINEA-BISSAU	Guinea-Bissau	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
gy	guy	328	GUYANA	Guyana	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ht	hti	332	HAITI	Haiti	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
hm	hmd	334	HEARD ISLAND AND MCDONALD ISLANDS	Heard Island And Mcdonald Islands	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
va	vat	336	HOLY SEE (VATICAN CITY STATE)	Holy See (Vatican City State)	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
hn	hnd	340	HONDURAS	Honduras	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
hk	hkg	344	HONG KONG	Hong Kong	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
hu	hun	348	HUNGARY	Hungary	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
is	isl	352	ICELAND	Iceland	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
id	idn	360	INDONESIA	Indonesia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ir	irn	364	IRAN, ISLAMIC REPUBLIC OF	Iran, Islamic Republic of	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
iq	irq	368	IRAQ	Iraq	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ie	irl	372	IRELAND	Ireland	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
im	imn	833	ISLE OF MAN	Isle Of Man	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
il	isr	376	ISRAEL	Israel	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
jm	jam	388	JAMAICA	Jamaica	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
jp	jpn	392	JAPAN	Japan	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
je	jey	832	JERSEY	Jersey	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
jo	jor	400	JORDAN	Jordan	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
kz	kaz	398	KAZAKHSTAN	Kazakhstan	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ke	ken	404	KENYA	Kenya	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ki	kir	296	KIRIBATI	Kiribati	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
kp	prk	408	KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF	Korea, Democratic People's Republic of	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
kr	kor	410	KOREA, REPUBLIC OF	Korea, Republic of	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
xk	xkx	900	KOSOVO	Kosovo	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
kw	kwt	414	KUWAIT	Kuwait	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
kg	kgz	417	KYRGYZSTAN	Kyrgyzstan	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
la	lao	418	LAO PEOPLE'S DEMOCRATIC REPUBLIC	Lao People's Democratic Republic	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
lv	lva	428	LATVIA	Latvia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
lb	lbn	422	LEBANON	Lebanon	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ls	lso	426	LESOTHO	Lesotho	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
lr	lbr	430	LIBERIA	Liberia	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
ly	lby	434	LIBYA	Libya	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
li	lie	438	LIECHTENSTEIN	Liechtenstein	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
lt	ltu	440	LITHUANIA	Lithuania	\N	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:38.365+05:30	\N
lu	lux	442	LUXEMBOURG	Luxembourg	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mo	mac	446	MACAO	Macao	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mg	mdg	450	MADAGASCAR	Madagascar	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mw	mwi	454	MALAWI	Malawi	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
my	mys	458	MALAYSIA	Malaysia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mv	mdv	462	MALDIVES	Maldives	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ml	mli	466	MALI	Mali	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mt	mlt	470	MALTA	Malta	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mh	mhl	584	MARSHALL ISLANDS	Marshall Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mq	mtq	474	MARTINIQUE	Martinique	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mr	mrt	478	MAURITANIA	Mauritania	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mu	mus	480	MAURITIUS	Mauritius	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
yt	myt	175	MAYOTTE	Mayotte	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mx	mex	484	MEXICO	Mexico	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
fm	fsm	583	MICRONESIA, FEDERATED STATES OF	Micronesia, Federated States of	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
md	mda	498	MOLDOVA, REPUBLIC OF	Moldova, Republic of	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mc	mco	492	MONACO	Monaco	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mn	mng	496	MONGOLIA	Mongolia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
me	mne	499	MONTENEGRO	Montenegro	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ms	msr	500	MONTSERRAT	Montserrat	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ma	mar	504	MOROCCO	Morocco	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mz	moz	508	MOZAMBIQUE	Mozambique	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mm	mmr	104	MYANMAR	Myanmar	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
na	nam	516	NAMIBIA	Namibia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
nr	nru	520	NAURU	Nauru	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
np	npl	524	NEPAL	Nepal	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
nl	nld	528	NETHERLANDS	Netherlands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
nc	ncl	540	NEW CALEDONIA	New Caledonia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
nz	nzl	554	NEW ZEALAND	New Zealand	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ni	nic	558	NICARAGUA	Nicaragua	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ne	ner	562	NIGER	Niger	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ng	nga	566	NIGERIA	Nigeria	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
nu	niu	570	NIUE	Niue	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
nf	nfk	574	NORFOLK ISLAND	Norfolk Island	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mk	mkd	807	NORTH MACEDONIA	North Macedonia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mp	mnp	580	NORTHERN MARIANA ISLANDS	Northern Mariana Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
no	nor	578	NORWAY	Norway	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
om	omn	512	OMAN	Oman	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pk	pak	586	PAKISTAN	Pakistan	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pw	plw	585	PALAU	Palau	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ps	pse	275	PALESTINIAN TERRITORY, OCCUPIED	Palestinian Territory, Occupied	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pa	pan	591	PANAMA	Panama	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pg	png	598	PAPUA NEW GUINEA	Papua New Guinea	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
py	pry	600	PARAGUAY	Paraguay	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pe	per	604	PERU	Peru	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ph	phl	608	PHILIPPINES	Philippines	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pn	pcn	612	PITCAIRN	Pitcairn	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pl	pol	616	POLAND	Poland	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pt	prt	620	PORTUGAL	Portugal	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pr	pri	630	PUERTO RICO	Puerto Rico	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
qa	qat	634	QATAR	Qatar	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
re	reu	638	REUNION	Reunion	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ro	rom	642	ROMANIA	Romania	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
in	ind	356	INDIA	India	reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	\N	2026-05-14 19:00:38.365+05:30	2026-05-16 10:51:36.776+05:30	\N
ru	rus	643	RUSSIAN FEDERATION	Russian Federation	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
rw	rwa	646	RWANDA	Rwanda	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
bl	blm	652	SAINT BARTHÉLEMY	Saint Barthélemy	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sh	shn	654	SAINT HELENA	Saint Helena	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
kn	kna	659	SAINT KITTS AND NEVIS	Saint Kitts and Nevis	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
lc	lca	662	SAINT LUCIA	Saint Lucia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
mf	maf	663	SAINT MARTIN (FRENCH PART)	Saint Martin (French part)	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
pm	spm	666	SAINT PIERRE AND MIQUELON	Saint Pierre and Miquelon	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
vc	vct	670	SAINT VINCENT AND THE GRENADINES	Saint Vincent and the Grenadines	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ws	wsm	882	SAMOA	Samoa	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sm	smr	674	SAN MARINO	San Marino	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
st	stp	678	SAO TOME AND PRINCIPE	Sao Tome and Principe	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sa	sau	682	SAUDI ARABIA	Saudi Arabia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sn	sen	686	SENEGAL	Senegal	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
rs	srb	688	SERBIA	Serbia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sc	syc	690	SEYCHELLES	Seychelles	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sl	sle	694	SIERRA LEONE	Sierra Leone	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sg	sgp	702	SINGAPORE	Singapore	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sx	sxm	534	SINT MAARTEN	Sint Maarten	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sk	svk	703	SLOVAKIA	Slovakia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
si	svn	705	SLOVENIA	Slovenia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sb	slb	090	SOLOMON ISLANDS	Solomon Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
so	som	706	SOMALIA	Somalia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
za	zaf	710	SOUTH AFRICA	South Africa	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
gs	sgs	239	SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS	South Georgia and the South Sandwich Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ss	ssd	728	SOUTH SUDAN	South Sudan	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
lk	lka	144	SRI LANKA	Sri Lanka	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sd	sdn	729	SUDAN	Sudan	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sr	sur	740	SURINAME	Suriname	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sj	sjm	744	SVALBARD AND JAN MAYEN	Svalbard and Jan Mayen	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sz	swz	748	SWAZILAND	Swaziland	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ch	che	756	SWITZERLAND	Switzerland	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
sy	syr	760	SYRIAN ARAB REPUBLIC	Syrian Arab Republic	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tw	twn	158	TAIWAN, PROVINCE OF CHINA	Taiwan, Province of China	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tj	tjk	762	TAJIKISTAN	Tajikistan	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tz	tza	834	TANZANIA, UNITED REPUBLIC OF	Tanzania, United Republic of	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
th	tha	764	THAILAND	Thailand	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tl	tls	626	TIMOR LESTE	Timor Leste	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tg	tgo	768	TOGO	Togo	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tk	tkl	772	TOKELAU	Tokelau	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
to	ton	776	TONGA	Tonga	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tt	tto	780	TRINIDAD AND TOBAGO	Trinidad and Tobago	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tn	tun	788	TUNISIA	Tunisia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tr	tur	792	TURKEY	Turkey	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tm	tkm	795	TURKMENISTAN	Turkmenistan	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tc	tca	796	TURKS AND CAICOS ISLANDS	Turks and Caicos Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
tv	tuv	798	TUVALU	Tuvalu	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ug	uga	800	UGANDA	Uganda	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ua	ukr	804	UKRAINE	Ukraine	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ae	are	784	UNITED ARAB EMIRATES	United Arab Emirates	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
us	usa	840	UNITED STATES	United States	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
um	umi	581	UNITED STATES MINOR OUTLYING ISLANDS	United States Minor Outlying Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
uy	ury	858	URUGUAY	Uruguay	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
uz	uzb	860	UZBEKISTAN	Uzbekistan	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
vu	vut	548	VANUATU	Vanuatu	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ve	ven	862	VENEZUELA	Venezuela	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
vn	vnm	704	VIET NAM	Viet Nam	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
vg	vgb	092	VIRGIN ISLANDS, BRITISH	Virgin Islands, British	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
vi	vir	850	VIRGIN ISLANDS, U.S.	Virgin Islands, U.S.	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
wf	wlf	876	WALLIS AND FUTUNA	Wallis and Futuna	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
eh	esh	732	WESTERN SAHARA	Western Sahara	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ye	yem	887	YEMEN	Yemen	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
zm	zmb	894	ZAMBIA	Zambia	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
zw	zwe	716	ZIMBABWE	Zimbabwe	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
ax	ala	248	ÅLAND ISLANDS	Åland Islands	\N	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:38.366+05:30	\N
dk	dnk	208	DENMARK	Denmark	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:39.041+05:30	\N
fr	fra	250	FRANCE	France	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:39.041+05:30	\N
de	deu	276	GERMANY	Germany	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:39.041+05:30	\N
it	ita	380	ITALY	Italy	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.365+05:30	2026-05-14 19:00:39.041+05:30	\N
es	esp	724	SPAIN	Spain	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:39.041+05:30	\N
se	swe	752	SWEDEN	Sweden	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:39.041+05:30	\N
gb	gbr	826	UNITED KINGDOM	United Kingdom	reg_01KRKAX81XA5QQ02YB4BG7MC90	\N	2026-05-14 19:00:38.366+05:30	2026-05-14 19:00:39.041+05:30	\N
\.


--
-- Data for Name: region_payment_provider; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.region_payment_provider (region_id, payment_provider_id, id, created_at, updated_at, deleted_at) FROM stdin;
reg_01KRKAX81XA5QQ02YB4BG7MC90	pp_system_default	regpp_01KRKAX82A4SE4VK8FEZW911W2	2026-05-14 19:00:39.05069+05:30	2026-05-14 19:00:39.05069+05:30	\N
reg_01KRQKQ7G3BFCGV3NT7HT91ZJA	pp_system_default	regpp_01KRQKQ7GPN4BH8RV7RC8TW456	2026-05-16 10:51:36.789848+05:30	2026-05-16 10:51:36.789848+05:30	\N
\.


--
-- Data for Name: reservation_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.reservation_item (id, created_at, updated_at, deleted_at, line_item_id, location_id, quantity, external_id, description, created_by, metadata, inventory_item_id, allow_backorder, raw_quantity) FROM stdin;
resitem_01KRRDTG2052M02VJCJBYJ427P	2026-05-16 18:27:46.82+05:30	2026-05-16 18:28:20.994+05:30	2026-05-16 18:28:20.988+05:30	ordli_01KRRD3TB1Y53FWE647W70XGAE	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	11	\N	\N	\N	\N	iitem_01KRKAX885DW7F6GTECYFDDB3W	f	{"value": "11", "precision": 20}
\.


--
-- Data for Name: return; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.return (id, order_id, claim_id, exchange_id, order_version, display_id, status, no_notification, refund_amount, raw_refund_amount, metadata, created_at, updated_at, deleted_at, received_at, canceled_at, location_id, requested_at, created_by) FROM stdin;
\.


--
-- Data for Name: return_fulfillment; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.return_fulfillment (return_id, fulfillment_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: return_item; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.return_item (id, return_id, reason_id, item_id, quantity, raw_quantity, received_quantity, raw_received_quantity, note, metadata, created_at, updated_at, deleted_at, damaged_quantity, raw_damaged_quantity) FROM stdin;
\.


--
-- Data for Name: return_reason; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.return_reason (id, value, label, description, metadata, parent_return_reason_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: sales_channel; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.sales_channel (id, name, description, is_disabled, metadata, created_at, updated_at, deleted_at) FROM stdin;
sc_01KRKAX80VSSFAHXGWHE3PJX51	Default Sales Channel	Created by Medusa	f	\N	2026-05-14 19:00:39.003+05:30	2026-05-14 19:00:39.003+05:30	\N
\.


--
-- Data for Name: sales_channel_stock_location; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.sales_channel_stock_location (sales_channel_id, stock_location_id, id, created_at, updated_at, deleted_at) FROM stdin;
sc_01KRKAX80VSSFAHXGWHE3PJX51	sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	scloc_01KRKAX85A35VAA61M8BBE6ZHX	2026-05-14 19:00:39.146301+05:30	2026-05-14 19:00:39.146301+05:30	\N
\.


--
-- Data for Name: script_migrations; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.script_migrations (id, script_name, created_at, finished_at) FROM stdin;
1	migrate-normalize-currency-codes-normalization.js	2026-05-14 19:00:38.507139+05:30	2026-05-14 19:00:38.530937+05:30
2	migrate-product-shipping-profile.js	2026-05-14 19:00:38.968493+05:30	2026-05-14 19:00:38.986005+05:30
3	migrate-tax-region-provider.js	2026-05-14 19:00:38.987481+05:30	2026-05-14 19:00:38.992196+05:30
4	initial-data-seed.ts	2026-05-14 19:00:39.001063+05:30	2026-05-14 19:00:39.314966+05:30
5	audit-keys.ts	2026-06-16 23:01:56.101007+05:30	2026-06-16 23:01:56.103572+05:30
6	audit-prices-v2.ts	2026-06-16 23:01:56.105678+05:30	2026-06-16 23:01:56.137859+05:30
7	audit-prices.ts	2026-06-16 23:01:56.139469+05:30	2026-06-16 23:01:56.148245+05:30
8	debug-data.ts	2026-06-16 23:01:56.150096+05:30	2026-06-16 23:01:56.1559+05:30
9	fix-prices-v2-final.ts	2026-06-16 23:01:56.157201+05:30	2026-06-16 23:01:56.172464+05:30
10	fix-prices-v2.ts	2026-06-16 23:01:56.174285+05:30	2026-06-16 23:01:56.210727+05:30
11	fix-prices-v3.ts	2026-06-16 23:01:56.212954+05:30	2026-06-16 23:01:56.223001+05:30
12	fix-prices-v4.ts	2026-06-16 23:01:56.224823+05:30	2026-06-16 23:01:56.263435+05:30
13	fix-prices-v5.ts	2026-06-16 23:01:56.265542+05:30	2026-06-16 23:01:56.293284+05:30
14	fix-prices-v6.ts	2026-06-16 23:01:56.3008+05:30	2026-06-16 23:01:56.366743+05:30
15	fix-tax.ts	2026-06-16 23:01:56.369928+05:30	2026-06-16 23:01:56.377217+05:30
\.


--
-- Data for Name: service_zone; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.service_zone (id, name, metadata, fulfillment_set_id, created_at, updated_at, deleted_at) FROM stdin;
serzo_01KRKAX836PTHMYK4MWQS2VFVS	Europe	\N	fuset_01KRKAX836BEEQWNEA5375G05Q	2026-05-14 19:00:39.078+05:30	2026-05-14 19:00:39.078+05:30	\N
\.


--
-- Data for Name: shipping_option; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.shipping_option (id, name, price_type, service_zone_id, shipping_profile_id, provider_id, data, metadata, shipping_option_type_id, created_at, updated_at, deleted_at) FROM stdin;
so_01KRKAX844FAGSQ8VENNDN7ZND	Standard Shipping	flat	serzo_01KRKAX836PTHMYK4MWQS2VFVS	sp_01KRKAX8064JAAAYG8QHC83G6W	manual_manual	\N	\N	sotype_01KRKAX84372201ZFNMT057S0S	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
so_01KRKAX844CAACB1HFXT870YBG	Express Shipping	flat	serzo_01KRKAX836PTHMYK4MWQS2VFVS	sp_01KRKAX8064JAAAYG8QHC83G6W	manual_manual	\N	\N	sotype_01KRKAX844AZY6JFTS7MP2WCJ8	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
\.


--
-- Data for Name: shipping_option_price_set; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.shipping_option_price_set (shipping_option_id, price_set_id, id, created_at, updated_at, deleted_at) FROM stdin;
so_01KRKAX844FAGSQ8VENNDN7ZND	pset_01KRKAX84D16769CS6M8504FSC	sops_01KRKAX8553PATDQD84AY3M9TR	2026-05-14 19:00:39.141122+05:30	2026-05-14 19:00:39.141122+05:30	\N
so_01KRKAX844CAACB1HFXT870YBG	pset_01KRKAX84DK9GD9KJ6FGSAPNED	sops_01KRKAX8551BYK7M1HKQHQE4PF	2026-05-14 19:00:39.141122+05:30	2026-05-14 19:00:39.141122+05:30	\N
\.


--
-- Data for Name: shipping_option_rule; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.shipping_option_rule (id, attribute, operator, value, shipping_option_id, created_at, updated_at, deleted_at) FROM stdin;
sorul_01KRKAX844QT22S624FN9NX4WS	enabled_in_store	eq	"true"	so_01KRKAX844FAGSQ8VENNDN7ZND	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
sorul_01KRKAX8443B5W3KPHJ6EHF2RA	is_return	eq	"false"	so_01KRKAX844FAGSQ8VENNDN7ZND	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
sorul_01KRKAX844A0C1VYPW80DJJYKF	enabled_in_store	eq	"true"	so_01KRKAX844CAACB1HFXT870YBG	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
sorul_01KRKAX8442R8411JSPHFGQWC7	is_return	eq	"false"	so_01KRKAX844CAACB1HFXT870YBG	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
\.


--
-- Data for Name: shipping_option_type; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.shipping_option_type (id, label, description, code, created_at, updated_at, deleted_at) FROM stdin;
sotype_01KRKAX84372201ZFNMT057S0S	Standard	Ship in 2-3 days.	standard	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
sotype_01KRKAX844AZY6JFTS7MP2WCJ8	Express	Ship in 24 hours.	express	2026-05-14 19:00:39.108+05:30	2026-05-14 19:00:39.108+05:30	\N
\.


--
-- Data for Name: shipping_profile; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.shipping_profile (id, name, type, metadata, created_at, updated_at, deleted_at) FROM stdin;
sp_01KRKAX8064JAAAYG8QHC83G6W	Default Shipping Profile	default	\N	2026-05-14 19:00:38.982+05:30	2026-05-14 19:00:38.982+05:30	\N
\.


--
-- Data for Name: stock_location; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.stock_location (id, created_at, updated_at, deleted_at, name, address_id, metadata) FROM stdin;
sloc_01KRKAX82SJ2Z7CN1GFEVQMFD9	2026-05-14 19:00:39.065+05:30	2026-05-14 19:00:39.065+05:30	\N	European Warehouse	laddr_01KRKAX82S3N8P6JFV60A02CXW	\N
\.


--
-- Data for Name: stock_location_address; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.stock_location_address (id, created_at, updated_at, deleted_at, address_1, address_2, company, city, country_code, phone, province, postal_code, metadata) FROM stdin;
laddr_01KRKAX82S3N8P6JFV60A02CXW	2026-05-14 19:00:39.065+05:30	2026-05-14 19:00:39.065+05:30	\N		\N	\N	Copenhagen	DK	\N	\N	\N	\N
\.


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.store (id, name, default_sales_channel_id, default_region_id, default_location_id, metadata, created_at, updated_at, deleted_at) FROM stdin;
store_01KRKAX81GR3NCZPDFCY1BGK4H	Default Store	sc_01KRKAX80VSSFAHXGWHE3PJX51	\N	\N	\N	2026-05-14 19:00:39.023737+05:30	2026-05-14 19:00:39.023737+05:30	\N
\.


--
-- Data for Name: store_currency; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.store_currency (id, currency_code, is_default, store_id, created_at, updated_at, deleted_at) FROM stdin;
stocur_01KRRENSMZN84FXEF7CAPF170Y	inr	t	store_01KRKAX81GR3NCZPDFCY1BGK4H	2026-05-16 18:42:41.36588+05:30	2026-05-16 18:42:41.36588+05:30	\N
\.


--
-- Data for Name: store_locale; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.store_locale (id, locale_code, store_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: tax_provider; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.tax_provider (id, is_enabled, created_at, updated_at, deleted_at) FROM stdin;
tp_system	t	2026-05-14 19:00:38.386+05:30	2026-05-14 19:00:38.386+05:30	\N
\.


--
-- Data for Name: tax_rate; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.tax_rate (id, rate, code, name, is_default, is_combinable, tax_region_id, metadata, created_at, updated_at, created_by, deleted_at) FROM stdin;
txr_01KRQNQC1JFJ8WW5ZFCRJMB7BD	5	715160	GST 	t	t	txreg_01KRQNQC18Y9N9NWB8MPQYGQ03	\N	2026-05-16 11:26:38.579+05:30	2026-05-16 11:32:35.515+05:30	user_01KRKDN2SH796294F8NGPNDGER	2026-05-16 11:32:35.504+05:30
txr_01KRQP39FXE2T0WT66VB1ES6FY	5	CSH7Q	GST 	f	f	txreg_01KRQKP8ZPQQB5XC0GY2HK6S0J	\N	2026-05-16 11:33:09.181+05:30	2026-05-16 11:33:09.181+05:30	user_01KRKDN2SH796294F8NGPNDGER	\N
\.


--
-- Data for Name: tax_rate_rule; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.tax_rate_rule (id, tax_rate_id, reference_id, reference, metadata, created_at, updated_at, created_by, deleted_at) FROM stdin;
\.


--
-- Data for Name: tax_region; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.tax_region (id, provider_id, country_code, province_code, parent_id, metadata, created_at, updated_at, created_by, deleted_at) FROM stdin;
txreg_01KRKAX82G0DJ9K25B4MMN861E	tp_system	gb	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRKAX82G4B3J0FKAW9E1R2GY	tp_system	de	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRKAX82G7P3TCCGX62JZAEYC	tp_system	dk	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRKAX82GYVN4HFV0N6YAQY62	tp_system	se	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRKAX82GD9HFQTKHPV3XBTR1	tp_system	fr	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRKAX82H36YR2G4P3XN4XRNY	tp_system	es	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRKAX82HK0905XGB3ANMABR6	tp_system	it	\N	\N	\N	2026-05-14 19:00:39.057+05:30	2026-05-14 19:00:39.057+05:30	\N	\N
txreg_01KRQKP8ZPQQB5XC0GY2HK6S0J	tp_system	in	\N	\N	\N	2026-05-16 10:51:05.527+05:30	2026-05-16 10:51:05.527+05:30	user_01KRKDN2SH796294F8NGPNDGER	\N
txreg_01KRQNQC18Y9N9NWB8MPQYGQ03	\N	in	in-dl	txreg_01KRQKP8ZPQQB5XC0GY2HK6S0J	\N	2026-05-16 11:26:38.569+05:30	2026-05-16 11:32:35.505+05:30	user_01KRKDN2SH796294F8NGPNDGER	2026-05-16 11:32:35.504+05:30
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public."user" (id, first_name, last_name, email, avatar_url, metadata, created_at, updated_at, deleted_at) FROM stdin;
user_01KRKD6JWDJXPYSBX6A2ZAKDST	\N	\N	admin@medusa-test.com	\N	\N	2026-05-14 19:40:42.189+05:30	2026-05-14 19:40:42.189+05:30	\N
user_01KRKDN2SH796294F8NGPNDGER	RIZWAN	BEG	rizwan.beg2004@gmail.com	\N	\N	2026-05-14 19:48:37.234+05:30	2026-05-14 20:17:06.837+05:30	\N
user_01KRQGM5DKW67V876GZ6K0EESJ	\N	\N	admin@safina.com	\N	\N	2026-05-16 09:57:30.612+05:30	2026-05-16 09:57:30.612+05:30	\N
\.


--
-- Data for Name: user_preference; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.user_preference (id, user_id, key, value, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: user_rbac_role; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.user_rbac_role (user_id, rbac_role_id, id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: view_configuration; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.view_configuration (id, entity, name, user_id, is_system_default, configuration, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: visualizer_result; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.visualizer_result (id, customer_id, customer_name, image_url, created_at, updated_at, deleted_at) FROM stdin;
01KVADJ0QJGK4S7ZZ17SR815CH	test_id	Test User	http://test.com/img.png	2026-06-17 14:40:52.402+05:30	2026-06-17 14:40:52.402+05:30	\N
01KVADPSRMG6DN63V8HSZB9RQZ	cus_01KV8SQZ9G625TQEEN0G2CHWT3	Rizwan -	http://127.0.0.1:8000/images/output_868e0aad4cf54a1bb2a8bc63bfdc499a.png	2026-06-17 14:43:29.108+05:30	2026-06-17 14:43:29.108+05:30	\N
\.


--
-- Data for Name: workflow_execution; Type: TABLE DATA; Schema: public; Owner: rizwan
--

COPY public.workflow_execution (id, workflow_id, transaction_id, execution, context, state, created_at, updated_at, deleted_at, retention_time, run_id) FROM stdin;
\.


--
-- Name: link_module_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.link_module_migrations_id_seq', 140, true);


--
-- Name: mikro_orm_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.mikro_orm_migrations_id_seq', 168, true);


--
-- Name: order_change_action_ordering_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.order_change_action_ordering_seq', 4, true);


--
-- Name: order_claim_display_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.order_claim_display_id_seq', 1, false);


--
-- Name: order_display_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.order_display_id_seq', 6, true);


--
-- Name: order_exchange_display_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.order_exchange_display_id_seq', 1, false);


--
-- Name: return_display_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.return_display_id_seq', 1, false);


--
-- Name: script_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rizwan
--

SELECT pg_catalog.setval('public.script_migrations_id_seq', 15, true);


--
-- Name: account_holder account_holder_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.account_holder
    ADD CONSTRAINT account_holder_pkey PRIMARY KEY (id);


--
-- Name: announcement announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.announcement
    ADD CONSTRAINT announcement_pkey PRIMARY KEY (id);


--
-- Name: api_key api_key_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.api_key
    ADD CONSTRAINT api_key_pkey PRIMARY KEY (id);


--
-- Name: application_method_buy_rules application_method_buy_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.application_method_buy_rules
    ADD CONSTRAINT application_method_buy_rules_pkey PRIMARY KEY (application_method_id, promotion_rule_id);


--
-- Name: application_method_target_rules application_method_target_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.application_method_target_rules
    ADD CONSTRAINT application_method_target_rules_pkey PRIMARY KEY (application_method_id, promotion_rule_id);


--
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);


--
-- Name: auth_identity auth_identity_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.auth_identity
    ADD CONSTRAINT auth_identity_pkey PRIMARY KEY (id);


--
-- Name: capture capture_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.capture
    ADD CONSTRAINT capture_pkey PRIMARY KEY (id);


--
-- Name: cart_address cart_address_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_address
    ADD CONSTRAINT cart_address_pkey PRIMARY KEY (id);


--
-- Name: cart_line_item_adjustment cart_line_item_adjustment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_line_item_adjustment
    ADD CONSTRAINT cart_line_item_adjustment_pkey PRIMARY KEY (id);


--
-- Name: cart_line_item cart_line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_line_item
    ADD CONSTRAINT cart_line_item_pkey PRIMARY KEY (id);


--
-- Name: cart_line_item_tax_line cart_line_item_tax_line_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_line_item_tax_line
    ADD CONSTRAINT cart_line_item_tax_line_pkey PRIMARY KEY (id);


--
-- Name: cart_payment_collection cart_payment_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_payment_collection
    ADD CONSTRAINT cart_payment_collection_pkey PRIMARY KEY (cart_id, payment_collection_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: cart_promotion cart_promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_promotion
    ADD CONSTRAINT cart_promotion_pkey PRIMARY KEY (cart_id, promotion_id);


--
-- Name: cart_shipping_method_adjustment cart_shipping_method_adjustment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_shipping_method_adjustment
    ADD CONSTRAINT cart_shipping_method_adjustment_pkey PRIMARY KEY (id);


--
-- Name: cart_shipping_method cart_shipping_method_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_shipping_method
    ADD CONSTRAINT cart_shipping_method_pkey PRIMARY KEY (id);


--
-- Name: cart_shipping_method_tax_line cart_shipping_method_tax_line_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_shipping_method_tax_line
    ADD CONSTRAINT cart_shipping_method_tax_line_pkey PRIMARY KEY (id);


--
-- Name: conversation conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.conversation
    ADD CONSTRAINT conversation_pkey PRIMARY KEY (id);


--
-- Name: credit_line credit_line_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.credit_line
    ADD CONSTRAINT credit_line_pkey PRIMARY KEY (id);


--
-- Name: currency currency_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (code);


--
-- Name: customer_account_holder customer_account_holder_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_account_holder
    ADD CONSTRAINT customer_account_holder_pkey PRIMARY KEY (customer_id, account_holder_id);


--
-- Name: customer_address customer_address_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_pkey PRIMARY KEY (id);


--
-- Name: customer_group_customer customer_group_customer_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_group_customer
    ADD CONSTRAINT customer_group_customer_pkey PRIMARY KEY (id);


--
-- Name: customer_group customer_group_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_group
    ADD CONSTRAINT customer_group_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: favorite favorite_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.favorite
    ADD CONSTRAINT favorite_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_address fulfillment_address_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_address
    ADD CONSTRAINT fulfillment_address_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_item fulfillment_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_item
    ADD CONSTRAINT fulfillment_item_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_label fulfillment_label_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_label
    ADD CONSTRAINT fulfillment_label_pkey PRIMARY KEY (id);


--
-- Name: fulfillment fulfillment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment
    ADD CONSTRAINT fulfillment_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_provider fulfillment_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_provider
    ADD CONSTRAINT fulfillment_provider_pkey PRIMARY KEY (id);


--
-- Name: fulfillment_set fulfillment_set_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_set
    ADD CONSTRAINT fulfillment_set_pkey PRIMARY KEY (id);


--
-- Name: geo_zone geo_zone_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.geo_zone
    ADD CONSTRAINT geo_zone_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: inventory_item inventory_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.inventory_item
    ADD CONSTRAINT inventory_item_pkey PRIMARY KEY (id);


--
-- Name: inventory_level inventory_level_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.inventory_level
    ADD CONSTRAINT inventory_level_pkey PRIMARY KEY (id);


--
-- Name: invite invite_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.invite
    ADD CONSTRAINT invite_pkey PRIMARY KEY (id);


--
-- Name: invite_rbac_role invite_rbac_role_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.invite_rbac_role
    ADD CONSTRAINT invite_rbac_role_pkey PRIMARY KEY (invite_id, rbac_role_id);


--
-- Name: link_module_migrations link_module_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.link_module_migrations
    ADD CONSTRAINT link_module_migrations_pkey PRIMARY KEY (id);


--
-- Name: link_module_migrations link_module_migrations_table_name_key; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.link_module_migrations
    ADD CONSTRAINT link_module_migrations_table_name_key UNIQUE (table_name);


--
-- Name: location_fulfillment_provider location_fulfillment_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.location_fulfillment_provider
    ADD CONSTRAINT location_fulfillment_provider_pkey PRIMARY KEY (stock_location_id, fulfillment_provider_id);


--
-- Name: location_fulfillment_set location_fulfillment_set_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.location_fulfillment_set
    ADD CONSTRAINT location_fulfillment_set_pkey PRIMARY KEY (stock_location_id, fulfillment_set_id);


--
-- Name: message message_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (id);


--
-- Name: mikro_orm_migrations mikro_orm_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.mikro_orm_migrations
    ADD CONSTRAINT mikro_orm_migrations_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: notification_provider notification_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.notification_provider
    ADD CONSTRAINT notification_provider_pkey PRIMARY KEY (id);


--
-- Name: order_address order_address_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_address
    ADD CONSTRAINT order_address_pkey PRIMARY KEY (id);


--
-- Name: order_cart order_cart_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_cart
    ADD CONSTRAINT order_cart_pkey PRIMARY KEY (order_id, cart_id);


--
-- Name: order_change_action order_change_action_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_change_action
    ADD CONSTRAINT order_change_action_pkey PRIMARY KEY (id);


--
-- Name: order_change order_change_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_change
    ADD CONSTRAINT order_change_pkey PRIMARY KEY (id);


--
-- Name: order_claim_item_image order_claim_item_image_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_claim_item_image
    ADD CONSTRAINT order_claim_item_image_pkey PRIMARY KEY (id);


--
-- Name: order_claim_item order_claim_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_claim_item
    ADD CONSTRAINT order_claim_item_pkey PRIMARY KEY (id);


--
-- Name: order_claim order_claim_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_claim
    ADD CONSTRAINT order_claim_pkey PRIMARY KEY (id);


--
-- Name: order_credit_line order_credit_line_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_credit_line
    ADD CONSTRAINT order_credit_line_pkey PRIMARY KEY (id);


--
-- Name: order_exchange_item order_exchange_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_exchange_item
    ADD CONSTRAINT order_exchange_item_pkey PRIMARY KEY (id);


--
-- Name: order_exchange order_exchange_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_exchange
    ADD CONSTRAINT order_exchange_pkey PRIMARY KEY (id);


--
-- Name: order_fulfillment order_fulfillment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_fulfillment
    ADD CONSTRAINT order_fulfillment_pkey PRIMARY KEY (order_id, fulfillment_id);


--
-- Name: order_item order_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);


--
-- Name: order_line_item_adjustment order_line_item_adjustment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_line_item_adjustment
    ADD CONSTRAINT order_line_item_adjustment_pkey PRIMARY KEY (id);


--
-- Name: order_line_item order_line_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_line_item
    ADD CONSTRAINT order_line_item_pkey PRIMARY KEY (id);


--
-- Name: order_line_item_tax_line order_line_item_tax_line_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_line_item_tax_line
    ADD CONSTRAINT order_line_item_tax_line_pkey PRIMARY KEY (id);


--
-- Name: order_payment_collection order_payment_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_payment_collection
    ADD CONSTRAINT order_payment_collection_pkey PRIMARY KEY (order_id, payment_collection_id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: order_promotion order_promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_promotion
    ADD CONSTRAINT order_promotion_pkey PRIMARY KEY (order_id, promotion_id);


--
-- Name: order_shipping_method_adjustment order_shipping_method_adjustment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping_method_adjustment
    ADD CONSTRAINT order_shipping_method_adjustment_pkey PRIMARY KEY (id);


--
-- Name: order_shipping_method order_shipping_method_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping_method
    ADD CONSTRAINT order_shipping_method_pkey PRIMARY KEY (id);


--
-- Name: order_shipping_method_tax_line order_shipping_method_tax_line_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping_method_tax_line
    ADD CONSTRAINT order_shipping_method_tax_line_pkey PRIMARY KEY (id);


--
-- Name: order_shipping order_shipping_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping
    ADD CONSTRAINT order_shipping_pkey PRIMARY KEY (id);


--
-- Name: order_summary order_summary_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_summary
    ADD CONSTRAINT order_summary_pkey PRIMARY KEY (id);


--
-- Name: order_transaction order_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_transaction
    ADD CONSTRAINT order_transaction_pkey PRIMARY KEY (id);


--
-- Name: payment_collection_payment_providers payment_collection_payment_providers_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_collection_payment_providers
    ADD CONSTRAINT payment_collection_payment_providers_pkey PRIMARY KEY (payment_collection_id, payment_provider_id);


--
-- Name: payment_collection payment_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_collection
    ADD CONSTRAINT payment_collection_pkey PRIMARY KEY (id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- Name: payment_provider payment_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_provider
    ADD CONSTRAINT payment_provider_pkey PRIMARY KEY (id);


--
-- Name: payment_session payment_session_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_session
    ADD CONSTRAINT payment_session_pkey PRIMARY KEY (id);


--
-- Name: price_list price_list_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_list
    ADD CONSTRAINT price_list_pkey PRIMARY KEY (id);


--
-- Name: price_list_rule price_list_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_list_rule
    ADD CONSTRAINT price_list_rule_pkey PRIMARY KEY (id);


--
-- Name: price price_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_pkey PRIMARY KEY (id);


--
-- Name: price_preference price_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_preference
    ADD CONSTRAINT price_preference_pkey PRIMARY KEY (id);


--
-- Name: price_rule price_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_rule
    ADD CONSTRAINT price_rule_pkey PRIMARY KEY (id);


--
-- Name: price_set price_set_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_set
    ADD CONSTRAINT price_set_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);


--
-- Name: product_category_product product_category_product_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_category_product
    ADD CONSTRAINT product_category_product_pkey PRIMARY KEY (product_id, product_category_id);


--
-- Name: product_collection product_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_collection
    ADD CONSTRAINT product_collection_pkey PRIMARY KEY (id);


--
-- Name: product_option product_option_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_option
    ADD CONSTRAINT product_option_pkey PRIMARY KEY (id);


--
-- Name: product_option_value product_option_value_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT product_option_value_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: product_sales_channel product_sales_channel_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_sales_channel
    ADD CONSTRAINT product_sales_channel_pkey PRIMARY KEY (product_id, sales_channel_id);


--
-- Name: product_shipping_profile product_shipping_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_shipping_profile
    ADD CONSTRAINT product_shipping_profile_pkey PRIMARY KEY (product_id, shipping_profile_id);


--
-- Name: product_tag product_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_tag
    ADD CONSTRAINT product_tag_pkey PRIMARY KEY (id);


--
-- Name: product_tags product_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_pkey PRIMARY KEY (product_id, product_tag_id);


--
-- Name: product_type product_type_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_type
    ADD CONSTRAINT product_type_pkey PRIMARY KEY (id);


--
-- Name: product_variant_inventory_item product_variant_inventory_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_inventory_item
    ADD CONSTRAINT product_variant_inventory_item_pkey PRIMARY KEY (variant_id, inventory_item_id);


--
-- Name: product_variant_option product_variant_option_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_option
    ADD CONSTRAINT product_variant_option_pkey PRIMARY KEY (variant_id, option_value_id);


--
-- Name: product_variant product_variant_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant
    ADD CONSTRAINT product_variant_pkey PRIMARY KEY (id);


--
-- Name: product_variant_price_set product_variant_price_set_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_price_set
    ADD CONSTRAINT product_variant_price_set_pkey PRIMARY KEY (variant_id, price_set_id);


--
-- Name: product_variant_product_image product_variant_product_image_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_product_image
    ADD CONSTRAINT product_variant_product_image_pkey PRIMARY KEY (id);


--
-- Name: promotion_application_method promotion_application_method_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_application_method
    ADD CONSTRAINT promotion_application_method_pkey PRIMARY KEY (id);


--
-- Name: promotion_campaign_budget promotion_campaign_budget_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_campaign_budget
    ADD CONSTRAINT promotion_campaign_budget_pkey PRIMARY KEY (id);


--
-- Name: promotion_campaign_budget_usage promotion_campaign_budget_usage_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_campaign_budget_usage
    ADD CONSTRAINT promotion_campaign_budget_usage_pkey PRIMARY KEY (id);


--
-- Name: promotion_campaign promotion_campaign_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_campaign
    ADD CONSTRAINT promotion_campaign_pkey PRIMARY KEY (id);


--
-- Name: promotion promotion_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion
    ADD CONSTRAINT promotion_pkey PRIMARY KEY (id);


--
-- Name: promotion_promotion_rule promotion_promotion_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_promotion_rule
    ADD CONSTRAINT promotion_promotion_rule_pkey PRIMARY KEY (promotion_id, promotion_rule_id);


--
-- Name: promotion_rule promotion_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_rule
    ADD CONSTRAINT promotion_rule_pkey PRIMARY KEY (id);


--
-- Name: promotion_rule_value promotion_rule_value_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_rule_value
    ADD CONSTRAINT promotion_rule_value_pkey PRIMARY KEY (id);


--
-- Name: property_label property_label_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.property_label
    ADD CONSTRAINT property_label_pkey PRIMARY KEY (id);


--
-- Name: provider_identity provider_identity_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.provider_identity
    ADD CONSTRAINT provider_identity_pkey PRIMARY KEY (id);


--
-- Name: publishable_api_key_sales_channel publishable_api_key_sales_channel_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.publishable_api_key_sales_channel
    ADD CONSTRAINT publishable_api_key_sales_channel_pkey PRIMARY KEY (publishable_key_id, sales_channel_id);


--
-- Name: refund refund_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT refund_pkey PRIMARY KEY (id);


--
-- Name: refund_reason refund_reason_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.refund_reason
    ADD CONSTRAINT refund_reason_pkey PRIMARY KEY (id);


--
-- Name: region_country region_country_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.region_country
    ADD CONSTRAINT region_country_pkey PRIMARY KEY (iso_2);


--
-- Name: region_payment_provider region_payment_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.region_payment_provider
    ADD CONSTRAINT region_payment_provider_pkey PRIMARY KEY (region_id, payment_provider_id);


--
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id);


--
-- Name: reservation_item reservation_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.reservation_item
    ADD CONSTRAINT reservation_item_pkey PRIMARY KEY (id);


--
-- Name: return_fulfillment return_fulfillment_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.return_fulfillment
    ADD CONSTRAINT return_fulfillment_pkey PRIMARY KEY (return_id, fulfillment_id);


--
-- Name: return_item return_item_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.return_item
    ADD CONSTRAINT return_item_pkey PRIMARY KEY (id);


--
-- Name: return return_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.return
    ADD CONSTRAINT return_pkey PRIMARY KEY (id);


--
-- Name: return_reason return_reason_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.return_reason
    ADD CONSTRAINT return_reason_pkey PRIMARY KEY (id);


--
-- Name: sales_channel sales_channel_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.sales_channel
    ADD CONSTRAINT sales_channel_pkey PRIMARY KEY (id);


--
-- Name: sales_channel_stock_location sales_channel_stock_location_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.sales_channel_stock_location
    ADD CONSTRAINT sales_channel_stock_location_pkey PRIMARY KEY (sales_channel_id, stock_location_id);


--
-- Name: script_migrations script_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.script_migrations
    ADD CONSTRAINT script_migrations_pkey PRIMARY KEY (id);


--
-- Name: service_zone service_zone_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.service_zone
    ADD CONSTRAINT service_zone_pkey PRIMARY KEY (id);


--
-- Name: shipping_option shipping_option_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option
    ADD CONSTRAINT shipping_option_pkey PRIMARY KEY (id);


--
-- Name: shipping_option_price_set shipping_option_price_set_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option_price_set
    ADD CONSTRAINT shipping_option_price_set_pkey PRIMARY KEY (shipping_option_id, price_set_id);


--
-- Name: shipping_option_rule shipping_option_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option_rule
    ADD CONSTRAINT shipping_option_rule_pkey PRIMARY KEY (id);


--
-- Name: shipping_option_type shipping_option_type_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option_type
    ADD CONSTRAINT shipping_option_type_pkey PRIMARY KEY (id);


--
-- Name: shipping_profile shipping_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_profile
    ADD CONSTRAINT shipping_profile_pkey PRIMARY KEY (id);


--
-- Name: stock_location_address stock_location_address_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.stock_location_address
    ADD CONSTRAINT stock_location_address_pkey PRIMARY KEY (id);


--
-- Name: stock_location stock_location_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.stock_location
    ADD CONSTRAINT stock_location_pkey PRIMARY KEY (id);


--
-- Name: store_currency store_currency_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.store_currency
    ADD CONSTRAINT store_currency_pkey PRIMARY KEY (id);


--
-- Name: store_locale store_locale_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.store_locale
    ADD CONSTRAINT store_locale_pkey PRIMARY KEY (id);


--
-- Name: store store_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (id);


--
-- Name: tax_provider tax_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_provider
    ADD CONSTRAINT tax_provider_pkey PRIMARY KEY (id);


--
-- Name: tax_rate tax_rate_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_rate
    ADD CONSTRAINT tax_rate_pkey PRIMARY KEY (id);


--
-- Name: tax_rate_rule tax_rate_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_rate_rule
    ADD CONSTRAINT tax_rate_rule_pkey PRIMARY KEY (id);


--
-- Name: tax_region tax_region_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_region
    ADD CONSTRAINT tax_region_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_preference user_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.user_preference
    ADD CONSTRAINT user_preference_pkey PRIMARY KEY (id);


--
-- Name: user_rbac_role user_rbac_role_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.user_rbac_role
    ADD CONSTRAINT user_rbac_role_pkey PRIMARY KEY (user_id, rbac_role_id);


--
-- Name: view_configuration view_configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.view_configuration
    ADD CONSTRAINT view_configuration_pkey PRIMARY KEY (id);


--
-- Name: visualizer_result visualizer_result_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.visualizer_result
    ADD CONSTRAINT visualizer_result_pkey PRIMARY KEY (id);


--
-- Name: workflow_execution workflow_execution_pkey; Type: CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.workflow_execution
    ADD CONSTRAINT workflow_execution_pkey PRIMARY KEY (workflow_id, transaction_id, run_id);


--
-- Name: IDX_account_holder_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_account_holder_deleted_at" ON public.account_holder USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_account_holder_id_5cb3a0c0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_account_holder_id_5cb3a0c0" ON public.customer_account_holder USING btree (account_holder_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_account_holder_provider_id_external_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_account_holder_provider_id_external_id_unique" ON public.account_holder USING btree (provider_id, external_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_announcement_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_announcement_deleted_at" ON public.announcement USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_api_key_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_api_key_deleted_at" ON public.api_key USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_api_key_redacted; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_api_key_redacted" ON public.api_key USING btree (redacted) WHERE (deleted_at IS NULL);


--
-- Name: IDX_api_key_revoked_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_api_key_revoked_at" ON public.api_key USING btree (revoked_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_api_key_token_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_api_key_token_unique" ON public.api_key USING btree (token);


--
-- Name: IDX_api_key_type; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_api_key_type" ON public.api_key USING btree (type);


--
-- Name: IDX_application_method_allocation; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_application_method_allocation" ON public.promotion_application_method USING btree (allocation);


--
-- Name: IDX_application_method_target_type; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_application_method_target_type" ON public.promotion_application_method USING btree (target_type);


--
-- Name: IDX_application_method_type; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_application_method_type" ON public.promotion_application_method USING btree (type);


--
-- Name: IDX_appointment_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_appointment_deleted_at" ON public.appointment USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_auth_identity_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_auth_identity_deleted_at" ON public.auth_identity USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_campaign_budget_type; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_campaign_budget_type" ON public.promotion_campaign_budget USING btree (type);


--
-- Name: IDX_capture_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_capture_deleted_at" ON public.capture USING btree (deleted_at);


--
-- Name: IDX_capture_payment_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_capture_payment_id" ON public.capture USING btree (payment_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_address_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_address_deleted_at" ON public.cart_address USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_billing_address_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_billing_address_id" ON public.cart USING btree (billing_address_id) WHERE ((deleted_at IS NULL) AND (billing_address_id IS NOT NULL));


--
-- Name: IDX_cart_credit_line_reference_reference_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_credit_line_reference_reference_id" ON public.credit_line USING btree (reference, reference_id) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_currency_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_currency_code" ON public.cart USING btree (currency_code);


--
-- Name: IDX_cart_customer_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_customer_id" ON public.cart USING btree (customer_id) WHERE ((deleted_at IS NULL) AND (customer_id IS NOT NULL));


--
-- Name: IDX_cart_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_deleted_at" ON public.cart USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_id_-4a39f6c9; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_id_-4a39f6c9" ON public.cart_payment_collection USING btree (cart_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_id_-71069c16; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_id_-71069c16" ON public.order_cart USING btree (cart_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_id_-a9d4a70b; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_id_-a9d4a70b" ON public.cart_promotion USING btree (cart_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_line_item_adjustment_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_line_item_adjustment_deleted_at" ON public.cart_line_item_adjustment USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_line_item_adjustment_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_line_item_adjustment_item_id" ON public.cart_line_item_adjustment USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_line_item_cart_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_line_item_cart_id" ON public.cart_line_item USING btree (cart_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_line_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_line_item_deleted_at" ON public.cart_line_item USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_line_item_tax_line_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_line_item_tax_line_deleted_at" ON public.cart_line_item_tax_line USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_line_item_tax_line_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_line_item_tax_line_item_id" ON public.cart_line_item_tax_line USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_region_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_region_id" ON public.cart USING btree (region_id) WHERE ((deleted_at IS NULL) AND (region_id IS NOT NULL));


--
-- Name: IDX_cart_sales_channel_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_sales_channel_id" ON public.cart USING btree (sales_channel_id) WHERE ((deleted_at IS NULL) AND (sales_channel_id IS NOT NULL));


--
-- Name: IDX_cart_shipping_address_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_address_id" ON public.cart USING btree (shipping_address_id) WHERE ((deleted_at IS NULL) AND (shipping_address_id IS NOT NULL));


--
-- Name: IDX_cart_shipping_method_adjustment_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_method_adjustment_deleted_at" ON public.cart_shipping_method_adjustment USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_shipping_method_adjustment_shipping_method_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_method_adjustment_shipping_method_id" ON public.cart_shipping_method_adjustment USING btree (shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_shipping_method_cart_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_method_cart_id" ON public.cart_shipping_method USING btree (cart_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_cart_shipping_method_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_method_deleted_at" ON public.cart_shipping_method USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_shipping_method_tax_line_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_method_tax_line_deleted_at" ON public.cart_shipping_method_tax_line USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_cart_shipping_method_tax_line_shipping_method_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_cart_shipping_method_tax_line_shipping_method_id" ON public.cart_shipping_method_tax_line USING btree (shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_category_handle_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_category_handle_unique" ON public.product_category USING btree (handle) WHERE (deleted_at IS NULL);


--
-- Name: IDX_collection_handle_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_collection_handle_unique" ON public.product_collection USING btree (handle) WHERE (deleted_at IS NULL);


--
-- Name: IDX_conversation_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_conversation_deleted_at" ON public.conversation USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_conversation_session_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_conversation_session_id_unique" ON public.conversation USING btree (session_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_credit_line_cart_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_credit_line_cart_id" ON public.credit_line USING btree (cart_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_credit_line_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_credit_line_deleted_at" ON public.credit_line USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_address_customer_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_address_customer_id" ON public.customer_address USING btree (customer_id);


--
-- Name: IDX_customer_address_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_address_deleted_at" ON public.customer_address USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_address_unique_customer_billing; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_customer_address_unique_customer_billing" ON public.customer_address USING btree (customer_id) WHERE (is_default_billing = true);


--
-- Name: IDX_customer_address_unique_customer_shipping; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_customer_address_unique_customer_shipping" ON public.customer_address USING btree (customer_id) WHERE (is_default_shipping = true);


--
-- Name: IDX_customer_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_deleted_at" ON public.customer USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_email_has_account_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_customer_email_has_account_unique" ON public.customer USING btree (email, has_account) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_group_customer_customer_group_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_group_customer_customer_group_id" ON public.customer_group_customer USING btree (customer_group_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_group_customer_customer_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_group_customer_customer_id" ON public.customer_group_customer USING btree (customer_id);


--
-- Name: IDX_customer_group_customer_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_group_customer_deleted_at" ON public.customer_group_customer USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_group_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_group_deleted_at" ON public.customer_group USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_group_name_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_customer_group_name_unique" ON public.customer_group USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: IDX_customer_id_5cb3a0c0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_customer_id_5cb3a0c0" ON public.customer_account_holder USING btree (customer_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_deleted_at_-1d67bae40; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-1d67bae40" ON public.publishable_api_key_sales_channel USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-1e5992737; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-1e5992737" ON public.location_fulfillment_provider USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-31ea43a; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-31ea43a" ON public.return_fulfillment USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-4a39f6c9; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-4a39f6c9" ON public.cart_payment_collection USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-71069c16; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-71069c16" ON public.order_cart USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-71518339; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-71518339" ON public.order_promotion USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-85069d44; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-85069d44" ON public.invite_rbac_role USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-a9d4a70b; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-a9d4a70b" ON public.cart_promotion USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-e88adb96; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-e88adb96" ON public.location_fulfillment_set USING btree (deleted_at);


--
-- Name: IDX_deleted_at_-e8d2543e; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_-e8d2543e" ON public.order_fulfillment USING btree (deleted_at);


--
-- Name: IDX_deleted_at_17a262437; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_17a262437" ON public.product_shipping_profile USING btree (deleted_at);


--
-- Name: IDX_deleted_at_17b4c4e35; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_17b4c4e35" ON public.product_variant_inventory_item USING btree (deleted_at);


--
-- Name: IDX_deleted_at_1c934dab0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_1c934dab0" ON public.region_payment_provider USING btree (deleted_at);


--
-- Name: IDX_deleted_at_20b454295; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_20b454295" ON public.product_sales_channel USING btree (deleted_at);


--
-- Name: IDX_deleted_at_26d06f470; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_26d06f470" ON public.sales_channel_stock_location USING btree (deleted_at);


--
-- Name: IDX_deleted_at_52b23597; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_52b23597" ON public.product_variant_price_set USING btree (deleted_at);


--
-- Name: IDX_deleted_at_5cb3a0c0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_5cb3a0c0" ON public.customer_account_holder USING btree (deleted_at);


--
-- Name: IDX_deleted_at_64ff0c4c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_64ff0c4c" ON public.user_rbac_role USING btree (deleted_at);


--
-- Name: IDX_deleted_at_ba32fa9c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_ba32fa9c" ON public.shipping_option_price_set USING btree (deleted_at);


--
-- Name: IDX_deleted_at_f42b9949; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_deleted_at_f42b9949" ON public.order_payment_collection USING btree (deleted_at);


--
-- Name: IDX_favorite_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_favorite_deleted_at" ON public.favorite USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_address_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_address_deleted_at" ON public.fulfillment_address USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_fulfillment_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_deleted_at" ON public.fulfillment USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_fulfillment_id_-31ea43a; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_id_-31ea43a" ON public.return_fulfillment USING btree (fulfillment_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_id_-e8d2543e; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_id_-e8d2543e" ON public.order_fulfillment USING btree (fulfillment_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_item_deleted_at" ON public.fulfillment_item USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_fulfillment_item_fulfillment_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_item_fulfillment_id" ON public.fulfillment_item USING btree (fulfillment_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_item_inventory_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_item_inventory_item_id" ON public.fulfillment_item USING btree (inventory_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_item_line_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_item_line_item_id" ON public.fulfillment_item USING btree (line_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_label_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_label_deleted_at" ON public.fulfillment_label USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_fulfillment_label_fulfillment_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_label_fulfillment_id" ON public.fulfillment_label USING btree (fulfillment_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_location_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_location_id" ON public.fulfillment USING btree (location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_provider_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_provider_deleted_at" ON public.fulfillment_provider USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_provider_id_-1e5992737; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_provider_id_-1e5992737" ON public.location_fulfillment_provider USING btree (fulfillment_provider_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_set_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_set_deleted_at" ON public.fulfillment_set USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_fulfillment_set_id_-e88adb96; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_set_id_-e88adb96" ON public.location_fulfillment_set USING btree (fulfillment_set_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_set_name_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_fulfillment_set_name_unique" ON public.fulfillment_set USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: IDX_fulfillment_shipping_option_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_fulfillment_shipping_option_id" ON public.fulfillment USING btree (shipping_option_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_geo_zone_city; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_geo_zone_city" ON public.geo_zone USING btree (city) WHERE ((deleted_at IS NULL) AND (city IS NOT NULL));


--
-- Name: IDX_geo_zone_country_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_geo_zone_country_code" ON public.geo_zone USING btree (country_code) WHERE (deleted_at IS NULL);


--
-- Name: IDX_geo_zone_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_geo_zone_deleted_at" ON public.geo_zone USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_geo_zone_province_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_geo_zone_province_code" ON public.geo_zone USING btree (province_code) WHERE ((deleted_at IS NULL) AND (province_code IS NOT NULL));


--
-- Name: IDX_geo_zone_service_zone_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_geo_zone_service_zone_id" ON public.geo_zone USING btree (service_zone_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_id_-1d67bae40; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-1d67bae40" ON public.publishable_api_key_sales_channel USING btree (id);


--
-- Name: IDX_id_-1e5992737; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-1e5992737" ON public.location_fulfillment_provider USING btree (id);


--
-- Name: IDX_id_-31ea43a; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-31ea43a" ON public.return_fulfillment USING btree (id);


--
-- Name: IDX_id_-4a39f6c9; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-4a39f6c9" ON public.cart_payment_collection USING btree (id);


--
-- Name: IDX_id_-71069c16; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-71069c16" ON public.order_cart USING btree (id);


--
-- Name: IDX_id_-71518339; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-71518339" ON public.order_promotion USING btree (id);


--
-- Name: IDX_id_-85069d44; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-85069d44" ON public.invite_rbac_role USING btree (id);


--
-- Name: IDX_id_-a9d4a70b; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-a9d4a70b" ON public.cart_promotion USING btree (id);


--
-- Name: IDX_id_-e88adb96; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-e88adb96" ON public.location_fulfillment_set USING btree (id);


--
-- Name: IDX_id_-e8d2543e; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_-e8d2543e" ON public.order_fulfillment USING btree (id);


--
-- Name: IDX_id_17a262437; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_17a262437" ON public.product_shipping_profile USING btree (id);


--
-- Name: IDX_id_17b4c4e35; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_17b4c4e35" ON public.product_variant_inventory_item USING btree (id);


--
-- Name: IDX_id_1c934dab0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_1c934dab0" ON public.region_payment_provider USING btree (id);


--
-- Name: IDX_id_20b454295; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_20b454295" ON public.product_sales_channel USING btree (id);


--
-- Name: IDX_id_26d06f470; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_26d06f470" ON public.sales_channel_stock_location USING btree (id);


--
-- Name: IDX_id_52b23597; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_52b23597" ON public.product_variant_price_set USING btree (id);


--
-- Name: IDX_id_5cb3a0c0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_5cb3a0c0" ON public.customer_account_holder USING btree (id);


--
-- Name: IDX_id_64ff0c4c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_64ff0c4c" ON public.user_rbac_role USING btree (id);


--
-- Name: IDX_id_ba32fa9c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_ba32fa9c" ON public.shipping_option_price_set USING btree (id);


--
-- Name: IDX_id_f42b9949; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_id_f42b9949" ON public.order_payment_collection USING btree (id);


--
-- Name: IDX_image_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_image_deleted_at" ON public.image USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_image_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_image_product_id" ON public.image USING btree (product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_inventory_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_inventory_item_deleted_at" ON public.inventory_item USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_inventory_item_id_17b4c4e35; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_inventory_item_id_17b4c4e35" ON public.product_variant_inventory_item USING btree (inventory_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_inventory_item_sku; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_inventory_item_sku" ON public.inventory_item USING btree (sku) WHERE (deleted_at IS NULL);


--
-- Name: IDX_inventory_level_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_inventory_level_deleted_at" ON public.inventory_level USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_inventory_level_inventory_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_inventory_level_inventory_item_id" ON public.inventory_level USING btree (inventory_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_inventory_level_location_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_inventory_level_location_id" ON public.inventory_level USING btree (location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_inventory_level_location_id_inventory_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_inventory_level_location_id_inventory_item_id" ON public.inventory_level USING btree (inventory_item_id, location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_invite_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_invite_deleted_at" ON public.invite USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_invite_email_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_invite_email_unique" ON public.invite USING btree (email) WHERE (deleted_at IS NULL);


--
-- Name: IDX_invite_id_-85069d44; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_invite_id_-85069d44" ON public.invite_rbac_role USING btree (invite_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_invite_token; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_invite_token" ON public.invite USING btree (token) WHERE (deleted_at IS NULL);


--
-- Name: IDX_line_item_adjustment_promotion_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_line_item_adjustment_promotion_id" ON public.cart_line_item_adjustment USING btree (promotion_id) WHERE ((deleted_at IS NULL) AND (promotion_id IS NOT NULL));


--
-- Name: IDX_line_item_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_line_item_product_id" ON public.cart_line_item USING btree (product_id) WHERE ((deleted_at IS NULL) AND (product_id IS NOT NULL));


--
-- Name: IDX_line_item_product_type_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_line_item_product_type_id" ON public.order_line_item USING btree (product_type_id) WHERE ((deleted_at IS NULL) AND (product_type_id IS NOT NULL));


--
-- Name: IDX_line_item_tax_line_tax_rate_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_line_item_tax_line_tax_rate_id" ON public.cart_line_item_tax_line USING btree (tax_rate_id) WHERE ((deleted_at IS NULL) AND (tax_rate_id IS NOT NULL));


--
-- Name: IDX_line_item_variant_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_line_item_variant_id" ON public.cart_line_item USING btree (variant_id) WHERE ((deleted_at IS NULL) AND (variant_id IS NOT NULL));


--
-- Name: IDX_message_conversation_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_message_conversation_id" ON public.message USING btree (conversation_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_message_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_message_deleted_at" ON public.message USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_notification_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_notification_deleted_at" ON public.notification USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_notification_idempotency_key_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_notification_idempotency_key_unique" ON public.notification USING btree (idempotency_key) WHERE (deleted_at IS NULL);


--
-- Name: IDX_notification_provider_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_notification_provider_deleted_at" ON public.notification_provider USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_notification_provider_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_notification_provider_id" ON public.notification USING btree (provider_id);


--
-- Name: IDX_notification_receiver_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_notification_receiver_id" ON public.notification USING btree (receiver_id);


--
-- Name: IDX_option_product_id_title_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_option_product_id_title_unique" ON public.product_option USING btree (product_id, title) WHERE (deleted_at IS NULL);


--
-- Name: IDX_option_value_option_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_option_value_option_id_unique" ON public.product_option_value USING btree (option_id, value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_address_customer_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_address_customer_id" ON public.order_address USING btree (customer_id);


--
-- Name: IDX_order_address_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_address_deleted_at" ON public.order_address USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_billing_address_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_billing_address_id" ON public."order" USING btree (billing_address_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_change_action_claim_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_claim_id" ON public.order_change_action USING btree (claim_id) WHERE ((claim_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_change_action_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_deleted_at" ON public.order_change_action USING btree (deleted_at);


--
-- Name: IDX_order_change_action_exchange_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_exchange_id" ON public.order_change_action USING btree (exchange_id) WHERE ((exchange_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_change_action_order_change_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_order_change_id" ON public.order_change_action USING btree (order_change_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_change_action_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_order_id" ON public.order_change_action USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_change_action_ordering; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_ordering" ON public.order_change_action USING btree (ordering) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_change_action_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_action_return_id" ON public.order_change_action USING btree (return_id) WHERE ((return_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_change_change_type; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_change_type" ON public.order_change USING btree (change_type);


--
-- Name: IDX_order_change_claim_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_claim_id" ON public.order_change USING btree (claim_id) WHERE ((claim_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_change_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_deleted_at" ON public.order_change USING btree (deleted_at);


--
-- Name: IDX_order_change_exchange_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_exchange_id" ON public.order_change USING btree (exchange_id) WHERE ((exchange_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_change_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_order_id" ON public.order_change USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_change_order_id_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_order_id_version" ON public.order_change USING btree (order_id, version);


--
-- Name: IDX_order_change_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_return_id" ON public.order_change USING btree (return_id) WHERE ((return_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_change_status; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_status" ON public.order_change USING btree (status) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_change_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_change_version" ON public.order_change USING btree (order_id, version) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_deleted_at" ON public.order_claim USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_display_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_display_id" ON public.order_claim USING btree (display_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_item_claim_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_item_claim_id" ON public.order_claim_item USING btree (claim_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_item_deleted_at" ON public.order_claim_item USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_item_image_claim_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_item_image_claim_item_id" ON public.order_claim_item_image USING btree (claim_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_item_image_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_item_image_deleted_at" ON public.order_claim_item_image USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_order_claim_item_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_item_item_id" ON public.order_claim_item USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_order_id" ON public.order_claim USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_claim_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_claim_return_id" ON public.order_claim USING btree (return_id) WHERE ((return_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_credit_line_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_credit_line_deleted_at" ON public.order_credit_line USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_order_credit_line_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_credit_line_order_id" ON public.order_credit_line USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_credit_line_order_id_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_credit_line_order_id_version" ON public.order_credit_line USING btree (order_id, version) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_currency_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_currency_code" ON public."order" USING btree (currency_code) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_custom_display_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_order_custom_display_id" ON public."order" USING btree (custom_display_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_customer_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_customer_id" ON public."order" USING btree (customer_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_deleted_at" ON public."order" USING btree (deleted_at);


--
-- Name: IDX_order_display_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_display_id" ON public."order" USING btree (display_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_deleted_at" ON public.order_exchange USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_display_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_display_id" ON public.order_exchange USING btree (display_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_item_deleted_at" ON public.order_exchange_item USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_item_exchange_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_item_exchange_id" ON public.order_exchange_item USING btree (exchange_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_item_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_item_item_id" ON public.order_exchange_item USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_order_id" ON public.order_exchange USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_exchange_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_exchange_return_id" ON public.order_exchange USING btree (return_id) WHERE ((return_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_id_-71069c16; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_id_-71069c16" ON public.order_cart USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_id_-71518339; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_id_-71518339" ON public.order_promotion USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_id_-e8d2543e; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_id_-e8d2543e" ON public.order_fulfillment USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_id_f42b9949; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_id_f42b9949" ON public.order_payment_collection USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_is_draft_order; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_is_draft_order" ON public."order" USING btree (is_draft_order) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_item_deleted_at" ON public.order_item USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_order_item_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_item_item_id" ON public.order_item USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_item_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_item_order_id" ON public.order_item USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_item_order_id_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_item_order_id_version" ON public.order_item USING btree (order_id, version) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_line_item_adjustment_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_line_item_adjustment_item_id" ON public.order_line_item_adjustment USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_line_item_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_line_item_product_id" ON public.order_line_item USING btree (product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_line_item_tax_line_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_line_item_tax_line_item_id" ON public.order_line_item_tax_line USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_line_item_variant_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_line_item_variant_id" ON public.order_line_item USING btree (variant_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_region_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_region_id" ON public."order" USING btree (region_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_sales_channel_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_sales_channel_id" ON public."order" USING btree (sales_channel_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_address_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_address_id" ON public."order" USING btree (shipping_address_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_claim_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_claim_id" ON public.order_shipping USING btree (claim_id) WHERE ((claim_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_shipping_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_deleted_at" ON public.order_shipping USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_order_shipping_exchange_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_exchange_id" ON public.order_shipping USING btree (exchange_id) WHERE ((exchange_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_shipping_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_item_id" ON public.order_shipping USING btree (shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_method_adjustment_shipping_method_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_method_adjustment_shipping_method_id" ON public.order_shipping_method_adjustment USING btree (shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_method_adjustment_version_shipping_method; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_order_shipping_method_adjustment_version_shipping_method" ON public.order_shipping_method_adjustment USING btree (version, shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_method_shipping_option_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_method_shipping_option_id" ON public.order_shipping_method USING btree (shipping_option_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_method_tax_line_shipping_method_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_method_tax_line_shipping_method_id" ON public.order_shipping_method_tax_line USING btree (shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_order_id" ON public.order_shipping USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_order_id_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_order_id_version" ON public.order_shipping USING btree (order_id, version) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_shipping_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_return_id" ON public.order_shipping USING btree (return_id) WHERE ((return_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_shipping_shipping_method_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_shipping_shipping_method_id" ON public.order_shipping USING btree (shipping_method_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_summary_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_summary_deleted_at" ON public.order_summary USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_order_summary_order_id_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_summary_order_id_version" ON public.order_summary USING btree (order_id, version) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_transaction_claim_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_claim_id" ON public.order_transaction USING btree (claim_id) WHERE ((claim_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_transaction_currency_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_currency_code" ON public.order_transaction USING btree (currency_code) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_transaction_exchange_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_exchange_id" ON public.order_transaction USING btree (exchange_id) WHERE ((exchange_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_order_transaction_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_order_id" ON public.order_transaction USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_transaction_order_id_version; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_order_id_version" ON public.order_transaction USING btree (order_id, version) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_transaction_reference_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_reference_id" ON public.order_transaction USING btree (reference_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_order_transaction_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_order_transaction_return_id" ON public.order_transaction USING btree (return_id) WHERE ((return_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_payment_collection_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_collection_deleted_at" ON public.payment_collection USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_payment_collection_id_-4a39f6c9; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_collection_id_-4a39f6c9" ON public.cart_payment_collection USING btree (payment_collection_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_collection_id_f42b9949; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_collection_id_f42b9949" ON public.order_payment_collection USING btree (payment_collection_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_deleted_at" ON public.payment USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_payment_payment_collection_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_payment_collection_id" ON public.payment USING btree (payment_collection_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_payment_session_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_payment_session_id" ON public.payment USING btree (payment_session_id);


--
-- Name: IDX_payment_payment_session_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_payment_payment_session_id_unique" ON public.payment USING btree (payment_session_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_provider_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_provider_deleted_at" ON public.payment_provider USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_provider_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_provider_id" ON public.payment USING btree (provider_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_provider_id_1c934dab0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_provider_id_1c934dab0" ON public.region_payment_provider USING btree (payment_provider_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_payment_session_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_session_deleted_at" ON public.payment_session USING btree (deleted_at);


--
-- Name: IDX_payment_session_payment_collection_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_payment_session_payment_collection_id" ON public.payment_session USING btree (payment_collection_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_currency_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_currency_code" ON public.price USING btree (currency_code) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_deleted_at" ON public.price USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_list_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_list_deleted_at" ON public.price_list USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_list_id_status_starts_at_ends_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_list_id_status_starts_at_ends_at" ON public.price_list USING btree (id, status, starts_at, ends_at) WHERE ((deleted_at IS NULL) AND (status = 'active'::text));


--
-- Name: IDX_price_list_rule_attribute; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_list_rule_attribute" ON public.price_list_rule USING btree (attribute) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_list_rule_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_list_rule_deleted_at" ON public.price_list_rule USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_list_rule_price_list_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_list_rule_price_list_id" ON public.price_list_rule USING btree (price_list_id) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_list_rule_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_list_rule_value" ON public.price_list_rule USING gin (value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_preference_attribute_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_price_preference_attribute_value" ON public.price_preference USING btree (attribute, value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_preference_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_preference_deleted_at" ON public.price_preference USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_price_list_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_price_list_id" ON public.price USING btree (price_list_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_price_set_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_price_set_id" ON public.price USING btree (price_set_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_rule_attribute; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_attribute" ON public.price_rule USING btree (attribute) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_rule_attribute_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_attribute_value" ON public.price_rule USING btree (attribute, value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_rule_attribute_value_price_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_attribute_value_price_id" ON public.price_rule USING btree (attribute, value, price_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_rule_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_deleted_at" ON public.price_rule USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_rule_operator; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_operator" ON public.price_rule USING btree (operator);


--
-- Name: IDX_price_rule_operator_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_operator_value" ON public.price_rule USING btree (operator, value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_rule_price_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_rule_price_id" ON public.price_rule USING btree (price_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_rule_price_id_attribute_operator_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_price_rule_price_id_attribute_operator_unique" ON public.price_rule USING btree (price_id, attribute, operator) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_set_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_set_deleted_at" ON public.price_set USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_price_set_id_52b23597; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_set_id_52b23597" ON public.product_variant_price_set USING btree (price_set_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_price_set_id_ba32fa9c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_price_set_id_ba32fa9c" ON public.shipping_option_price_set USING btree (price_set_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_category_parent_category_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_category_parent_category_id" ON public.product_category USING btree (parent_category_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_category_path; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_category_path" ON public.product_category USING btree (mpath) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_collection_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_collection_deleted_at" ON public.product_collection USING btree (deleted_at);


--
-- Name: IDX_product_collection_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_collection_id" ON public.product USING btree (collection_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_deleted_at" ON public.product USING btree (deleted_at);


--
-- Name: IDX_product_handle_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_product_handle_unique" ON public.product USING btree (handle) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_id_17a262437; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_id_17a262437" ON public.product_shipping_profile USING btree (product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_id_20b454295; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_id_20b454295" ON public.product_sales_channel USING btree (product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_image_rank; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_image_rank" ON public.image USING btree (rank) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_image_rank_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_image_rank_product_id" ON public.image USING btree (rank, product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_image_url; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_image_url" ON public.image USING btree (url) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_image_url_rank_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_image_url_rank_product_id" ON public.image USING btree (url, rank, product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_option_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_option_deleted_at" ON public.product_option USING btree (deleted_at);


--
-- Name: IDX_product_option_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_option_product_id" ON public.product_option USING btree (product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_option_value_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_option_value_deleted_at" ON public.product_option_value USING btree (deleted_at);


--
-- Name: IDX_product_option_value_option_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_option_value_option_id" ON public.product_option_value USING btree (option_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_status; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_status" ON public.product USING btree (status) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_tag_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_tag_deleted_at" ON public.product_tag USING btree (deleted_at);


--
-- Name: IDX_product_type_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_type_deleted_at" ON public.product_type USING btree (deleted_at);


--
-- Name: IDX_product_type_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_type_id" ON public.product USING btree (type_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_barcode_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_product_variant_barcode_unique" ON public.product_variant USING btree (barcode) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_variant_deleted_at" ON public.product_variant USING btree (deleted_at);


--
-- Name: IDX_product_variant_ean_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_product_variant_ean_unique" ON public.product_variant USING btree (ean) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_id_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_variant_id_product_id" ON public.product_variant USING btree (id, product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_product_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_variant_product_id" ON public.product_variant USING btree (product_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_product_image_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_variant_product_image_deleted_at" ON public.product_variant_product_image USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_product_image_image_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_variant_product_image_image_id" ON public.product_variant_product_image USING btree (image_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_product_image_variant_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_product_variant_product_image_variant_id" ON public.product_variant_product_image USING btree (variant_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_sku_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_product_variant_sku_unique" ON public.product_variant USING btree (sku) WHERE (deleted_at IS NULL);


--
-- Name: IDX_product_variant_upc_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_product_variant_upc_unique" ON public.product_variant USING btree (upc) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_application_method_currency_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_application_method_currency_code" ON public.promotion_application_method USING btree (currency_code) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_promotion_application_method_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_application_method_deleted_at" ON public.promotion_application_method USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_application_method_promotion_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_promotion_application_method_promotion_id_unique" ON public.promotion_application_method USING btree (promotion_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_budget_campaign_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_promotion_campaign_budget_campaign_id_unique" ON public.promotion_campaign_budget USING btree (campaign_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_budget_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_campaign_budget_deleted_at" ON public.promotion_campaign_budget USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_budget_usage_attribute_value_budget_id_u; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_promotion_campaign_budget_usage_attribute_value_budget_id_u" ON public.promotion_campaign_budget_usage USING btree (attribute_value, budget_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_budget_usage_budget_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_campaign_budget_usage_budget_id" ON public.promotion_campaign_budget_usage USING btree (budget_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_budget_usage_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_campaign_budget_usage_deleted_at" ON public.promotion_campaign_budget_usage USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_campaign_identifier_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_promotion_campaign_campaign_identifier_unique" ON public.promotion_campaign USING btree (campaign_identifier) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_campaign_deleted_at" ON public.promotion_campaign USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_campaign_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_campaign_id" ON public.promotion USING btree (campaign_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_deleted_at" ON public.promotion USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_id_-71518339; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_id_-71518339" ON public.order_promotion USING btree (promotion_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_id_-a9d4a70b; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_id_-a9d4a70b" ON public.cart_promotion USING btree (promotion_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_is_automatic; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_is_automatic" ON public.promotion USING btree (is_automatic) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_attribute; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_attribute" ON public.promotion_rule USING btree (attribute);


--
-- Name: IDX_promotion_rule_attribute_operator; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_attribute_operator" ON public.promotion_rule USING btree (attribute, operator) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_attribute_operator_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_attribute_operator_id" ON public.promotion_rule USING btree (operator, attribute, id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_deleted_at" ON public.promotion_rule USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_operator; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_operator" ON public.promotion_rule USING btree (operator);


--
-- Name: IDX_promotion_rule_value_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_value_deleted_at" ON public.promotion_rule_value USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_value_promotion_rule_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_value_promotion_rule_id" ON public.promotion_rule_value USING btree (promotion_rule_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_value_rule_id_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_value_rule_id_value" ON public.promotion_rule_value USING btree (promotion_rule_id, value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_rule_value_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_rule_value_value" ON public.promotion_rule_value USING btree (value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_status; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_status" ON public.promotion USING btree (status) WHERE (deleted_at IS NULL);


--
-- Name: IDX_promotion_type; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_promotion_type" ON public.promotion USING btree (type);


--
-- Name: IDX_property_label_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_property_label_deleted_at" ON public.property_label USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_property_label_entity; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_property_label_entity" ON public.property_label USING btree (entity) WHERE (deleted_at IS NULL);


--
-- Name: IDX_property_label_entity_property_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_property_label_entity_property_unique" ON public.property_label USING btree (entity, property) WHERE (deleted_at IS NULL);


--
-- Name: IDX_provider_identity_auth_identity_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_provider_identity_auth_identity_id" ON public.provider_identity USING btree (auth_identity_id);


--
-- Name: IDX_provider_identity_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_provider_identity_deleted_at" ON public.provider_identity USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_provider_identity_provider_entity_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_provider_identity_provider_entity_id" ON public.provider_identity USING btree (entity_id, provider);


--
-- Name: IDX_publishable_key_id_-1d67bae40; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_publishable_key_id_-1d67bae40" ON public.publishable_api_key_sales_channel USING btree (publishable_key_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_rbac_role_id_-85069d44; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_rbac_role_id_-85069d44" ON public.invite_rbac_role USING btree (rbac_role_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_rbac_role_id_64ff0c4c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_rbac_role_id_64ff0c4c" ON public.user_rbac_role USING btree (rbac_role_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_refund_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_refund_deleted_at" ON public.refund USING btree (deleted_at);


--
-- Name: IDX_refund_payment_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_refund_payment_id" ON public.refund USING btree (payment_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_refund_reason_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_refund_reason_deleted_at" ON public.refund_reason USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_refund_refund_reason_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_refund_refund_reason_id" ON public.refund USING btree (refund_reason_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_region_country_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_region_country_deleted_at" ON public.region_country USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_region_country_region_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_region_country_region_id" ON public.region_country USING btree (region_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_region_country_region_id_iso_2_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_region_country_region_id_iso_2_unique" ON public.region_country USING btree (region_id, iso_2);


--
-- Name: IDX_region_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_region_deleted_at" ON public.region USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_region_id_1c934dab0; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_region_id_1c934dab0" ON public.region_payment_provider USING btree (region_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_reservation_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_reservation_item_deleted_at" ON public.reservation_item USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_reservation_item_inventory_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_reservation_item_inventory_item_id" ON public.reservation_item USING btree (inventory_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_reservation_item_line_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_reservation_item_line_item_id" ON public.reservation_item USING btree (line_item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_reservation_item_location_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_reservation_item_location_id" ON public.reservation_item USING btree (location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_claim_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_claim_id" ON public.return USING btree (claim_id) WHERE ((claim_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_return_display_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_display_id" ON public.return USING btree (display_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_exchange_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_exchange_id" ON public.return USING btree (exchange_id) WHERE ((exchange_id IS NOT NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_return_id_-31ea43a; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_id_-31ea43a" ON public.return_fulfillment USING btree (return_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_item_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_item_deleted_at" ON public.return_item USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_item_item_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_item_item_id" ON public.return_item USING btree (item_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_item_reason_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_item_reason_id" ON public.return_item USING btree (reason_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_item_return_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_item_return_id" ON public.return_item USING btree (return_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_order_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_order_id" ON public.return USING btree (order_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_reason_parent_return_reason_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_reason_parent_return_reason_id" ON public.return_reason USING btree (parent_return_reason_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_return_reason_value; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_return_reason_value" ON public.return_reason USING btree (value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_sales_channel_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_sales_channel_deleted_at" ON public.sales_channel USING btree (deleted_at);


--
-- Name: IDX_sales_channel_id_-1d67bae40; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_sales_channel_id_-1d67bae40" ON public.publishable_api_key_sales_channel USING btree (sales_channel_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_sales_channel_id_20b454295; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_sales_channel_id_20b454295" ON public.product_sales_channel USING btree (sales_channel_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_sales_channel_id_26d06f470; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_sales_channel_id_26d06f470" ON public.sales_channel_stock_location USING btree (sales_channel_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_service_zone_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_service_zone_deleted_at" ON public.service_zone USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_service_zone_fulfillment_set_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_service_zone_fulfillment_set_id" ON public.service_zone USING btree (fulfillment_set_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_service_zone_name_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_service_zone_name_unique" ON public.service_zone USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_method_adjustment_promotion_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_method_adjustment_promotion_id" ON public.cart_shipping_method_adjustment USING btree (promotion_id) WHERE ((deleted_at IS NULL) AND (promotion_id IS NOT NULL));


--
-- Name: IDX_shipping_method_option_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_method_option_id" ON public.cart_shipping_method USING btree (shipping_option_id) WHERE ((deleted_at IS NULL) AND (shipping_option_id IS NOT NULL));


--
-- Name: IDX_shipping_method_tax_line_tax_rate_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_method_tax_line_tax_rate_id" ON public.cart_shipping_method_tax_line USING btree (tax_rate_id) WHERE ((deleted_at IS NULL) AND (tax_rate_id IS NOT NULL));


--
-- Name: IDX_shipping_option_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_deleted_at" ON public.shipping_option USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_shipping_option_id_ba32fa9c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_id_ba32fa9c" ON public.shipping_option_price_set USING btree (shipping_option_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_option_provider_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_provider_id" ON public.shipping_option USING btree (provider_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_option_rule_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_rule_deleted_at" ON public.shipping_option_rule USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_shipping_option_rule_shipping_option_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_rule_shipping_option_id" ON public.shipping_option_rule USING btree (shipping_option_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_option_service_zone_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_service_zone_id" ON public.shipping_option USING btree (service_zone_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_option_shipping_option_type_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_shipping_option_type_id" ON public.shipping_option USING btree (shipping_option_type_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_option_shipping_profile_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_shipping_profile_id" ON public.shipping_option USING btree (shipping_profile_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_option_type_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_option_type_deleted_at" ON public.shipping_option_type USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_shipping_profile_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_profile_deleted_at" ON public.shipping_profile USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_shipping_profile_id_17a262437; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_shipping_profile_id_17a262437" ON public.product_shipping_profile USING btree (shipping_profile_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_shipping_profile_name_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_shipping_profile_name_unique" ON public.shipping_profile USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: IDX_single_default_region; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_single_default_region" ON public.tax_rate USING btree (tax_region_id) WHERE ((is_default = true) AND (deleted_at IS NULL));


--
-- Name: IDX_stock_location_address_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_stock_location_address_deleted_at" ON public.stock_location_address USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_stock_location_address_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_stock_location_address_id_unique" ON public.stock_location USING btree (address_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_stock_location_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_stock_location_deleted_at" ON public.stock_location USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_stock_location_id_-1e5992737; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_stock_location_id_-1e5992737" ON public.location_fulfillment_provider USING btree (stock_location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_stock_location_id_-e88adb96; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_stock_location_id_-e88adb96" ON public.location_fulfillment_set USING btree (stock_location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_stock_location_id_26d06f470; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_stock_location_id_26d06f470" ON public.sales_channel_stock_location USING btree (stock_location_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_store_currency_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_store_currency_deleted_at" ON public.store_currency USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_store_currency_store_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_store_currency_store_id" ON public.store_currency USING btree (store_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_store_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_store_deleted_at" ON public.store USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_store_locale_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_store_locale_deleted_at" ON public.store_locale USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_store_locale_store_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_store_locale_store_id" ON public.store_locale USING btree (store_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tag_value_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_tag_value_unique" ON public.product_tag USING btree (value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_provider_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_provider_deleted_at" ON public.tax_provider USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_rate_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_rate_deleted_at" ON public.tax_rate USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_tax_rate_rule_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_rate_rule_deleted_at" ON public.tax_rate_rule USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_tax_rate_rule_reference_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_rate_rule_reference_id" ON public.tax_rate_rule USING btree (reference_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_rate_rule_tax_rate_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_rate_rule_tax_rate_id" ON public.tax_rate_rule USING btree (tax_rate_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_rate_rule_unique_rate_reference; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_tax_rate_rule_unique_rate_reference" ON public.tax_rate_rule USING btree (tax_rate_id, reference_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_rate_tax_region_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_rate_tax_region_id" ON public.tax_rate USING btree (tax_region_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_region_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_region_deleted_at" ON public.tax_region USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_tax_region_parent_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_region_parent_id" ON public.tax_region USING btree (parent_id);


--
-- Name: IDX_tax_region_provider_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_tax_region_provider_id" ON public.tax_region USING btree (provider_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_tax_region_unique_country_nullable_province; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_tax_region_unique_country_nullable_province" ON public.tax_region USING btree (country_code) WHERE ((province_code IS NULL) AND (deleted_at IS NULL));


--
-- Name: IDX_tax_region_unique_country_province; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_tax_region_unique_country_province" ON public.tax_region USING btree (country_code, province_code) WHERE (deleted_at IS NULL);


--
-- Name: IDX_type_value_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_type_value_unique" ON public.product_type USING btree (value) WHERE (deleted_at IS NULL);


--
-- Name: IDX_unique_promotion_code; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_unique_promotion_code" ON public.promotion USING btree (code) WHERE (deleted_at IS NULL);


--
-- Name: IDX_user_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_user_deleted_at" ON public."user" USING btree (deleted_at) WHERE (deleted_at IS NOT NULL);


--
-- Name: IDX_user_email_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_user_email_unique" ON public."user" USING btree (email) WHERE (deleted_at IS NULL);


--
-- Name: IDX_user_id_64ff0c4c; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_user_id_64ff0c4c" ON public.user_rbac_role USING btree (user_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_user_preference_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_user_preference_deleted_at" ON public.user_preference USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_user_preference_user_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_user_preference_user_id" ON public.user_preference USING btree (user_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_user_preference_user_id_key_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_user_preference_user_id_key_unique" ON public.user_preference USING btree (user_id, key) WHERE (deleted_at IS NULL);


--
-- Name: IDX_variant_id_17b4c4e35; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_variant_id_17b4c4e35" ON public.product_variant_inventory_item USING btree (variant_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_variant_id_52b23597; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_variant_id_52b23597" ON public.product_variant_price_set USING btree (variant_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_view_configuration_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_view_configuration_deleted_at" ON public.view_configuration USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_view_configuration_entity_is_system_default; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_view_configuration_entity_is_system_default" ON public.view_configuration USING btree (entity, is_system_default) WHERE (deleted_at IS NULL);


--
-- Name: IDX_view_configuration_entity_user_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_view_configuration_entity_user_id" ON public.view_configuration USING btree (entity, user_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_view_configuration_user_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_view_configuration_user_id" ON public.view_configuration USING btree (user_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_visualizer_result_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_visualizer_result_deleted_at" ON public.visualizer_result USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_deleted_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_deleted_at" ON public.workflow_execution USING btree (deleted_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_id" ON public.workflow_execution USING btree (id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_retention_time_updated_at_state; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_retention_time_updated_at_state" ON public.workflow_execution USING btree (retention_time, updated_at, state) WHERE ((deleted_at IS NULL) AND (retention_time IS NOT NULL));


--
-- Name: IDX_workflow_execution_run_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_run_id" ON public.workflow_execution USING btree (run_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_state; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_state" ON public.workflow_execution USING btree (state) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_state_updated_at; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_state_updated_at" ON public.workflow_execution USING btree (state, updated_at) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_transaction_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_transaction_id" ON public.workflow_execution USING btree (transaction_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_updated_at_retention_time; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_updated_at_retention_time" ON public.workflow_execution USING btree (updated_at, retention_time) WHERE ((deleted_at IS NULL) AND (retention_time IS NOT NULL) AND ((state)::text = ANY ((ARRAY['done'::character varying, 'failed'::character varying, 'reverted'::character varying])::text[])));


--
-- Name: IDX_workflow_execution_workflow_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_workflow_id" ON public.workflow_execution USING btree (workflow_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_workflow_id_transaction_id; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE INDEX "IDX_workflow_execution_workflow_id_transaction_id" ON public.workflow_execution USING btree (workflow_id, transaction_id) WHERE (deleted_at IS NULL);


--
-- Name: IDX_workflow_execution_workflow_id_transaction_id_run_id_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX "IDX_workflow_execution_workflow_id_transaction_id_run_id_unique" ON public.workflow_execution USING btree (workflow_id, transaction_id, run_id) WHERE (deleted_at IS NULL);


--
-- Name: idx_script_name_unique; Type: INDEX; Schema: public; Owner: rizwan
--

CREATE UNIQUE INDEX idx_script_name_unique ON public.script_migrations USING btree (script_name);


--
-- Name: tax_rate_rule FK_tax_rate_rule_tax_rate_id; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_rate_rule
    ADD CONSTRAINT "FK_tax_rate_rule_tax_rate_id" FOREIGN KEY (tax_rate_id) REFERENCES public.tax_rate(id) ON DELETE CASCADE;


--
-- Name: tax_rate FK_tax_rate_tax_region_id; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_rate
    ADD CONSTRAINT "FK_tax_rate_tax_region_id" FOREIGN KEY (tax_region_id) REFERENCES public.tax_region(id) ON DELETE CASCADE;


--
-- Name: tax_region FK_tax_region_parent_id; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_region
    ADD CONSTRAINT "FK_tax_region_parent_id" FOREIGN KEY (parent_id) REFERENCES public.tax_region(id) ON DELETE CASCADE;


--
-- Name: tax_region FK_tax_region_provider_id; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.tax_region
    ADD CONSTRAINT "FK_tax_region_provider_id" FOREIGN KEY (provider_id) REFERENCES public.tax_provider(id) ON DELETE SET NULL;


--
-- Name: application_method_buy_rules application_method_buy_rules_application_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.application_method_buy_rules
    ADD CONSTRAINT application_method_buy_rules_application_method_id_foreign FOREIGN KEY (application_method_id) REFERENCES public.promotion_application_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_method_buy_rules application_method_buy_rules_promotion_rule_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.application_method_buy_rules
    ADD CONSTRAINT application_method_buy_rules_promotion_rule_id_foreign FOREIGN KEY (promotion_rule_id) REFERENCES public.promotion_rule(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_method_target_rules application_method_target_rules_application_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.application_method_target_rules
    ADD CONSTRAINT application_method_target_rules_application_method_id_foreign FOREIGN KEY (application_method_id) REFERENCES public.promotion_application_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application_method_target_rules application_method_target_rules_promotion_rule_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.application_method_target_rules
    ADD CONSTRAINT application_method_target_rules_promotion_rule_id_foreign FOREIGN KEY (promotion_rule_id) REFERENCES public.promotion_rule(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: capture capture_payment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.capture
    ADD CONSTRAINT capture_payment_id_foreign FOREIGN KEY (payment_id) REFERENCES public.payment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart cart_billing_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_billing_address_id_foreign FOREIGN KEY (billing_address_id) REFERENCES public.cart_address(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cart_line_item_adjustment cart_line_item_adjustment_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_line_item_adjustment
    ADD CONSTRAINT cart_line_item_adjustment_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.cart_line_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_line_item cart_line_item_cart_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_line_item
    ADD CONSTRAINT cart_line_item_cart_id_foreign FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_line_item_tax_line cart_line_item_tax_line_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_line_item_tax_line
    ADD CONSTRAINT cart_line_item_tax_line_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.cart_line_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart cart_shipping_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_shipping_address_id_foreign FOREIGN KEY (shipping_address_id) REFERENCES public.cart_address(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cart_shipping_method_adjustment cart_shipping_method_adjustment_shipping_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_shipping_method_adjustment
    ADD CONSTRAINT cart_shipping_method_adjustment_shipping_method_id_foreign FOREIGN KEY (shipping_method_id) REFERENCES public.cart_shipping_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_shipping_method cart_shipping_method_cart_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_shipping_method
    ADD CONSTRAINT cart_shipping_method_cart_id_foreign FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_shipping_method_tax_line cart_shipping_method_tax_line_shipping_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.cart_shipping_method_tax_line
    ADD CONSTRAINT cart_shipping_method_tax_line_shipping_method_id_foreign FOREIGN KEY (shipping_method_id) REFERENCES public.cart_shipping_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: credit_line credit_line_cart_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.credit_line
    ADD CONSTRAINT credit_line_cart_id_foreign FOREIGN KEY (cart_id) REFERENCES public.cart(id) ON UPDATE CASCADE;


--
-- Name: customer_address customer_address_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_address
    ADD CONSTRAINT customer_address_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: customer_group_customer customer_group_customer_customer_group_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_group_customer
    ADD CONSTRAINT customer_group_customer_customer_group_id_foreign FOREIGN KEY (customer_group_id) REFERENCES public.customer_group(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: customer_group_customer customer_group_customer_customer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.customer_group_customer
    ADD CONSTRAINT customer_group_customer_customer_id_foreign FOREIGN KEY (customer_id) REFERENCES public.customer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fulfillment fulfillment_delivery_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment
    ADD CONSTRAINT fulfillment_delivery_address_id_foreign FOREIGN KEY (delivery_address_id) REFERENCES public.fulfillment_address(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: fulfillment_item fulfillment_item_fulfillment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_item
    ADD CONSTRAINT fulfillment_item_fulfillment_id_foreign FOREIGN KEY (fulfillment_id) REFERENCES public.fulfillment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fulfillment_label fulfillment_label_fulfillment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment_label
    ADD CONSTRAINT fulfillment_label_fulfillment_id_foreign FOREIGN KEY (fulfillment_id) REFERENCES public.fulfillment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: fulfillment fulfillment_provider_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment
    ADD CONSTRAINT fulfillment_provider_id_foreign FOREIGN KEY (provider_id) REFERENCES public.fulfillment_provider(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: fulfillment fulfillment_shipping_option_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.fulfillment
    ADD CONSTRAINT fulfillment_shipping_option_id_foreign FOREIGN KEY (shipping_option_id) REFERENCES public.shipping_option(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: geo_zone geo_zone_service_zone_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.geo_zone
    ADD CONSTRAINT geo_zone_service_zone_id_foreign FOREIGN KEY (service_zone_id) REFERENCES public.service_zone(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: image image_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventory_level inventory_level_inventory_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.inventory_level
    ADD CONSTRAINT inventory_level_inventory_item_id_foreign FOREIGN KEY (inventory_item_id) REFERENCES public.inventory_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: message message_conversation_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_conversation_id_foreign FOREIGN KEY (conversation_id) REFERENCES public.conversation(id) ON UPDATE CASCADE;


--
-- Name: notification notification_provider_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_provider_id_foreign FOREIGN KEY (provider_id) REFERENCES public.notification_provider(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: order order_billing_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_billing_address_id_foreign FOREIGN KEY (billing_address_id) REFERENCES public.order_address(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: order_change_action order_change_action_order_change_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_change_action
    ADD CONSTRAINT order_change_action_order_change_id_foreign FOREIGN KEY (order_change_id) REFERENCES public.order_change(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_change order_change_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_change
    ADD CONSTRAINT order_change_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_credit_line order_credit_line_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_credit_line
    ADD CONSTRAINT order_credit_line_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_item order_item_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.order_line_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_item order_item_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_line_item_adjustment order_line_item_adjustment_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_line_item_adjustment
    ADD CONSTRAINT order_line_item_adjustment_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.order_line_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_line_item_tax_line order_line_item_tax_line_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_line_item_tax_line
    ADD CONSTRAINT order_line_item_tax_line_item_id_foreign FOREIGN KEY (item_id) REFERENCES public.order_line_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_line_item order_line_item_totals_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_line_item
    ADD CONSTRAINT order_line_item_totals_id_foreign FOREIGN KEY (totals_id) REFERENCES public.order_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order order_shipping_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_shipping_address_id_foreign FOREIGN KEY (shipping_address_id) REFERENCES public.order_address(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: order_shipping_method_adjustment order_shipping_method_adjustment_shipping_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping_method_adjustment
    ADD CONSTRAINT order_shipping_method_adjustment_shipping_method_id_foreign FOREIGN KEY (shipping_method_id) REFERENCES public.order_shipping_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_shipping_method_tax_line order_shipping_method_tax_line_shipping_method_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping_method_tax_line
    ADD CONSTRAINT order_shipping_method_tax_line_shipping_method_id_foreign FOREIGN KEY (shipping_method_id) REFERENCES public.order_shipping_method(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_shipping order_shipping_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_shipping
    ADD CONSTRAINT order_shipping_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_summary order_summary_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_summary
    ADD CONSTRAINT order_summary_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_transaction order_transaction_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.order_transaction
    ADD CONSTRAINT order_transaction_order_id_foreign FOREIGN KEY (order_id) REFERENCES public."order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_collection_payment_providers payment_collection_payment_providers_payment_col_aa276_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_collection_payment_providers
    ADD CONSTRAINT payment_collection_payment_providers_payment_col_aa276_foreign FOREIGN KEY (payment_collection_id) REFERENCES public.payment_collection(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_collection_payment_providers payment_collection_payment_providers_payment_pro_2d555_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_collection_payment_providers
    ADD CONSTRAINT payment_collection_payment_providers_payment_pro_2d555_foreign FOREIGN KEY (payment_provider_id) REFERENCES public.payment_provider(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment payment_payment_collection_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_payment_collection_id_foreign FOREIGN KEY (payment_collection_id) REFERENCES public.payment_collection(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment_session payment_session_payment_collection_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.payment_session
    ADD CONSTRAINT payment_session_payment_collection_id_foreign FOREIGN KEY (payment_collection_id) REFERENCES public.payment_collection(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_list_rule price_list_rule_price_list_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_list_rule
    ADD CONSTRAINT price_list_rule_price_list_id_foreign FOREIGN KEY (price_list_id) REFERENCES public.price_list(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price price_price_list_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_price_list_id_foreign FOREIGN KEY (price_list_id) REFERENCES public.price_list(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price price_price_set_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price
    ADD CONSTRAINT price_price_set_id_foreign FOREIGN KEY (price_set_id) REFERENCES public.price_set(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: price_rule price_rule_price_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.price_rule
    ADD CONSTRAINT price_rule_price_id_foreign FOREIGN KEY (price_id) REFERENCES public.price(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_category product_category_parent_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_parent_category_id_foreign FOREIGN KEY (parent_category_id) REFERENCES public.product_category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_category_product product_category_product_product_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_category_product
    ADD CONSTRAINT product_category_product_product_category_id_foreign FOREIGN KEY (product_category_id) REFERENCES public.product_category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_category_product product_category_product_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_category_product
    ADD CONSTRAINT product_category_product_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product product_collection_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_collection_id_foreign FOREIGN KEY (collection_id) REFERENCES public.product_collection(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: product_option product_option_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_option
    ADD CONSTRAINT product_option_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_option_value product_option_value_option_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_option_value
    ADD CONSTRAINT product_option_value_option_id_foreign FOREIGN KEY (option_id) REFERENCES public.product_option(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_tags product_tags_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_tags product_tags_product_tag_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_tags
    ADD CONSTRAINT product_tags_product_tag_id_foreign FOREIGN KEY (product_tag_id) REFERENCES public.product_tag(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product product_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_type_id_foreign FOREIGN KEY (type_id) REFERENCES public.product_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: product_variant_option product_variant_option_option_value_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_option
    ADD CONSTRAINT product_variant_option_option_value_id_foreign FOREIGN KEY (option_value_id) REFERENCES public.product_option_value(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_variant_option product_variant_option_variant_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_option
    ADD CONSTRAINT product_variant_option_variant_id_foreign FOREIGN KEY (variant_id) REFERENCES public.product_variant(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_variant product_variant_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant
    ADD CONSTRAINT product_variant_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_variant_product_image product_variant_product_image_image_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.product_variant_product_image
    ADD CONSTRAINT product_variant_product_image_image_id_foreign FOREIGN KEY (image_id) REFERENCES public.image(id) ON DELETE CASCADE;


--
-- Name: promotion_application_method promotion_application_method_promotion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_application_method
    ADD CONSTRAINT promotion_application_method_promotion_id_foreign FOREIGN KEY (promotion_id) REFERENCES public.promotion(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: promotion_campaign_budget promotion_campaign_budget_campaign_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_campaign_budget
    ADD CONSTRAINT promotion_campaign_budget_campaign_id_foreign FOREIGN KEY (campaign_id) REFERENCES public.promotion_campaign(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: promotion_campaign_budget_usage promotion_campaign_budget_usage_budget_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_campaign_budget_usage
    ADD CONSTRAINT promotion_campaign_budget_usage_budget_id_foreign FOREIGN KEY (budget_id) REFERENCES public.promotion_campaign_budget(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: promotion promotion_campaign_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion
    ADD CONSTRAINT promotion_campaign_id_foreign FOREIGN KEY (campaign_id) REFERENCES public.promotion_campaign(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: promotion_promotion_rule promotion_promotion_rule_promotion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_promotion_rule
    ADD CONSTRAINT promotion_promotion_rule_promotion_id_foreign FOREIGN KEY (promotion_id) REFERENCES public.promotion(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: promotion_promotion_rule promotion_promotion_rule_promotion_rule_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_promotion_rule
    ADD CONSTRAINT promotion_promotion_rule_promotion_rule_id_foreign FOREIGN KEY (promotion_rule_id) REFERENCES public.promotion_rule(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: promotion_rule_value promotion_rule_value_promotion_rule_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.promotion_rule_value
    ADD CONSTRAINT promotion_rule_value_promotion_rule_id_foreign FOREIGN KEY (promotion_rule_id) REFERENCES public.promotion_rule(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: provider_identity provider_identity_auth_identity_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.provider_identity
    ADD CONSTRAINT provider_identity_auth_identity_id_foreign FOREIGN KEY (auth_identity_id) REFERENCES public.auth_identity(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refund refund_payment_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.refund
    ADD CONSTRAINT refund_payment_id_foreign FOREIGN KEY (payment_id) REFERENCES public.payment(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: region_country region_country_region_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.region_country
    ADD CONSTRAINT region_country_region_id_foreign FOREIGN KEY (region_id) REFERENCES public.region(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: reservation_item reservation_item_inventory_item_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.reservation_item
    ADD CONSTRAINT reservation_item_inventory_item_id_foreign FOREIGN KEY (inventory_item_id) REFERENCES public.inventory_item(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: return_reason return_reason_parent_return_reason_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.return_reason
    ADD CONSTRAINT return_reason_parent_return_reason_id_foreign FOREIGN KEY (parent_return_reason_id) REFERENCES public.return_reason(id);


--
-- Name: service_zone service_zone_fulfillment_set_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.service_zone
    ADD CONSTRAINT service_zone_fulfillment_set_id_foreign FOREIGN KEY (fulfillment_set_id) REFERENCES public.fulfillment_set(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shipping_option shipping_option_provider_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option
    ADD CONSTRAINT shipping_option_provider_id_foreign FOREIGN KEY (provider_id) REFERENCES public.fulfillment_provider(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: shipping_option_rule shipping_option_rule_shipping_option_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option_rule
    ADD CONSTRAINT shipping_option_rule_shipping_option_id_foreign FOREIGN KEY (shipping_option_id) REFERENCES public.shipping_option(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shipping_option shipping_option_service_zone_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option
    ADD CONSTRAINT shipping_option_service_zone_id_foreign FOREIGN KEY (service_zone_id) REFERENCES public.service_zone(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: shipping_option shipping_option_shipping_option_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option
    ADD CONSTRAINT shipping_option_shipping_option_type_id_foreign FOREIGN KEY (shipping_option_type_id) REFERENCES public.shipping_option_type(id) ON UPDATE CASCADE;


--
-- Name: shipping_option shipping_option_shipping_profile_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.shipping_option
    ADD CONSTRAINT shipping_option_shipping_profile_id_foreign FOREIGN KEY (shipping_profile_id) REFERENCES public.shipping_profile(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: stock_location stock_location_address_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.stock_location
    ADD CONSTRAINT stock_location_address_id_foreign FOREIGN KEY (address_id) REFERENCES public.stock_location_address(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: store_currency store_currency_store_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.store_currency
    ADD CONSTRAINT store_currency_store_id_foreign FOREIGN KEY (store_id) REFERENCES public.store(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: store_locale store_locale_store_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: rizwan
--

ALTER TABLE ONLY public.store_locale
    ADD CONSTRAINT store_locale_store_id_foreign FOREIGN KEY (store_id) REFERENCES public.store(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict RWgp3iRneqXkVtH2dO47kcGHPlsNSPpFBU8sCuFVLhfDy9OU9XYNXvunSzqNpMX

