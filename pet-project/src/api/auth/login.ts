import { LoginAPIResponseBody } from "@/app/login/types/login";
import { apiRequest } from "../base";
import { RequestOptions } from "../base";

export default async function loginAPI(body: FormData) {
    const requestOptions: RequestOptions = {
        path: "/auth/jwt/create",
        method: "POST",
        body: body,
    };
    return await apiRequest<LoginAPIResponseBody>(requestOptions);
}
