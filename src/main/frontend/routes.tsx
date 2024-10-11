import { RouterConfigurationBuilder } from "@vaadin/hilla-file-router/runtime.js";
import fileRoutes from "Frontend/generated/file-routes.js";
import Auth from "./views/auth";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { isUserInRole } from "./auth";
import Admin from "./views/admin/@index";
import { Commands, Context, Route } from "@vaadin/router";
import { ActionFunctionArgs } from "react-router-dom";

export const { router, routes } = new RouterConfigurationBuilder()
    .withReactRoutes([
        { path: "/auth", element: <Auth />, handle: { title: "Auth" } } // remove login from the MainLayout
    ])
    .withFileRoutes(fileRoutes) // use file router for remaining routes
    .protect("/auth")
    //.withFallback(PageNotFoundReactComponent)
    .build();
