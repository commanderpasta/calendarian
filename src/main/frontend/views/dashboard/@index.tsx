import { ViewConfig } from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    loginRequired: false
};

export default function Home() {
    return (
        <div className="m-4">
            <h2>Hilla full-stack tutorial app</h2>
            <p>
                You can find the steps for building this app in the{" "}
                <a href="https://hilla.dev/docs">Hilla documentation</a>.
            </p>
        </div>
    );
}
