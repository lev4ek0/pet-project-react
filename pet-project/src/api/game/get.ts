import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";
import { GetGameAPIResponseBody } from "./types/get";

export default async function getGameAPI(
    router: AppRouterInstance,
    roomId: string,
) {
    const requestOptions: RequestOptions = {
        path: "/game/game/" + roomId,
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<GetGameAPIResponseBody>(
        requestOptions,
        router,
    );
}
