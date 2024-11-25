"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type AlertStore, createAlertStore } from "@/stores/alertsStore";

export type AlertStoreApi = ReturnType<typeof createAlertStore>;

export const AlertStoreContext = createContext<AlertStoreApi | undefined>(
    undefined,
);

export interface AlertStoreProviderProps {
    children: ReactNode;
}

export const AlertStoreProvider = ({ children }: AlertStoreProviderProps) => {
    const storeRef = useRef<AlertStoreApi>();
    if (!storeRef.current) {
        storeRef.current = createAlertStore();
    }

    return (
        <AlertStoreContext.Provider value={storeRef.current}>
            {children}
        </AlertStoreContext.Provider>
    );
};

export const useAlertStore = <T,>(selector: (store: AlertStore) => T): T => {
    const alertStoreContext = useContext(AlertStoreContext);

    if (!alertStoreContext) {
        throw new Error(`useAlertStore must be used within AlertStoreProvider`);
    }

    return useStore(alertStoreContext, selector);
};
