# Chart Review Audit Management System

## Description

This repository is a NestJS-based application designed for managing and executing audits, specifically focusing on chart review audits.

## Features

- **API Documentation**: Automatically generated Swagger documentation.
- **Validation**: Input validation using `class-validator` and `class-transformer`.
- **Error Handling**: Global exception filters for consistent error responses.
- **Versioning**: API versioning to support multiple versions concurrently.
- **Database Integration**: Uses TypeORM for database interactions with PostgreSQL.
- **Modular Architecture**: Organized into modules for scalability and maintainability.

## Project Setup

Ensure you have Docker and Docker Compose installed.

```bash
# Build and start the containers
$ docker-compose up --build
```

## Makefile Commands

The `Makefile` includes several useful commands for managing the application:

- **Build**: Rebuild the Docker containers.

  ```bash
  $ make build
  ```

- **Restart**: Restart the Docker containers.

  ```bash
  $ make restart
  ```

- **Database Commands**:

  - Connect to the database:
    ```bash
    $ make db-connect
    ```

## API Documentation

The API documentation is available at `/api` when the application is running. If running locally, visit `http://localhost:3000/api`.

You can also copy the contents of the `swagger.yaml` file to your local machine and use a tool like [Swagger Editor](https://editor.swagger.io/) to view the API documentation.
