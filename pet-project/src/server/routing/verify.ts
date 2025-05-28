import verifyAPI from "@/api/auth/verify";
import { setAccess, setRefresh } from "@/utils/auth/server";
import { NextRequest, NextResponse } from "next/server";

export async function verifyHandler(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (pathname.startsWith("/auth/verify")) {
        const token = searchParams.get("token");
        let url = "/login";
        if (token) {
            const { data, errors } = await verifyAPI({ token });
            if (data) {
                await setAccess(data?.access_token);
                await setRefresh(data?.refresh_token);
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
        }

        return NextResponse.redirect(new URL(url, request.url));
    }
}
