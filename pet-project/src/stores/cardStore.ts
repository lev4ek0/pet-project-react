import { createStore } from "zustand/vanilla";

interface Chances {
    [key: string]: number;
}

interface CardProperty {
    id: string;
    name: string;
    chances: Chances;
}

interface Card {
    id: string;
    name: string;
    properties: CardProperty[];
}

// State including cards and properties
type StoreState = {
    cards: Card[];
    properties: CardProperty[];
};

// Actions to manipulate cards and properties
type StoreActions = {
    updateCards: (cards: Card[]) => void;
    updateProperties: (properties: CardProperty[]) => void;
    // Other actions can be added here if needed
};

// Combined Store Type
export type CardStore = StoreState & StoreActions;

const localStorageKey = "card-and-property-storage";

// Load the state from localStorage
const loadStateFromLocalStorage = (): StoreState => {
    try {
        if (typeof window === "undefined") return { cards: [], properties: [] };

        const serializedState = localStorage.getItem(localStorageKey);
        if (serializedState !== null) {
            return JSON.parse(serializedState);
        }
    } catch (error) {
        console.error(
            "Could not load card-and-property state from localStorage",
            error,
        );
    }
    return { cards: [], properties: [] };
};

// Save the state to localStorage
const saveStateToLocalStorage = (state: StoreState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageKey, serializedState);
    } catch (error) {
        console.error(
            "Could not save card-and-property state to localStorage",
            error,
        );
    }
};

// Create the zustand store
export const createStoreWithCardsAndProperties = () => {
    const store = createStore<CardStore>((set) => {
        const initialState = loadStateFromLocalStorage();

        const setStateAndPersist = (newState: Partial<StoreState>) => {
            set((state) => {
                const updatedState = { ...state, ...newState };
                saveStateToLocalStorage(updatedState);
                return updatedState;
            });
        };

        return {
            ...initialState,
            updateCards: (cards) =>
                setStateAndPersist({
                    cards,
                }),
            updateProperties: (properties) =>
                setStateAndPersist({
                    properties,
                }),
        };
    });

    return store;
};
