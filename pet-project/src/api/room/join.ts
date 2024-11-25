import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";
import { JoinRoomAPIRequestBody, JoinRoomAPIResponseBody } from "./types/join";

export default async function joinRoomAPI(
    router: AppRouterInstance,
    body: JoinRoomAPIRequestBody,
) {
    const bodyString = JSON.stringify(body);

    const requestOptions: RequestOptions = {
        path: "/game/room/join",
        method: "POST",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<JoinRoomAPIResponseBody>(
        requestOptions,
        router,
    );
}
