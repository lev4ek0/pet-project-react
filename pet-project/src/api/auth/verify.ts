import { VerifyAPIRequestBody, VerifyAPIResponseBody } from "@/types/verify";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function verifyAPI(body: VerifyAPIRequestBody) {
    const requestOptions: RequestOptions = {
        path: `/auth/verify?token=${encodeURIComponent(body.token)}`,
        method: "GET",
    }

    return await apiRequest<VerifyAPIResponseBody>(requestOptions);
}
