import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    loginRequired: true,
    rolesAllowed: ["ADMIN"]
};

export default function Admin() {
    return <div>xd</div>;
}
