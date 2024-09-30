# Layouts

Layouts with the file-based router appear to have shown behvaiour not in line with documentation. A nested layout is only nested within the root layout, instead of replacing it as expected.

Potentially related: [GitHub Issue](https://github.com/vaadin/hilla/pull/2745)

What's important to note is that file-based routing is a very specific feature to implement and could have potentially been resolved with an established library instead. Instead, the documentation recommends new solutions that do not appear mature, as such issues have been coming up multiple times even in a smaller project.