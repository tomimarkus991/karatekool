#!/usr/bin/env bash
# One-off: turns a data-only dump of the hosted Supabase calendar into SQL for the API's database.
# It prints SQL; pipe it into psql. Everything runs in one transaction and refuses a database that
# already has Events, so a failed run changes nothing.
#
# 1. Dump (only the calendar tables, no Members' or applicants' data):
#    npx supabase db dump --linked --data-only -s public \
#      -x public.profile,public.new_applications,public.email_whitelist,public.event_preset,public.event_highlighted_group,public.highlighted_group \
#      -f supabase-data.sql
# 2. Import on the VPS:
#    deploy/supabase-import.sh supabase-data.sql | ssh hetzner-gatherr-deploy \
#      'docker exec -i karatekool-db sh -c "psql -q -v ON_ERROR_STOP=1 -U \$POSTGRES_USER -d \$POSTGRES_DB"'
set -euo pipefail

DUMP="${1:-}"
[[ -f "$DUMP" ]] || { echo "Usage: deploy/supabase-import.sh <supabase-data.sql>" >&2; exit 1; }

cat <<'SQL'
\set ON_ERROR_STOP on
begin;

do $$ begin
  if exists (select 1 from event) then
    raise exception 'The API database already has Events; this import is for an empty one';
  end if;
end $$;

-- The Supabase tables the calendar used, without their constraints
create schema old;
create table old."group" (id bigint, letter text, highlighted boolean);
create table old.event_trailer (id bigint, text text);
create table old.multi_day_event (id bigint, title text);
create table old.all_day_event (id bigint, title text, sub_title text);
create table old.event (
  id bigint, created_at timestamptz, updated_at timestamptz, start timestamptz, long_event_end timestamptz,
  is_highlighted boolean, trailer_id bigint, all_day_event bigint, multi_day_event bigint, event_type text,
  normal_event_end timestamptz, description text
);
create table old.event_group (id bigint, group_id bigint, event_id bigint);
SQL

# The dump's rows, moved into the old schema. Sequence resets are dropped: those sequences don't exist here.
sed -e 's/"public"\./"old"./g' "$DUMP" | grep -v 'setval'

cat <<'SQL'

-- The dump empties the search path and turns off foreign key checks; put both back
reset session_replication_role;
set search_path to public;

-- Groups and Trailers were seeded with their Supabase ids; add any created since
insert into club_group (id, letter) select id, letter from old."group" on conflict do nothing;
insert into trailer (id, text) select id, coalesce(text, '') from old.event_trailer on conflict do nothing;

-- Supabase kept Multi-day event titles in multi_day_event: those are the Presets
insert into preset (id, title) select id, coalesce(title, '') from old.multi_day_event;

insert into event (id, kind, starts_at, ends_at, highlighted, description, trailer_id, title, subtitle,
                   preset_id, created_at, updated_at)
select e.id,
       case e.event_type when 'NORMAL' then 'TRAINING' else e.event_type end,
       e.start,
       case when e.event_type = 'MULTI_DAY' then e.long_event_end end,
       coalesce(e.is_highlighted, false),
       e.description,
       e.trailer_id,
       a.title,
       a.sub_title,
       case when e.event_type = 'MULTI_DAY' then e.multi_day_event end,
       coalesce(e.created_at, now()),
       coalesce(e.updated_at, e.created_at, now())
from old.event e
left join old.all_day_event a on a.id = e.all_day_event
where e.start is not null and e.event_type in ('NORMAL', 'ALL_DAY', 'MULTI_DAY');

insert into event_group (event_id, group_id)
select distinct eg.event_id, eg.group_id
from old.event_group eg
join event on event.id = eg.event_id
join club_group on club_group.id = eg.group_id;

-- New rows get ids after the imported ones
do $$ begin
  perform setval(pg_get_serial_sequence('event', 'id'), greatest((select max(id) from event), 1));
  perform setval(pg_get_serial_sequence('preset', 'id'), greatest((select max(id) from preset), 1));
  perform setval(pg_get_serial_sequence('club_group', 'id'), (select max(id) from club_group));
  perform setval(pg_get_serial_sequence('trailer', 'id'), (select max(id) from trailer));
end $$;

-- What came over, next to what was there. Skipped Events had no start or an unknown kind.
select 'events' as what, (select count(*) from old.event) as supabase, (select count(*) from event) as api
union all select 'event groups', (select count(*) from old.event_group), (select count(*) from event_group)
union all select 'presets', (select count(*) from old.multi_day_event), (select count(*) from preset)
union all select 'groups', (select count(*) from old."group"), (select count(*) from club_group)
union all select 'trailers', (select count(*) from old.event_trailer), (select count(*) from trailer);

drop schema old cascade;
commit;
SQL
