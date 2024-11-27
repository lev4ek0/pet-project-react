import { apiRequest } from "../base";
import { RequestOptions } from "../base";
import { CardProperty } from "../cards/types/card";

export default async function getCardPropertiesAPI() {
    const requestOptions: RequestOptions = {
        path: "/game/card_properties",
        method: "GET",
    };
    return await apiRequest<CardProperty[]>(requestOptions);
}
