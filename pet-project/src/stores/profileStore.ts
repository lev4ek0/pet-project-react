import { createStore } from 'zustand/vanilla';

export type ProfileState = {
    newEmail?: string;
    updatedAt?: number;
};

export type ProfileActions = {
    setNewEmail: (newEmail?: string) => void;
};

export type ProfileStore = ProfileState & ProfileActions;

const localStorageKey = 'profile-storage';
const loadStateFromLocalStorage = (): ProfileState => {
    try {
        if (typeof window === 'undefined') {
            return {}
        }
        const serializedState = localStorage.getItem(localStorageKey);
        if (serializedState !== null) {
            return JSON.parse(serializedState);
        }
    } catch (error) {
        console.error('Could not load state from localStorage', error);
    }
    return {};
};

const saveStateToLocalStorage = (state: ProfileState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(localStorageKey, serializedState);
    } catch (error) {
        console.error('Could not save state to localStorage', error);
    }
};

export const createProfileStore = () => {
    const store = createStore<ProfileStore>((set) => {
        const initialState = loadStateFromLocalStorage();

        const setStateAndPersist = (newState: Partial<ProfileState>) => {
            set((state) => {
                const updatedState = { ...state, ...newState };
                saveStateToLocalStorage(updatedState);
                return updatedState;
            });
        };

        return {
            ...initialState,
            setNewEmail: (newEmail) => setStateAndPersist({ newEmail: newEmail, updatedAt: Math.floor(new Date().getTime() / 1000) }),
        };
    });

    return store;
};
