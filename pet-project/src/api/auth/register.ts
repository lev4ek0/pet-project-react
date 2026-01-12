import { RegisterAPIRequestBody } from "@/app/register/types/register";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function registerAPI(body: RegisterAPIRequestBody) {
    const bodyString = JSON.stringify(body);

    const requestOptions: RequestOptions = {
        path: "/auth/register",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await apiRequest<RegisterAPIRequestBody>(requestOptions);
}
