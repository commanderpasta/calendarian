-> CORS and CSRF out of the box


# Deprecated docs?
The docs section for embedding [Production Data Sources](https://vaadin.com/docs/latest/hilla/lit/guides/security/spring-login#appendix-production-data-sources) for authentication includes deprecated Spring Boot components that are explicity replaced in an [Upgrade Guide](https://vaadin.com/docs/latest/upgrading#deprecation) in a different section.

## Update
After a day of work, it seems to be true, in accordance with [this GitHub issue](https://github.com/vaadin/hilla/issues/2078).

# Client-side authentication
While the docs are adamant on migrating to file-based routing with Vaadin 24.4, the [docs considering authentication](https://vaadin.com/docs/latest/hilla/guides/security/spring-login#protect-hilla-views) disregard this entirely, so understand the routing mechanisms is left to the user.

