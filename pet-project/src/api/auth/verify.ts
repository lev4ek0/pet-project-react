import { VerifyAPIRequestBody, VerifyAPIResponseBody } from "@/types/verify";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function verifyAPI(body: VerifyAPIRequestBody) {
    const bodyString = JSON.stringify({ token: body.token });

    const requestOptions: RequestOptions = {
        path: "/auth/verify/",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await apiRequest<VerifyAPIResponseBody>(requestOptions);
}
