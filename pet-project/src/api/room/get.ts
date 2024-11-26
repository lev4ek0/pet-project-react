import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";
import { GetRoomAPIResponseBody } from "./types/get";

export default async function getRoomAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/game/room",
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<GetRoomAPIResponseBody>(
        requestOptions,
        router,
    );
}
