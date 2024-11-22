import { apiRequest } from "../base";
import { RequestOptions } from "../base"

export default async function logoutAPI() {
    const requestOptions: RequestOptions = {
        path: "/auth/jwt/logout",
        method: "POST",
    }
    await apiRequest(requestOptions)
}