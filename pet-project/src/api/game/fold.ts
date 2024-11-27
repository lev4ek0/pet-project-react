import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";

export async function foldAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/game/game/move/fold",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<null>(requestOptions, router);
}
