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
            <div className="h-full grid md:grid-cols-[45%_1fr] md:grid-rows-none grid-rows-[65%_1fr]">
                <div className="bg-[var(--lumo-primary-color)] flex items-center">
                    <div className="overflow-hidden flex flex-col w-full">
                        <div className="self-center">
                            <h1 className="lg:text-7xl md:text-5xl text-5xl text-white drop-shadow-lg font-semibold">
                                Calendarian
                            </h1>
                            <h3 className="lg:text-3xl md:text-xl text-lg text-white drop-shadow-lg ml-1">
                                A mood calendar built with Hilla.
                            </h3>
                        </div>
                    </div>
                </div>
                <img src={tabletCalendarImg} className="object-cover h-full w-full"></img>
            </div>
        </main>
    );
}
