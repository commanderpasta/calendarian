On the server side, using Jakarta validation annotations for methods, parameters and such appears easy and convenient, as the API spec is automatically generated via OpenAPI/swagger. Within the small project scope generation appears near-instant.

As a dev with only little React experience, form validation appears difficult to debug. The first problem encountered was that the form expected the o

# NotNull / Nonnull

Form validation sort of causes bugs if the wrong annotation packages are used in the backend. See [this comment](https://vaadin.com/forum/t/form-binding-firstnamecomponent-example-renders-undefined-as-input-value/166913/5).