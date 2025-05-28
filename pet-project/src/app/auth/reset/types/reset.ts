export interface ResetAPIRequestBody {
    token: string;
    password: string;
    re_password: string;
}

export interface ResetAPIResponseBody {
    access_token: string;
    refresh_token: string;
}
