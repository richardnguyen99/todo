# Documentations

Here you can find the documentation for the project. They are in purpose of
helping me keep track of the problems I have encountered and the solutions I
have found. You might find them useful too.

This serves the main documentation for the project and explains the general
architecture. Each service has its own documentation and they are all located
in this `docs` directory.

## Architecture

The project follows the microservice architecture. Each service is a separate
application and is responsible for a specific task. The services communicate
with each other via HTTP requests. These services are:

1. [**Auth**](docs/authentication.md): Responsible for authentication and
   authorization.
2. [**Task**](docs/task.md): Responsible for managing tasks.
3. [**App**](docs/app.md): Responsible for the front end application.
4. [**Gateway**](docs/gateway.md): Responsible for routing requests to the
   appropriate service.
5. [**Database**](docs/database.md): Responsible for managing the shared database.

Each service communicates with one another via HTTP. However, the communications
might be varied between two services. For example, `webapp` communicates with
the backend services via `gateway` using [GraphQL](https://graphql.org/). On the
other hands, `gateway` communicates with the internal services via [`gRPC`](https://grpc.io/)
(more on this at [**gateway**](docs/gateway.md))

There is one shared database for all the services. The database is managed by
the `database` service and is using [PostgreSQL](https://www.postgresql.org/).
However, to protect the confidentiality of the data, each service has its
own tables and can only access the tables to which it is allowed.

## Development

Since each service is a separate application, they can run independently via
their own running scripts. However, for better development experience, they
should be running together. To do so, we use [Docker](https://www.docker.com/)
and [Docker Compose](https://docs.docker.com/compose/). The `docker-compose.yml`
file is located at the root of the project. To run the services, simply run:

```bash
docker-compose up
```

This will start all the services and the database. The services will be running
on the following ports:

- `auth`: `localhost:5125`
- `task`: `localhost:5000`
- `gateway`: `localhost:3000`
- `webapp`: `localhost:8080`
- `database`: `localhost:5432`

To stop the services, simply run:

```bash
docker-compose down
```
