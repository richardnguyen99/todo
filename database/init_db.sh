#! /usr/bin/env bash

set -e  # Exit immediately if a command exits with a non-zero status.


# Create the users.
psql -U todo <<-EOSQL
    REVOKE CREATE ON schema public FROM public;

    CREATE USER "$POSTGRES_DOCKER_USER"
    WITH PASSWORD '$POSTGRES_DOCKER_PASSWORD';

    GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_DOCKER_USER";

    CREATE USER "$POSTGRES_AUTH_USER"
    WITH PASSWORD '$POSTGRES_AUTH_PASSWORD';

    GRANT ALL ON schema public TO "$POSTGRES_AUTH_USER";
    GRANT CONNECT ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_AUTH_USER";
    GRANT USAGE ON SCHEMA public TO "$POSTGRES_AUTH_USER";
    GRANT CREATE ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_AUTH_USER";
EOSQL

# Create the database.
# psql -U todo -f /app/create_table.sql
