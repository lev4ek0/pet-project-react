import { VerifyAPIRequestBody, VerifyAPIResponseBody } from "@/types/auth/verify";
import { apiRequest } from "../base";
import { RequestOptions } from "../base"

export default async function verifyAPI(body: VerifyAPIRequestBody) {
    const requestOptions: RequestOptions = {
        path: `/auth/verify?token=${encodeURIComponent(body.token)}`,
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    return await apiRequest<VerifyAPIResponseBody>(requestOptions)
}
