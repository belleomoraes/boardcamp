--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    cpf character varying(11) NOT NULL,
    birthday date NOT NULL
);


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name text NOT NULL,
    image text NOT NULL,
    "stockTotal" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "pricePerDay" integer NOT NULL
);


--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: rentals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rentals (
    id integer NOT NULL,
    "customerId" integer NOT NULL,
    "gameId" integer NOT NULL,
    "rentDate" date NOT NULL,
    "daysRented" integer NOT NULL,
    "returnDate" date,
    "originalPrice" integer NOT NULL,
    "delayFee" integer
);


--
-- Name: rentals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rentals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rentals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rentals_id_seq OWNED BY public.rentals.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: rentals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals ALTER COLUMN id SET DEFAULT nextval('public.rentals_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'Investigação');
INSERT INTO public.categories VALUES (2, 'Investigação');
INSERT INTO public.categories VALUES (3, 'Investigação');
INSERT INTO public.categories VALUES (4, 'Estratégia');
INSERT INTO public.categories VALUES (5, 'Estratégia');
INSERT INTO public.categories VALUES (6, 'Infantil');


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.customers VALUES (2, 'Lala', '21998899222', '01234567790', '1992-10-05');
INSERT INTO public.customers VALUES (3, 'Teste Birthday', '21998899283', '01234567700', '1992-10-05');
INSERT INTO public.customers VALUES (4, 'Teste Birthday', '21998899283', '01234567706', '1994-05-08');
INSERT INTO public.customers VALUES (5, 'Teste validação phone', '2199889922', '01234567899', '1992-10-05');
INSERT INTO public.customers VALUES (6, 'Teste validação phone', '2199889923', '01234567897', '1992-10-05');
INSERT INTO public.customers VALUES (7, 'Teste validação phone', '11111111111', '01234567893', '1992-10-05');
INSERT INTO public.customers VALUES (8, 'Teste validação phone', '11111111111', '01234767893', '2022-05-08');
INSERT INTO public.customers VALUES (9, 'Teste validação data', '11111111111', '01234765893', '2022-05-08');
INSERT INTO public.customers VALUES (10, 'João Alfredo', '21998899222', '01234567798', '1992-10-05');
INSERT INTO public.customers VALUES (11, 'Belle', '21998899222', '01234567890', '1992-10-05');
INSERT INTO public.customers VALUES (1, 'Ble', '21998899222', '01234567870', '1992-10-05');


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.games VALUES (2, 'Banco Imobiliário', 'http://imagem.img.com.br', 3, 1, 1500);
INSERT INTO public.games VALUES (1, 'Banco imobiliario', 'http://laalla.jpg', 3, 1, 1500);
INSERT INTO public.games VALUES (3, 'Detetive', 'http://imagem.img.com.br', 1, 1, 1500);


--
-- Data for Name: rentals; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.rentals VALUES (1, 1, 1, '2022-10-01', 3, '2022-10-02', 4500, 1);
INSERT INTO public.rentals VALUES (3, 3, 1, '2022-10-02', 2, '2022-10-02', 3000, 0);
INSERT INTO public.rentals VALUES (5, 5, 1, '2022-10-02', 2, '2022-10-02', 3000, 0);
INSERT INTO public.rentals VALUES (4, 4, 1, '2022-10-02', 2, '2022-10-02', 3000, 0);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.customers_id_seq', 11, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.games_id_seq', 3, true);


--
-- Name: rentals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rentals_id_seq', 5, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: rentals rentals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rentals
    ADD CONSTRAINT rentals_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

