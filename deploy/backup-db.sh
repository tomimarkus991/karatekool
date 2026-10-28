#!/usr/bin/env bash
# Dumps the database into backups/ next to this script and keeps the newest 6 (about 4 months).
# Cron runs it every Monday at 03:00; it only dumps every third week.
set -euo pipefail

if [[ "${1:-}" != "--now" ]] && (( 10#$(date +%V) % 3 != 0 )); then exit 0; fi

DIR="$(cd "$(dirname "$0")/.." && pwd)/backups"
mkdir -p "$DIR"
FILE="$DIR/karatekool-$(date +%F).sql.gz"
docker exec karatekool-db sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > "$FILE.tmp"
mv "$FILE.tmp" "$FILE"
chmod 600 "$FILE"
ls -1t "$DIR"/karatekool-*.sql.gz | tail -n +7 | xargs -r rm --
