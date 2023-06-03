import { Languages, ThemeModes } from "./common";

export enum LoginFormKeys {
    username = "username",
    password = "password",

}

export interface LoginForm {
    username: string,
    password: string,
}

export interface User {
    id: string;
    username: string;
    isAuthenticated: boolean;
    preferredLanguage: Languages;
    preferredThemeMode: ThemeModes;
}

export interface LoginState {
    form: LoginForm;
    user: User;
    error: Error | undefined;
    isLoading: boolean;
}
