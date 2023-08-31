FROM postgres:13


VOLUME [ "/var/lib/postgresql/data" ]

WORKDIR /app/

COPY create_table.sql .
COPY init_db.sh /docker-entrypoint-initdb.d/

