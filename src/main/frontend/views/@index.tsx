import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import tabletCalendarImg from "Frontend/assets/images/tablet-calendar.jpg";

export const config: ViewConfig = {
    menu: { exclude: true }
};

/**
 * Publicly visible landing page.
 */
export default function LandingPage() {
    return (
        <main className="h-full">
            <div className="h-full grid md:grid-cols-[40%_1fr] md:grid-rows-none grid-rows-[65%_1fr]">
                <div className="bg-[var(--lumo-primary-color)] flex items-center">
                    <div className="overflow-hidden">
                        <h1 className="lg:text-7xl md:text-5xl text-5xl text-white drop-shadow-lg font-semibold lg:ml-24 md:ml-10 ml-4">
                            Calendarian
                        </h1>
                        <h3 className="lg:text-3xl md:text-xl text-lg text-white drop-shadow-lg lg:ml-24 md:ml-10 ml-4">
                            A mood calendar built with Hilla.
                        </h3>
                    </div>
                </div>
                <img src={tabletCalendarImg} className="object-cover h-full w-full"></img>
            </div>
        </main>
    );
}
