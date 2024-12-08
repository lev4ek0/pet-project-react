import { addNewAnimalPropertyAPI } from "@/api/game/evolution";
import { Animal, Card } from "@/api/game/types/get";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface GameState {
    myCards: Card[] | number;
    myAnimals: Animal[];
    cardsList: Card[];
    animalsList: Animal[];
    startIndexCard: number;
    endIndexCard: string;
    excludedAnimal: string;
}

export async function handleClick(
    event: React.MouseEvent<HTMLDivElement>,
    setExcludedAnimalId: (excludedAnimalId?: string) => void,
    addAlerts: (messages: string[], timeout?: number) => void,
    router: AppRouterInstance,
    cardMovingId?: string,
    excludedAnimalId?: string,
) {
    let animalId: string | null = "";

    if (
        event.target instanceof HTMLElement &&
        event.target instanceof Element &&
        event.target?.parentNode instanceof Element &&
        event.target?.parentNode?.parentNode instanceof Element &&
        event.target.parentNode.parentNode.getAttribute("data-key")
    ) {
        animalId = event.target.parentNode.parentNode.getAttribute("data-key");
    } else if (
        event.target instanceof HTMLElement &&
        event.target instanceof Element &&
        event.target?.parentNode instanceof Element &&
        event.target.parentNode.getAttribute("data-key")
    ) {
        animalId = event.target.parentNode.getAttribute("data-key");
    } else if (
        event.target instanceof HTMLElement &&
        event.target instanceof Element &&
        event.target.getAttribute("data-key")
    ) {
        animalId = event.target.getAttribute("data-key");
    }

    if (animalId && excludedAnimalId) {
        async function addNewAnimalProperty() {
            const { errors } = await addNewAnimalPropertyAPI(
                router,
                cardMovingId || "",
                [animalId || "", excludedAnimalId || ""],
                "00000000-0000-0000-0000-000000000004",
            );
            addAlerts(errors);
        }

        addNewAnimalProperty();
    }
    setExcludedAnimalId(undefined);
}
