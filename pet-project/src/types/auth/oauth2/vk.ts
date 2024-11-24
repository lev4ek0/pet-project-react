export interface VkLinkAPIResponseBody {
    url: string
}

export interface VkLoginAPIRequestBody {
    device_id: string,
    code: string,
    state: string,
}

export interface VkLoginAPIResponseBody {
    access_token: string
    refresh_token: string
    token_type: string
}
