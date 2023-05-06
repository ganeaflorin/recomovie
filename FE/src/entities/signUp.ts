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
}