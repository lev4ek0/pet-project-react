import "server-only";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ignoreHandler } from "./server/routing/ignore";
import { googleHandler, vkHandler } from "./server/routing/oauth";
import { verifyHandler } from "./server/routing/verify";
import { loginHandler } from "./server/routing/login";
import { roomHandler } from "./server/routing/room";

export async function middleware(request: NextRequest) {
    const handlers = [
        ignoreHandler,
        vkHandler,
        googleHandler,
        verifyHandler,
        loginHandler,
        roomHandler,
    ];

    for (const handler of handlers) {
        const response = await handler(request);
        if (response) {
            return response;
        }
    }

    return NextResponse.next();
}
