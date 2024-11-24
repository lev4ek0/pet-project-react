import { createStore } from 'zustand/vanilla'

export type AuthState = {
    loginName: string,
    loginPassword: string,
    registerEmail: string,
    registerPassword: string,
    registerRePassword: string,
}

export type AuthActions = {
    setLoginName: (name: string) => void;
    setLoginPassword: (password: string) => void;
    setRegisterEmail: (email: string) => void;
    setRegisterPassword: (password: string) => void;
    setRegisterRePassword: (password: string) => void;
    reset: () => void,
};

export type AuthStore = AuthState & AuthActions

export const defaultInitState: AuthState = {
    loginName: '',
    loginPassword: '',
    registerEmail: '',
    registerPassword: '',
    registerRePassword: '',
}

export const createAuthStore = (
    initState: AuthState = defaultInitState,
) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        setLoginName: (name) => set(() => ({ loginName: name })),
        setLoginPassword: (password) => set(() => ({ loginPassword: password })),
        setRegisterEmail: (email) => set(() => ({ registerEmail: email })),
        setRegisterPassword: (password) => set(() => ({ registerPassword: password })),
        setRegisterRePassword: (password) => set(() => ({ registerRePassword: password })),
        reset: () => {set(defaultInitState)},
    }));
}
