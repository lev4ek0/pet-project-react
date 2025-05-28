import { loginGoogleAPI } from "@/api/auth/oauth2/google";
import { loginVkAPI } from "@/api/auth/oauth2/vk";
import { setAccess, setRefresh } from "@/utils/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function vkHandler(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

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
                        `error${index}=${encodeURIComponent(error.message)}`,
                )
                .join("&");

            url += `?${errorParams}`;
        }

        return NextResponse.redirect(new URL(url, request.url));
    }
}

export async function googleHandler(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

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
                        `error${index}=${encodeURIComponent(error.message)}`,
                )
                .join("&");

            url += `?${errorParams}`;
        }

        return NextResponse.redirect(new URL(url, request.url));
    }
}
