import { createStore } from "zustand/vanilla";

export type AuthState = {
    loginName: string;
    loginPassword: string;
    registerEmail: string;
    registerPassword: string;
    registerRePassword: string;
    resetPassword: string;
    resetRePassword: string;
    forgotEmail: string;
};

export type AuthActions = {
    setLoginName: (name: string) => void;
    setLoginPassword: (password: string) => void;
    setRegisterEmail: (email: string) => void;
    setRegisterPassword: (password: string) => void;
    setRegisterRePassword: (password: string) => void;
    setResetPassword: (password: string) => void;
    setResetRePassword: (password: string) => void;
    setForgotEmail: (password: string) => void;
    reset: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
    loginName: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
    registerRePassword: "",
    resetPassword: "",
    resetRePassword: "",
    forgotEmail: "",
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        setLoginName: (name) => set(() => ({ loginName: name })),
        setLoginPassword: (password) =>
            set(() => ({ loginPassword: password })),
        setRegisterEmail: (email) => set(() => ({ registerEmail: email })),
        setRegisterPassword: (password) =>
            set(() => ({ registerPassword: password })),
        setRegisterRePassword: (password) =>
            set(() => ({ registerRePassword: password })),
        setResetPassword: (password) =>
            set(() => ({ resetPassword: password })),
        setResetRePassword: (password) =>
            set(() => ({ resetRePassword: password })),
        setForgotEmail: (email) => set(() => ({ forgotEmail: email })),
        reset: () => {
            set(defaultInitState);
        },
    }));
};
