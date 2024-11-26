import { RefreshAPIRequestBody, RefreshAPIResponseBody } from "@/types/refresh";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function refreshAPI(body: RefreshAPIRequestBody) {
    const bodyString = JSON.stringify(body);

    const requestOptions: RequestOptions = {
        path: "/auth/jwt/refresh",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await apiRequest<RefreshAPIResponseBody>(requestOptions);
}
