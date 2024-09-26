import type { AgnosticRoute } from "@vaadin/hilla-file-router/types.js";
import { createRoute } from "@vaadin/hilla-file-router/runtime.js";
import * as Page0 from "../views/@index.js";
import * as Page1 from "../views/about/@index.js";
import * as Page3 from "../views/calendar/@index.js";
import * as Page4 from "../views/calendar/NewEntry.js";
import * as Layout6 from "../views/@layout.js";
const routes: readonly AgnosticRoute[] = [
    createRoute("", Layout6, [
        createRoute("", Page0),
        createRoute("about", [
            createRoute("", Page1)
        ]),
        createRoute("calendar", [
            createRoute("", Page3),
            createRoute("NewEntry", Page4)
        ])
    ])
];
export default routes;
