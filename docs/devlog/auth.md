-> CORS and CSRF out of the box


# Deprecated docs?
The docs section for embedding [Production Data Sources](https://vaadin.com/docs/latest/hilla/lit/guides/security/spring-login#appendix-production-data-sources) for authentication includes deprecated Spring Boot components that are explicity replaced in an [Upgrade Guide](https://vaadin.com/docs/latest/upgrading#deprecation) in a different section.

## Update
After a day of work, it seems to be true, in accordance with [this GitHub issue](https://github.com/vaadin/hilla/issues/2078).

# Client-side authentication
While the docs are adamant on migrating to file-based routing with Vaadin 24.4, the [docs considering authentication](https://vaadin.com/docs/latest/hilla/guides/security/spring-login#protect-hilla-views) disregard this entirely, so understand the routing mechanisms is left to the user.


# IDK
Hope this [tutorial](https://archive.is/65pEt) helps. Result: It has!

# hilla-react-auth
Using a non-standard login route is difficult to configure, as login attempts are made to /login route, even though /auth has been set as login view in SecurityConfig.java (and in the frontend). The server replies with a 302 Redirect, which prevents a proper page refresh even though the login is successful.

Apparently the useAuth utility only allows setting login options such as a different login path since Vaadin 24.5, see: https://github.com/vaadin/hilla/pull/2432 Therefore the custom login routes were not functional before, as shown in the docs? At least the documentation must have been incomplete before. 

## I don't get it
The hilla-frontend core package provides a login function with additional login options, that are not available in the auth package..
UPDATE: [This GitHub issue](https://github.com/vaadin/hilla/issues/1111) goes deeper down the rabbit hole.

# Side note
Googling Vaadin documentation often returns older versions in the top ranks, which are marked as archived on the site.

