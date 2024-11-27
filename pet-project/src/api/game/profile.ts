import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";
import { GameProfileAPIResponseBody } from "./types/profile";

export default async function getGameProfileAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/game/profile",
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<GameProfileAPIResponseBody>(
        requestOptions,
        router,
    );
}
