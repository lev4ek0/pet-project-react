import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_FILE } from "@/server/constants";

export async function ignoreHandler(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }
}
