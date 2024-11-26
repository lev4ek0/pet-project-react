import { NextRequest } from "next/server";
import { getIsPublicPath } from "../shared/prefixes";

export async function roomHandler(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPublicPath = getIsPublicPath(pathname);

    if (!pathname.startsWith("/room") && !isPublicPath) {
        // const room_id = await getCookie("room_id");
        // if (room_id !== undefined) {
        //     return NextResponse.redirect(new URL("/room", request.url));
        // }
    }
}
