import "server-only";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "./app/lib/session";
import refreshAPI from "./api/auth/refresh";
import {
    deleteAccess,
    deleteRefresh,
    getAccessPayload,
    getRefresh,
    setAccess,
    setRefresh,
} from "./utils/auth/server";
import { isExpiredToken } from "./utils/auth/common";
import verifyAPI from "./api/auth/verify";
import { loginVkAPI } from "./api/auth/oauth2/vk";
import { loginGoogleAPI } from "./api/auth/oauth2/google";

const PUBLIC_FILE = /\.(.*)$/;
const PUBLIC_PREFIXES = ["/login", "/register", "/auth"];

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        PUBLIC_FILE.test(pathname)
    )
        return NextResponse.next();

    const payloadAccess = await getAccessPayload();

    if (pathname.startsWith("/auth/oauth2/vk")) {
        const deviceId = searchParams.get("device_id");
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        let url = "/login";

        const { data, errors } = await loginVkAPI({
            device_id: deviceId || "",
            code: code || "",
            state: state || "",
        });
        if (data) {
            setAccess(data?.access_token);
            setRefresh(data?.refresh_token);
        }
        if (errors && errors.length > 0) {
            const errorParams = errors
                .map(
                    (error, index) =>
                        `error${index}=${encodeURIComponent(error)}`,
                )
                .join("&");

            url += `?${errorParams}`;
        }

        return NextResponse.redirect(new URL(url, request.url));
    }

    if (pathname.startsWith("/auth/oauth2/google")) {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        let url = "/login";

        const { data, errors } = await loginGoogleAPI({
            code: code || "",
            state: state || "",
        });
        if (data) {
            setAccess(data?.access_token);
            setRefresh(data?.refresh_token);
        }
        if (errors && errors.length > 0) {
            const errorParams = errors
                .map(
                    (error, index) =>
                        `error${index}=${encodeURIComponent(error)}`,
                )
                .join("&");

            url += `?${errorParams}`;
        }

        return NextResponse.redirect(new URL(url, request.url));
    }

    if (pathname.startsWith("/auth/verify")) {
        const token = searchParams.get("token");
        let url = "/login";
        if (token) {
            const { data, errors } = await verifyAPI({ token });
            if (data) {
                setAccess(data?.access_token);
                setRefresh(data?.refresh_token);
            }
            if (errors && errors.length > 0) {
                const errorParams = errors
                    .map(
                        (error, index) =>
                            `error${index}=${encodeURIComponent(error)}`,
                    )
                    .join("&");

                url += `?${errorParams}`;
            }
        }

        return NextResponse.redirect(new URL(url, request.url));
    }

    const isNotPublicPath = !PUBLIC_PREFIXES.some((prefix) =>
        pathname.startsWith(prefix),
    );

    if (isNotPublicPath && isExpiredToken(payloadAccess)) {
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

        return NextResponse.next();
    }

    if (!isNotPublicPath && !isExpiredToken(payloadAccess)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
