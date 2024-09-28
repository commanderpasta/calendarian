import type { AgnosticRoute } from "@vaadin/hilla-file-router/types.js";
import { createRoute } from "@vaadin/hilla-file-router/runtime.js";
import * as Page0 from "../views/@index.js";
import * as Page1 from "../views/about/@index.js";
import * as Page3 from "../views/calendar/@index.js";
import * as Page4 from "../views/calendar/NewEntry.js";
import * as Page6 from "../views/login.js";
import * as Layout7 from "../views/@layout.js";
const routes: readonly AgnosticRoute[] = [
    createRoute("", Layout7, [
        createRoute("", Page0),
        createRoute("about", [
            createRoute("", Page1)
        ]),
        createRoute("calendar", [
            createRoute("", Page3),
            createRoute("NewEntry", Page4)
        ]),
        createRoute("login", Page6)
    ])
];
export default routes;
