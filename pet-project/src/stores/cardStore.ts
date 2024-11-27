import { GetGameAPIResponseBody } from "@/api/game/types/get";
import { createStore } from "zustand/vanilla";

interface Chances {
    [key: string]: number;
}

interface CardPropertyWithName {
    id: string;
    name: string;
    chances?: Chances;
}

interface CardWithName {
    id: string;
    name: string;
    properties: CardPropertyWithName[];
}

interface CardProperty {
    id: string;
    chances?: Chances;
}

export interface Card {
    id: string;
    properties: CardProperty[];
}

interface AnimalProperty {
    id: string;
    chances: null | number;
    connected_animal_id: string | null;
    is_activated: boolean;
}
interface Animal {
    id: string;
    properties: AnimalProperty[];
    food: number;
    fat_food: number;
}

interface MePlayer {
    id: string;
    cards: Card[];
    animals: Animal[];
}

interface OpponentPlayer {
    id: string;
    cardsAmount: number;
    animals: Animal[];
}

export interface Results {
    players: PlayerResult[];
}

export interface PlayerResult {
    id: string;
    place: number;
    rating: number;
    coins: number;
    points: number;
}

export interface MoveOrder {
    is_fold: boolean;
    player_id: string;
}

// State including cards and properties
type StoreState = {
    propertyMovingId?: string;
    phase: string;
    cards_left: number;
    etl: number;
    results: Results | null;
    moveOrder: MoveOrder[];
    me: MePlayer;
    opponents: OpponentPlayer[];
    cards: CardWithName[];
    properties: CardPropertyWithName[];
};

// Actions to manipulate cards and properties
type StoreActions = {
    createFromGame: (game: GetGameAPIResponseBody) => void;
    setEtl: (etl: number) => void;
    // addAnimal: (userId: string, animalId: string, cardId: string) => void;
    // addProperty: (userId: string, animalIds: string[], propertyId: string, cardId: string) => void;
    // activateProperty: (myAnimalId: string, opponentAnimalId: string, propertyId: string) => void;
    // eatFromFoodBase: (animalId: string) => void;
    // nextMove: (userId: string) => void;
    // changeEtl: (etl: number) => void;
    // fold: (userId: string, isFold: boolean) => void;
    setPropertyMovingId: (propertyMovingId?: string) => void;
    updateCards: (cards: CardWithName[]) => void;
    updateProperties: (properties: CardPropertyWithName[]) => void;
    // Other actions can be added here if needed
};

// Combined Store Type
export type CardStore = StoreState & StoreActions;

const localStorageKey = "card-and-property-storage";

// Load the state from localStorage
const loadStateFromLocalStorage = (): StoreState => {
    try {
        if (typeof window === "undefined")
            return {
                phase: "evolution",
                cards_left: 0,
                etl: 30,
                moveOrder: [],
                results: null,
                me: { id: "", cards: [], animals: [] },
                opponents: [],
                cards: [],
                properties: [],
            };

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
    return {
        phase: "evolution",
        cards_left: 0,
        etl: 30,
        results: null,
        moveOrder: [],
        me: { id: "", cards: [], animals: [] },
        opponents: [],
        cards: [],
        properties: [],
    };
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
            createFromGame: (game) => {
                const me = game.users.find((user) =>
                    typeof user.cards === "number" ? false : true,
                );
                if (!me) {
                    return console.error("Dont have my user");
                }
                const opponents = game.users.filter((user) =>
                    typeof user.cards === "number" ? true : false,
                );
                const mePlayer = {
                    id: me.id,
                    cards: me.cards as unknown as Card[],
                    animals: me.animals,
                };
                const opponentPlayers = opponents.map((opponent) => ({
                    id: opponent.id,
                    cardsAmount: opponent.cards as unknown as number,
                    animals: opponent.animals,
                }));

                setStateAndPersist({
                    etl: game.etl,
                    phase: game.phase,
                    cards_left: game.cards_left,
                    results: game.results,
                    moveOrder: game.move_order,
                    me: mePlayer,
                    opponents: opponentPlayers,
                });
            },
            // addAnimal: (userId: string, animalId: string, cardId: string) => {
            //     if (initialState.me.id === userId){
            //         initialState.me.animals.push
            //         setStateAndPersist({me: initialState.me})
            //     }
            // },
            setPropertyMovingId: (propertyMovingId?) =>
                setStateAndPersist({
                    propertyMovingId,
                }),
            setEtl: (etl) =>
                setStateAndPersist({
                    etl,
                }),
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
