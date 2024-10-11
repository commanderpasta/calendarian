import { AppLayout, Button, DrawerToggle } from "@vaadin/react-components";
import MenuButton from "Frontend/components/MenuButton";
import logo from "Frontend/assets/images/logo.png";
import { useRouteMetadata } from "Frontend/util/routing.js";
import { Suspense, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import { createMenuItems } from "@vaadin/hilla-file-router/runtime.js";

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? "My App";
    useEffect(() => {
        document.title = `Calendarian - ${currentTitle}`;
    }, [currentTitle]);

    const { state, logout } = useAuth();
    const navigate = useNavigate();

    if (useLocation().pathname === "/") {
        // Render landing page without drawer layout
        return (
            <AppLayout primarySection="navbar">
                <div slot="navbar" className="flex justify-end w-full">
                    <span className="mr-3">
                        {state.user ? (
                            <>
                                <div className="flex items-center gap-x-2">
                                    <span>{`Welcome, ${state.user.name}.`}</span>
                                    <Button onClick={() => navigate("/dashboard")} theme="primary">
                                        Go to app
                                    </Button>
                                    <Button onClick={logout} theme="primary">
                                        Sign out
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <a href="/auth">
                                <Button className="w-full" theme="primary">
                                    Sign in
                                </Button>
                            </a>
                        )}
                    </span>
                </div>
                <Suspense>
                    <Outlet />
                </Suspense>
            </AppLayout>
        );
    }

    return (
        <AppLayout primarySection="drawer">
            <div slot="navbar" className="flex justify-between w-full !h-full">
                <span className="flex items-center">
                    <DrawerToggle aria-label="Menu toggle" />
                    <h2 className="text-l m-0">{currentTitle}</h2>
                </span>

                <span className="mr-3">
                    {state.user ? (
                        <>
                            <div className="flex items-center gap-x-2">
                                <span>{`Welcome, ${state.user.name}.`}</span>
                                <span>{`Auth: ${state.user.authorities?.toString()}.`}</span>
                                <Button onClick={logout} theme="primary">
                                    Sign out
                                </Button>
                            </div>
                        </>
                    ) : (
                        <a href="/auth">
                            <Button className="w-full" theme="primary">
                                Sign in
                            </Button>
                        </a>
                    )}
                </span>
            </div>

            <div slot="drawer">
                <header>
                    <nav className="flex flex-col gap-2">
                        <NavLink
                            to="/"
                            className="text-[var(--lumo-primary-contrast-color)] bg-[var(--lumo-primary-text-color)] rounded-xl mt-2 mx-2"
                        >
                            <img src={logo} />
                        </NavLink>

                        {createMenuItems().map(({ to, icon, title }) => (
                            <MenuButton toPath={to} label={title ?? ""} key={to} />
                        ))}
                    </nav>
                </header>
            </div>

            <Suspense>
                <Outlet />
            </Suspense>
        </AppLayout>
    );
}
