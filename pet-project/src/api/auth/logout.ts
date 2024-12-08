import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";

export default async function logoutAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/auth/jwt/logout/",
        method: "POST",
    };
    await privateAPIRequest(requestOptions, router);
}
