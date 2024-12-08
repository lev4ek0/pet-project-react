import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";

export async function activatePropertyAPI(
    router: AppRouterInstance,
    myAnimalId: string,
    propertyId: string,
    OpponentAnimalId?: string,
) {
    const bodyString = JSON.stringify({
        my_animal_id: myAnimalId,
        opponent_animal_id: OpponentAnimalId,
        property_id: propertyId,
    });

    const requestOptions: RequestOptions = {
        path: "/game/game/move/activate_property",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<null>(requestOptions, router);
}

export async function eatFromFoodBaseAPI(
    router: AppRouterInstance,
    animalId: string,
) {
    const bodyString = JSON.stringify({
        animal_id: animalId,
    });

    const requestOptions: RequestOptions = {
        path: "/game/game/move/eat_from_food_base",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<null>(requestOptions, router);
}
