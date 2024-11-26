import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";
import { GetRoomAPIResponseBody } from "./types/get";

export default async function readyRoomAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/game/room/ready",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<GetRoomAPIResponseBody>(
        requestOptions,
        router,
    );
}
