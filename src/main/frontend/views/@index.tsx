import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: { exclude: true}
}

/**
 * Publicly visible landing page.
 */
export default function Public() {
    return (
        <div className="p-4">
            <p>Start page</p>
        </div>
    );
}