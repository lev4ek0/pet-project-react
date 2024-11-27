import { Animal, Property, Card } from "@/api/game/types/get";
import { Dispatch, SetStateAction } from "react";

export interface GameState {
    myCards: Card[] | number;
    myAnimals: Animal[];
    cardsList: Card[];
    animalsList: Animal[];
    startIndexCard: number;
    endIndexCard: string;
    excludedAnimal: string;
}

export function handleClickOutside(
    setIsDark: (isDark: boolean) => void,
    setMyState: Dispatch<SetStateAction<GameState>>,
    gameState: GameState,
    event: MouseEvent,
) {
    if (
        event.target instanceof HTMLElement &&
        event.target.classList.contains("bg-card") &&
        event.target instanceof Element &&
        event.target?.parentNode instanceof Element
    ) {
        const animalId = event.target.parentNode.getAttribute(
            "data-rfd-draggable-id",
        );
        const card = gameState.cardsList.slice(
            gameState.startIndexCard,
            gameState.startIndexCard + 1,
        );

        gameState.animalsList.forEach((animal: Animal) => {
            if (animalId === animal.id) {
                if (
                    animal.properties.some(
                        (animalProp) =>
                            animalProp.connected_animal_id === null &&
                            animalProp.id ===
                                "00000000-0000-0000-0000-000000000004",
                    )
                ) {
                    setIsDark(false);
                    setMyState({
                        myCards: gameState.cardsList,
                        myAnimals: gameState.animalsList,
                        cardsList: gameState.cardsList,
                        animalsList: gameState.animalsList,
                        startIndexCard: gameState.startIndexCard,
                        endIndexCard: gameState.endIndexCard,
                        excludedAnimal: gameState.excludedAnimal,
                    });
                    throw Error;
                }
                const propertyCooperation: Property = card[0].properties.filter(
                    (property) =>
                        property.id === "00000000-0000-0000-0000-000000000004",
                )[0];
                const animalProperty = {
                    id: propertyCooperation.id,
                    chances: propertyCooperation.chances,
                    connected_animal_id: null,
                    is_activated: false,
                };
                animal.properties.push(animalProperty);
            }
        });
        gameState.animalsList.forEach((animal: Animal) => {
            if (gameState.endIndexCard === animal.id) {
                const propertyCooperation: Property = card[0].properties.filter(
                    (property) =>
                        property.id === "00000000-0000-0000-0000-000000000004",
                )[0];
                const animalProperty = {
                    id: propertyCooperation.id,
                    chances: propertyCooperation.chances,
                    connected_animal_id: animalId,
                    is_activated: false,
                };
                animal.properties.push(animalProperty);
            }
        });
        gameState.cardsList.splice(gameState.startIndexCard, 1);
    }
    setIsDark(false);
    setMyState({
        myCards: gameState.cardsList,
        myAnimals: gameState.animalsList,
        cardsList: gameState.cardsList,
        animalsList: gameState.animalsList,
        startIndexCard: gameState.startIndexCard,
        endIndexCard: gameState.endIndexCard,
        excludedAnimal: gameState.excludedAnimal,
    });
}
