SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict QFaRWF6EWGgkSbOuxYsEt56Js6rr8XoIMEPqGbgthBfGQc5tceZkbUcP6rAarhm

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

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
-- Data for Name: event_trailer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."event_trailer" ("id", "text") VALUES
	(2, '- EKSAM'),
	(5, '!!!');


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."group" ("id", "letter", "highlighted") VALUES
	(23, 'K', false),
	(17, 'S', false),
	(19, 'A', false),
	(18, 'V', false),
	(22, 'E', false),
	(21, 'N', false),
	(20, 'M', false),
	(24, 'T', false),
	(25, 'S1', false),
	(26, 'L', false),
	(27, 'C', false);


--
-- Data for Name: highlighted_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."highlighted_group" ("id", "letter", "highlighted") VALUES
	(1, 'S', true),
	(2, 'V', true),
	(3, 'A', true),
	(4, 'E', true),
	(5, 'N', true),
	(6, 'M', true),
	(7, 'K', true),
	(8, 'T', true),
	(9, 'S1', true),
	(10, 'L', true),
	(11, 'C', true);


--
-- Name: event_trailer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."event_trailer_id_seq"', 5, true);


--
-- Name: group_duplicate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."group_duplicate_id_seq"', 27, true);


--
-- Name: highlighted_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."highlighted_group_id_seq"', 11, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict QFaRWF6EWGgkSbOuxYsEt56Js6rr8XoIMEPqGbgthBfGQc5tceZkbUcP6rAarhm

RESET ALL;
