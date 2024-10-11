import {
    login as loginImpl,
    logout as logoutImpl,
    LoginOptions,
    LoginResult,
    LogoutOptions
} from "@vaadin/hilla-frontend";
import { configureAuth } from "@vaadin/hilla-react-auth";
import { UserService } from "Frontend/generated/endpoints";
import UserInfoRecord from "./generated/com/ianmatos/calendarian/services/UserService/UserInfoRecord";
import { get } from "@polymer/polymer/lib/utils/path";

interface Authentication {
    user: UserInfoRecord;
}

let authentication: Authentication | undefined;

// ref: https://vaadin.com/docs/latest/hilla/lit/guides/security/role-based-access#using-roles-in-typescript
export async function login(username: string, password: string, options: LoginOptions = {}): Promise<LoginResult> {
    return await loginImpl(username, password, {
        ...options,
        async onSuccess() {
            const user = await UserService.getUserInfo();
            authentication = {
                user
            };
        }
    });
}

export function isUserInRole(role: string) {
    console.debug(authentication);
    if (!authentication) {
        return false;
    }

    return authentication.user.authorities?.includes(`ROLE_${role}`);
}

export async function logout(options: LogoutOptions = {}) {
    return await logoutImpl({
        ...options,
        onSuccess() {}
    });
}

export function isLoggedIn() {
    return !!authentication;
}

export function getUser() {
    return authentication?.user;
}

const auth = configureAuth(UserService.getUserInfo, { getRoles: (user) => user.authorities });
export const useAuth = auth.useAuth;
export const AuthProvider = auth.AuthProvider;
