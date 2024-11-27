import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function getCardAPI() {
    const requestOptions: RequestOptions = {
        path: "/game/cards",
        method: "GET",
    };
    return await apiRequest<Card[]>(requestOptions);
}
