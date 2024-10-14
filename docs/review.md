# Thoughts after building with Hilla

## Positive remarks

### Security

Due to directly building on the Spring framework, Spring Security can be used quite easily. Hilla includes a few nice configurations for authentication by default, such as [CSRF protection and session management](https://vaadin.com/docs/latest/hilla/guides/security/intro#security-considerations).

Persistent user management requires some work with the Spring Security documentation, but the in-memory configuration works well out of the box.

### Tooling

The tooling for building during development appears modern and well maintained, with tools such as Vite and Swagger. The codegen after an endpoint change seems fast, and is instantly reflected in the IntelliSense, quickly displaying the changes generated types. The generated API endpoints and UI components are well-typed, allowing the developer to make a lot of use of TypeScript.

### Validation

Validation moved to the backend works well. At first, it needs to be understood, that all properties are nullable by default, unless annotated otherwise. Some redundant annotation is required, since e.g. nullability needs to be configured on each the entity schema itself, any endpoint using it, and the DTOs, but once understood it seems to work well. Interestingly, validation error messages can directly be embedded into the annotations.

The available annotations are numerous and seem to do the job, though it leads to a lot of exception handling boilerplate on the frontend.

### UI Components

Some of the Vaadin UI components are well-configured out of the box, and are also available as Web Components, and can be deeply inspected in GitHub respositories. The documentation provides good directions for best practices, and accessibility with e.g. ARIA labels, which can be good for less experienced frontend developers.

## Issues during developemnt

### Authentication

-   There are two Hilla packages that provide frontend functions for user authentication, leading to confusion over how to correctly implement authentication.
-   While the auth documentation explicitly allows for setting a different login route, it is not mentioned that the backend web security configuration needs to updated to, as found out through [this GitHub issue](https://github.com/vaadin/hilla/pull/2432)

### Docker configuration

-   Vaadin Live Reload provides DevTools for the frontend, which are mapped to a hardcoded port, as stated [in the docs](https://vaadin.com/docs/latest/flow/configuration/live-reload/spring-boot#limitations). Therefore using them through a docker container prevents the browser from being able to connect, even when the port is forwarded.

### Routing

Vaadin 24 moved Hilla to use a file-based frontend router by default. While during development it eases creating a new view without having to change a `routes.ts` file, it leads to confusion when switching between files since all view files are named `@index.tsx`.

The functionality of defining different layouts and automatically importing them based on file location leads to issues since nested layouts are automatically combined. Because there is a root layout, it leads to difficulties when trying to configure a view that not base on the root layout.

The file-based router is a first party library and does not appear mature, since bugs during usage are too frequent, e.g [as seen here](https://github.com/vaadin/hilla/pull/2432).

### Validation

-   Form validation causes bugs if the wrong annotation packages are used in the backend. See [this issue](https://vaadin.com/forum/t/form-binding-firstnamecomponent-example-renders-undefined-as-input-value/166913/5).
-   The Hilla `@Nonnull`-annotation does not work with enums in DTOs.

### UI Components

The login component is not very customizable, making it difficult to use it for registration. It was mostly handled through adapting its i18n functionality.

### Documentation

The documentation is not well maintained, as a lot of issues during development were encountered that could only be solved by skimming through forum posts and reading on resources about Spring instead. In many instances, documentation to configure things were outdated.

-   The docs section for embedding [Production Data Sources](https://vaadin.com/docs/latest/hilla/lit/guides/security/spring-login#appendix-production-data-sources) for authentication includes deprecated Spring Boot components that are explicity replaced in an [Upgrade Guide](https://vaadin.com/docs/latest/upgrading#deprecation) in a different section. This is reciprocated in [another GitHub issue](https://github.com/vaadin/hilla/issues/2078).
-   With the release of Vaadin 24, Hilla was integrated into the Vaadin ecosystem, leading to a lot more tooling than before. It is also noticable, that Hilla was a later addition, as a lot of documentation references the more mature Vaadin framework Flow, leading to situations, where it is not immediately clear, if a code section is even applicable to a Hilla application.
-   Using a search engine for Vaadin documentation often returns older versions in the top ranks, which are marked as archived.
-   The [documentation describes](https://vaadin.com/docs/latest/getting-started/run#debugging) that debugging the Java backend is not possible when run through Maven, as the server is on a forked process. This is not true, since the debugger can be enabled through JVM properties, which can be configured with maven, e.g. in the `pom.xml`.

### Everything and the kitchen sink

It quickly becomes noticable that Hilla as a full-stack framework is shipped with a lot of functionality that becomes difficult to extend. For example, when trying to use TailwindCSS, all UI components are already pre-configured to rely on CSS variables by a theme called Lumo.

### Telemetry

[Vaadin Usage statistics](https://github.com/vaadin/vaadin-usage-statistics) are automatically sent to Vaadin during development, including the IP address, and are **opt-out** only.

## Other remarks

The landing page of Hilla openly markets itself with being an alternative to building REST clients. All of the API endpoints are automatically generated as POST requests, even when merely a resource is fetched.
