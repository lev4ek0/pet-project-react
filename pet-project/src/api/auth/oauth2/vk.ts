import { RequestOptions, apiRequest } from "@/api/base";
import { privateAPIRequest } from "@/api/privateMiddleware";
import {
    VkLinkAPIResponseBody,
    VkLoginAPIRequestBody,
    VkLoginAPIResponseBody,
} from "@/types/oauth2/vk";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function vkLinkAPI(
    isPrivate: boolean,
    router: AppRouterInstance | undefined = undefined,
) {
    const requestOptions: RequestOptions = {
        path: "/auth/oauth2/vk_link",
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    if (isPrivate && router) {
        return await privateAPIRequest<VkLinkAPIResponseBody>(
            requestOptions,
            router,
        );
    }
    return await apiRequest<VkLinkAPIResponseBody>(requestOptions);
}

export async function vkUnlinkAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/auth/oauth2/remove/vk",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };

    return await privateAPIRequest<VkLinkAPIResponseBody>(
        requestOptions,
        router,
    );
}

export async function loginVkAPI(body: VkLoginAPIRequestBody) {
    const queryParams = new URLSearchParams({
        code: body.code,
        device_id: body.device_id,
        state: body.state,
    }).toString();

    const requestOptions: RequestOptions = {
        path: `/auth/oauth2/vk?${queryParams}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return await apiRequest<VkLoginAPIResponseBody>(requestOptions);
}
