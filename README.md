# Calendarian

This is a simple application written using the [Hilla](https://hilla.dev) framework for mood tracking and journaling. This is a university project, with the main goal being to build experience with the full-stack framework Hilla, which has now been integrated into Vaadin.

## Setup

The local environment runs on two docker containers, one for Hilla (Frontend+Backend) and one for MySQL, and can be started with `docker-compose up`.

A production environment has not been set up, since enabling the debugger is currently hardcoded into the pom.xml. The environment variables for the database are pre-configured in the [docker-compose](./docker-compose.yaml), and the initial databases for authentication are set up automatically, using JPA and a JdbcUserDetailsManager in `SecurityConfig.java`.

The original [Hilla README](./README_Hilla.md) can safely be ignored, since a docker environment is configured. An in-memory database is not enabled as fallback, so starting the application outside the docker container is likely to fail.

## Retrospective

My remarks of Hilla can be found in [a separate document on this repository](./docs/review.md).
