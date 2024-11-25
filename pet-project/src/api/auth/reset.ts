import { ResetAPIRequestBody } from "@/types/auth/reset";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function resetAPI(body: ResetAPIRequestBody) {
    const bodyString = JSON.stringify(body);

    const requestOptions: RequestOptions = {
        path: "/auth/reset-password",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await apiRequest<ResetAPIRequestBody>(requestOptions);
}
