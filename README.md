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

## Example Curl Commands

### Create a chart review audit

```sh
curl -X 'POST' \
  'http://localhost:3000/api/1/audits/chart-reviews' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "assignedTo": "123e4567-e89b-12d3-a456-426614174000",
  "unitId": "unit-1",
  "dueDate": "2024-12-14T16:24:18.769Z",
  "ehrProvider": "cerner",
  "patientId": "ff22ce0a-06f8-4893-9bbe-94c5cbca7fd3",
  "recurrence": {
    "frequency": "daily",
    "interval": 1,
    "endDate": "2024-12-14T16:24:18.769Z"
  }
}' | jq
[
  {
    "id": "d51f45cf-8a6a-4c14-bee1-e3308138dab4",
    "assignedTo": "123e4567-e89b-12d3-a456-426614174000",
    "dueDate": "2024-12-14T16:24:18.769Z",
    "ehrProvider": "cerner",
    "patientId": "ff22ce0a-06f8-4893-9bbe-94c5cbca7fd3",
    "status": "pending",
    "ehrData": null,
    "lineItems": [
      {
        "id": "68f51083-0b31-46a4-9db8-00aabbeb39fa",
        "text": "Is the documentation complete?",
        "type": "boolean",
        "response": null
      },
      {
        "id": "43994e18-04dc-4bae-8565-85c89527775a",
        "text": "Are all diagnoses properly coded?",
        "type": "boolean",
        "response": null
      },
      {
        "id": "acbd148c-c477-4aca-b0a0-110054621d86",
        "text": "Is the treatment plan documented?",
        "type": "boolean",
        "response": null
      }
    ]
  }
]
```

### Get a chart review audit

```sh
curl -X 'GET' \
  'http://localhost:3000/api/1/audits/chart-reviews/d51f45cf-8a6a-4c14-bee1-e3308138dab4' \
  -H 'accept: application/json' | jq
  {
  "id": "d51f45cf-8a6a-4c14-bee1-e3308138dab4",
  "assignedTo": "123e4567-e89b-12d3-a456-426614174000",
  "dueDate": "2024-12-14",
  "ehrProvider": "cerner",
  "patientId": "ff22ce0a-06f8-4893-9bbe-94c5cbca7fd3",
  "status": "pending",
  "ehrData": {
    "patient": {
      "id": "ff22ce0a-06f8-4893-9bbe-94c5cbca7fd3",
      "mrn": "E789012",
      "gender": "female",
      "lastName": "Johnson",
      "birthDate": "1985-03-15T00:00:00.000Z",
      "firstName": "Sarah"
    },
    "conditions": [],
    "providerId": "cerner"
  },
  "lineItems": [
    {
      "id": "68f51083-0b31-46a4-9db8-00aabbeb39fa",
      "text": "Is the documentation complete?",
      "type": "boolean",
      "response": null
    },
    {
      "id": "43994e18-04dc-4bae-8565-85c89527775a",
      "text": "Are all diagnoses properly coded?",
      "type": "boolean",
      "response": null
    },
    {
      "id": "acbd148c-c477-4aca-b0a0-110054621d86",
      "text": "Is the treatment plan documented?",
      "type": "boolean",
      "response": null
    }
  ]
}
```

### Update a chart review audit

```sh
curl -X 'PATCH' \
  'http://localhost:3000/api/1/audits/chart-reviews/d51f45cf-8a6a-4c14-bee1-e3308138dab4' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "status": "completed",
  "lineItems": [
    {
"id": "acbd148c-c477-4aca-b0a0-110054621d86",
"result":true
}
  ]
}' | jq

{
  "id": "d51f45cf-8a6a-4c14-bee1-e3308138dab4",
  "assignedTo": "123e4567-e89b-12d3-a456-426614174000",
  "dueDate": "2024-12-14",
  "ehrProvider": "cerner",
  "patientId": "ff22ce0a-06f8-4893-9bbe-94c5cbca7fd3",
  "status": "completed",
  "ehrData": {
    "patient": {
      "id": "ff22ce0a-06f8-4893-9bbe-94c5cbca7fd3",
      "mrn": "E789012",
      "gender": "female",
      "lastName": "Johnson",
      "birthDate": "1985-03-15T00:00:00.000Z",
      "firstName": "Sarah"
    },
    "conditions": [],
    "providerId": "cerner"
  },
  "lineItems": [
    {
      "id": "68f51083-0b31-46a4-9db8-00aabbeb39fa",
      "text": "Is the documentation complete?",
      "type": "boolean",
      "response": null
    },
    {
      "id": "43994e18-04dc-4bae-8565-85c89527775a",
      "text": "Are all diagnoses properly coded?",
      "type": "boolean",
      "response": null
    },
    {
      "id": "acbd148c-c477-4aca-b0a0-110054621d86",
      "text": "Is the treatment plan documented?",
      "type": "boolean",
      "response": {
        "id": "acbd148c-c477-4aca-b0a0-110054621d86",
        "result": true
      }
    }
  ]
}
```
