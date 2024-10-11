# Calendarian

This is a simple application written using the [Hilla](https://hilla.dev) framework for mood tracking and journaling. This is a university project, with the main goal being to build experience with the full-stack framework Hilla, which has now been integrated into Vaadin.

## Setup

The local environment runs on two docker containers, one for Hilla (Frontend+Backend) and one for MySQL, and can be started with `docker-compose up`.

A production environment has not been set up. The environment variables are pre-configured (or rather hardcoded), and the initial databases for authentication are set up automatically, using JPA and a JdbcUserDetailsManager in `SecurityConfig.java`.

## Retrospective

Some thoughts can be found in [a separate document on this repository](./docs/review.md).
