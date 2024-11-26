export interface GoogleLinkAPIResponseBody {
    url: string;
}

export interface GoogleLoginAPIRequestBody {
    code: string;
    state: string;
}

export interface GoogleLoginAPIResponseBody {
    access_token: string;
    refresh_token: string;
    token_type: string;
}
