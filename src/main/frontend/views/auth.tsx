import { LoginForm, LoginI18n, LoginOverlayLoginEvent } from "@vaadin/react-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, useAuth } from "Frontend/auth";
import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { UserService } from "Frontend/generated/endpoints";
import { EndpointError, EndpointValidationError } from "@vaadin/hilla-frontend";
import LoadingIndicator from "Frontend/components/LoadingIndicator";

export const config: ViewConfig = {
    menu: { exclude: true }
};

interface NavigateAndReloadProps {
    to: string;
}

const NavigateAndReload: React.FC<NavigateAndReloadProps> = ({ to }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, { replace: true });
        // reload a page on log in to update the menu items
        window.location.reload();
    }, [navigate, to]);

    return null;
};

/**
 * Login views in Hilla
 */
export default function Auth() {
    const { state, logout } = useAuth();
    const [hasDefaultError, setError] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [url, setUrl] = useState<string>();
    const [isInRegisterMode, setRegisterMode] = useState<boolean>();

    const i18n = useMemo<LoginI18n>(() => {
        let text = {
            form: {
                title: "Log in",
                username: "Username",
                password: "Password",
                submit: "Log in",
                forgotPassword: "Forgot password?"
            },
            errorMessage: {
                title: "Incorrect username or password",
                message: "Check that you have entered the correct username and password and try again.",
                username: "Username is required",
                password: "Password is required"
            }
            //additionalInformation: 'Jos tarvitset lisätietoja käyttäjälle.',
        };

        if (isInRegisterMode) {
            text.form.title = "Register";
            text.form.submit = "Register";

            if (errorMessage) {
                text.errorMessage.title = "Registration failed";
                text.errorMessage.message = errorMessage;
            }
        } else {
            text.errorMessage.title = "Incorrect username or password";
            text.errorMessage.message = "Check that you have entered the correct username and password and try again.";
        }

        return text;
    }, [isInRegisterMode, errorMessage]);

    const doLogin = async (username: string, password: string) => {
        const { error } = await login(username, password);

        if (error) {
            setError(true);
        } else {
            setUrl("/calendar");
        }
    };

    const handleLogin = async ({ detail: { username, password } }: LoginOverlayLoginEvent) => {
        if (isInRegisterMode) {
            return handleRegister(username, password);
        }

        await doLogin(username, password);
    };

    const handleRegister = async (username: string, password: string) => {
        try {
            await UserService.register(username, password);
            await doLogin(username, password);
        } catch (e) {
            if (e instanceof EndpointValidationError) {
                setError(true);
                setErrorMessage(e.validationErrorData[0].validatorMessage);
            } else if (e instanceof EndpointError) {
                setError(true);
                setErrorMessage(e.message);
            }
        }
    };

    if (state.user) {
        return <NavigateAndReload to={"/calendar"} />;
    }

    return (
        <div className="grid grid-cols-[1fr_1.6fr] h-full items-center">
            <main className="flex flex-col justify-center items-center">
                {state.initializing || state.loading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        <LoginForm
                            error={hasDefaultError}
                            noForgotPassword
                            autofocus
                            title={"Calendarian"}
                            onLogin={handleLogin}
                            i18n={i18n}
                            onChange={() => setError(false)}
                        ></LoginForm>
                        <a href="/auth#" slot="custom-form-area" onClick={() => setRegisterMode(!isInRegisterMode)}>
                            {isInRegisterMode ? "I have an account" : "Create an account"}
                        </a>
                    </>
                )}
            </main>
            <div className="bg-[var(--lumo-primary-color)] h-full" />
        </div>
    );
}
