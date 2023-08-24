# TODO Application

Yet Another _TODO_ App

## Project Structure

The project is an attempt to learn microservices architecture. Thus, the core
components are divided into separate services. The project structure is as below:

```bash
.
├── api     # API server
├── app     # Web app
├── auth    # Authentication server
├── gateway # API gateway
├── .editorconfig
├── .gitignore
├── LICENSE
└── README.md
```

### 1. Web app

The top-level directory `app` contains the main web application for the project.

### 2. Todo API

The top-level directory `api` contains the endpoints for Todo API.

### 3. Authentication

The top-level directory `auth` contains the implementation and functionality for
authentication.

### 4. API Gateway

The top-level directory `gateway` contains the standardized API gateway for
routing client requests to the appropriate service.
