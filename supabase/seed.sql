SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: get_togethers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."get_togethers" ("id", "created_at", "participants", "name", "events", "from_date", "to_date", "owner", "state", "city", "country") VALUES
	(17, '2024-11-18 02:04:03.244171+00', NULL, 'Thanksgiving', NULL, '2024-11-24', '2024-11-30', NULL, 'TX', 'Dallas', NULL);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."events" ("id", "created_at", "name", "start_datetime", "end_datetime", "is_idea", "get_together") VALUES
	(5, '2024-11-18 03:56:20.391341+00', 'Rock climbing', '2024-11-20 23:56:20.925', NULL, true, 17);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: votes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."votes" ("id", "created_at", "user", "value", "event") VALUES
	(6, '2024-11-18 03:56:22.676478+00', NULL, 'up', 5);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 2, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: Events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Events_id_seq"', 5, true);


--
-- Name: Get Togethers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Get Togethers_id_seq"', 17, true);


--
-- Name: Votes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."Votes_id_seq"', 6, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
