<p align="center">
  <a href="http://anthondev.com" target="blank"><img src="https://anthondev.s3.amazonaws.com/cover-api.jpg" width="400" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

# Aluxion API Test [Anthony Gonzalez]

## Description

Nest.js API Test for Aluxion.

Developed with

- Prisma ORM
- Swagger API
- Typescript
- Nest.j
- AWS SDK S3
- Unsplash API
- Docker Containers

Features

- Error Handling
- Validation
- Authentication JWT Guards
- Rich documentation Swagger

## Installation

```bash
$ npm install

npx prisma generate

npx prisma migrate dev

```

or using docker

```bash
docker compose up --build
```

## Running the app

```bash
# development
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Please enter the swagger docs

`localhost:3000/api`

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Anthony Gonzalez](https://anthondev.com)

## License

Nest is [MIT licensed](LICENSE).
