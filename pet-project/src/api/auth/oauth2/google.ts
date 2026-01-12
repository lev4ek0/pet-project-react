import { RequestOptions, apiRequest } from "@/api/base";
import { privateAPIRequest } from "@/api/privateMiddleware";
import {
    GoogleLinkAPIResponseBody,
    GoogleLoginAPIRequestBody,
    GoogleLoginAPIResponseBody,
} from "@/types/oauth2/google";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function googleLinkAPI(
    isPrivate: boolean,
    router: AppRouterInstance | undefined = undefined,
) {
    const requestOptions: RequestOptions = {
        path: "/auth/oauth2/google_link",
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    if (isPrivate && router) {
        return await privateAPIRequest<GoogleLinkAPIResponseBody>(
            requestOptions,
            router,
        );
    }
    return await apiRequest<GoogleLinkAPIResponseBody>(requestOptions);
}

export async function googleUnlinkAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/auth/oauth2/remove/google",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };

    return await privateAPIRequest<GoogleLinkAPIResponseBody>(
        requestOptions,
        router,
    );
}

export async function loginGoogleAPI(body: GoogleLoginAPIRequestBody) {
    const queryParams = new URLSearchParams({
        code: body.code,
        state: body.state,
    }).toString();

    const requestOptions: RequestOptions = {
        path: `/auth/oauth2/google?${queryParams}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return await apiRequest<GoogleLoginAPIResponseBody>(requestOptions);
}
