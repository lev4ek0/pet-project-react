import { RequestOptions, apiRequest } from "@/api/base";
import { privateAPIRequest } from "@/api/privateMiddleware";
import {
    TelegramLoginAPIResponseBody,
    TelegramBotUsernameAPIResponseBody,
    TelegramLoginAPIRequestBody,
} from "@/types/oauth2/telegram";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function telegramBotUsernameAPI(
    isPrivate: boolean,
    router: AppRouterInstance | undefined = undefined,
) {
    const requestOptions: RequestOptions = {
        path: "/auth/oauth2/telegram_bot_username",
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    if (isPrivate && router) {
        return await privateAPIRequest<TelegramBotUsernameAPIResponseBody>(
            requestOptions,
            router,
        );
    }
    return await apiRequest<TelegramBotUsernameAPIResponseBody>(requestOptions);
}

export async function telegramUnlinkAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/auth/oauth2/remove/telegram",
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };

    return await privateAPIRequest<TelegramBotUsernameAPIResponseBody>(
        requestOptions,
        router,
    );
}

export async function loginVkAPI(body: TelegramLoginAPIRequestBody) {
    const queryParams = new URLSearchParams({
        code: body.code,
        device_id: body.device_id,
        state: body.state,
    }).toString();

    const requestOptions: RequestOptions = {
        path: `/auth/oauth2/telegram?${queryParams}`,
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };

    return await apiRequest<TelegramLoginAPIResponseBody>(requestOptions);
}
