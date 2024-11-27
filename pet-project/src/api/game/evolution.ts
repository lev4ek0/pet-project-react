import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";

export async function addNewAnimalAPI(
    router: AppRouterInstance,
    cardId: string,
) {
    const bodyString = JSON.stringify({ card_id: cardId });

    const requestOptions: RequestOptions = {
        path: "/game/game/move/new_animal",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<null>(requestOptions, router);
}

export async function addNewAnimalPropertyAPI(
    router: AppRouterInstance,
    cardId: string,
    animalIds: string[],
    propertyId?: string,
) {
    const bodyString = JSON.stringify({
        card_id: cardId,
        animal_ids: animalIds,
        property_id: propertyId,
    });

    const requestOptions: RequestOptions = {
        path: "/game/game/move/add_property",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<null>(requestOptions, router);
}
