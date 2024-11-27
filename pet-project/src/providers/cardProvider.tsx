"use client";

import { createContext, useRef, useContext, type ReactNode } from "react";
import { useStore } from "zustand";

import {
    type CardStore,
    createStoreWithCardsAndProperties,
} from "@/stores/cardStore"; // Adjust the import path as necessary

// Define the store API type returned from the create function
export type CardStoreApi = ReturnType<typeof createStoreWithCardsAndProperties>;

// Create a context to hold the store instance
export const CardStoreContext = createContext<CardStoreApi | undefined>(
    undefined,
);

// Define Props for the CardStoreProvider
export interface CardStoreProviderProps {
    children: ReactNode;
}

// CardStoreProvider component
export const CardStoreProvider = ({ children }: CardStoreProviderProps) => {
    // useRef to store the CardStore instance
    const storeRef = useRef<CardStoreApi>();

    if (!storeRef.current) {
        // Initialize the store if it hasn't been created yet
        storeRef.current = createStoreWithCardsAndProperties();
    }

    // Provide the store to children components
    return (
        <CardStoreContext.Provider value={storeRef.current}>
            {children}
        </CardStoreContext.Provider>
    );
};

// Hook to access the CardStore
export const useCardStore = <T,>(selector: (store: CardStore) => T): T => {
    // Get the card store from the context
    const cardStoreContext = useContext(CardStoreContext);

    // Ensure the context is not undefined
    if (!cardStoreContext) {
        throw new Error("useCardStore must be used within CardStoreProvider");
    }

    // Use the store with the provided selector
    return useStore(cardStoreContext, selector);
};
