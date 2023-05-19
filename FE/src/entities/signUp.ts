export interface SignUpForm {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface SignUpState {
    form: SignUpForm;
    error: Error | undefined;
    isLoading: boolean;
    isSuccessSignUp: boolean;
}

export enum SignUpFormKeys {
    username = "username",
    email = "email",
    password = "password",
    confirmPassword = "confirmPassword",
}

export interface TextFieldRule {
    condition: boolean;
    message: string;
}
export interface ValidationRules {
    [key: string]: TextFieldRule[];
}
export interface SignUpErrors {
    [key: string]: string | undefined;
}

export type SignUpFields = {
    [key in SignUpFormKeys]: string;
}

export interface ConfirmationTokenState {
    isLoading: boolean;
    confirmationStatus: string;
}