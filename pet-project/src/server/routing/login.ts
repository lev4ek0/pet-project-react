import refreshAPI from "@/api/auth/refresh";
import { decrypt } from "@/app/lib/session";
import { isExpiredToken } from "@/utils/auth/common";
import {
    deleteAccess,
    deleteRefresh,
    getAccessPayload,
    getRefresh,
    setAccess,
    setRefresh,
} from "@/utils/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { getIsPublicPath } from "../shared/prefixes";

export async function loginHandler(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const payloadAccess = await getAccessPayload();

    const isPublicPath = getIsPublicPath(pathname);

    if (!isPublicPath && isExpiredToken(payloadAccess)) {
        const refresh = (await getRefresh())?.value;
        const payloadRefresh = decrypt(refresh);

        if (!refresh || !payloadRefresh || isExpiredToken(payloadRefresh)) {
            await deleteAccess();
            await deleteRefresh();
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const body = { refresh_token: refresh };

        const { data } = await refreshAPI(body);

        if (!data) {
            await deleteAccess();
            await deleteRefresh();
            return NextResponse.redirect(new URL("/login", request.url));
        }

        await setAccess(data.access_token);
        await setRefresh(data.refresh_token);
    }

    if (isPublicPath && !isExpiredToken(payloadAccess)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}
