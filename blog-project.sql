--
-- PostgreSQL database dump
--

\restrict wVxaF1NfmoG2HL6pGuSJFkjt08JFzykZ8vSg4FDeynJPJkKkWAZkBUdoomIRI2S

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    account_id character varying(255) NOT NULL,
    provider_id character varying(255) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(512) NOT NULL,
    slug character varying(255) NOT NULL,
    content text NOT NULL,
    author_id character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    token character varying(255),
    expires_at timestamp without time zone NOT NULL,
    ip_address character varying(255) NOT NULL,
    user_agent text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	b2c362e3cac26c6b98c2ccf384a31197a2336ca016293adcadb9dab544a09abe	1763394267822
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (id, user_id, account_id, provider_id, password, created_at, updated_at) FROM stdin;
XcRoDJCseBwpxoGCVoMi8Zsc3mEbOnDG	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	credential	da901027a50d890e5b0042cb9252c0f5:f8171aea3a4a6673df13fa306b3108165dd846f53cd27a3640fedc9c574f1778daaa39eb54a8e0c9b2bd67966681b854e0b2a332cea71a69f325f83123ea6eaa	2025-11-17 17:05:27.84	2025-11-17 17:05:27.84
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, title, description, slug, content, author_id, created_at, updated_at) FROM stdin;
bf6ed7f2-7c10-45aa-9a6e-97dca25def2e	Great is the Lord, For his Mercies endureth forever	God is good and All the Time	great-is-the-lord-for-his-mercies-endureth-forever	God is good, always\r\n	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	2025-11-20 10:39:11.835143	2025-11-21 07:14:53.771
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, user_id, token, expires_at, ip_address, user_agent, created_at, updated_at) FROM stdin;
1QGXYjlocay4us7IPw7PiV96CuzmXmAP	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	l4quqmTvBVoziBFKP0lJtERy6qwC1Ww5	2025-11-24 17:14:53.267	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0	2025-11-17 17:14:53.268	2025-11-17 17:14:53.268
Hx9SMomo0Ve2BLrvGrTtyTvarH43IsJT	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	AR1W931pAorJRzcsc7bcm7vKYpTFb7QO	2025-11-24 17:16:13.597	127.0.0.1	Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 Edg/142.0.0.0	2025-11-17 17:16:13.598	2025-11-17 17:16:13.598
Cq3wBB9EMnMsEG8V0G2vboUXhZ48Plbe	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	4jICBa84kH4jFzxQH4V0RR3wyI1FSaoX	2025-11-25 19:24:43.564	127.0.0.1	Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 Edg/142.0.0.0	2025-11-18 19:24:43.566	2025-11-18 19:24:43.566
sGNiGrYySYONxwE0T7JHW5XOktfZAf6v	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	7MfBXmXERz9Y1MgLLIzLZ5oEw5x2Z21j	2025-11-21 01:19:05.583	127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0	2025-11-20 01:19:05.586	2025-11-20 01:19:05.586
9BmWliXZEj3lBz7by2VBAqlMz1BjvK0N	IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	MONxEilSB4fXkrxKHMlYfYIbysiv9DBd	2025-11-22 10:37:32.971	127.0.0.1	Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36 Edg/142.0.0.0	2025-11-21 10:37:32.972	2025-11-21 10:37:32.972
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, email_verified, created_at, updated_at) FROM stdin;
IeuSElRAgj5xUwUqel4gGszYtvBMj9f8	Sammy Sparko	sam@gmail.com	f	2025-11-17 17:05:27.821	2025-11-17 17:05:27.821
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_unique UNIQUE (slug);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: posts posts_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict wVxaF1NfmoG2HL6pGuSJFkjt08JFzykZ8vSg4FDeynJPJkKkWAZkBUdoomIRI2S

