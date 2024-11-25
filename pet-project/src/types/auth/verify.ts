export interface VerifyAPIRequestBody {
    token: string;
}

export interface VerifyAPIResponseBody {
    access_token: string;
    refresh_token: string;
    token_type: string;
}
