export interface TelegramBotUsernameAPIResponseBody {
    username: string;
}

export interface TelegramLoginAPIRequestBody {
    device_id: string;
    code: string;
    state: string;
}

export interface TelegramLoginAPIResponseBody {
    access_token: string;
    refresh_token: string;
    token_type: string;
}
