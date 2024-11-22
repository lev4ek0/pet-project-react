export interface RefreshAPIRequestBody {
    refresh_token: string
}

export interface RefreshAPIResponseBody {
    access_token: string
    refresh_token: string
    token_type: string
}
