import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: { exclude: true}
}

/**
 * Hilla view that is available publicly.
 */
export default function Public() {
    return (
        <div className="p-4">
            <p>Start page</p>
        </div>
    );
}