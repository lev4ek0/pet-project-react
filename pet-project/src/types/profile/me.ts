export interface MeAPIResponseBody {
    email: string
    nickname: string
    is_verified: boolean
    avatar_url: string
    id: string
}

export interface MeAPIRequestBody {
    nickname: string
}
