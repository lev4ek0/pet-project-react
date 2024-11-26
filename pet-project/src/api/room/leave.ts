import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";

export default async function leaveRoomAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/game/room/leave",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<null>(requestOptions, router);
}
