import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    menu: { exclude: true }
};

/**
 * Publicly visible landing page.
 */
export default function LandingPage() {
    return (
        <main className="p-4 h-full">
            <div className="h-full flex flex-col justify-center ml-10">
                <h1 className="md:text-8xl text-5xl font-semibold">Calendarian</h1>
                <h3 className="md:text-3xl text-lg">A mood calendar built with Hilla.</h3>
            </div>
        </main>
    );
}
