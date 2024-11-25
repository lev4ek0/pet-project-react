import { ForgotAPIRequestBody } from "@/types/auth/forgot";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function forgotAPI(body: ForgotAPIRequestBody) {
    const bodyString = JSON.stringify(body);

    const requestOptions: RequestOptions = {
        path: "/auth/forgot-password",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await apiRequest<ForgotAPIRequestBody>(requestOptions);
}
