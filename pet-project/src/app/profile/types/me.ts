export interface OauthAccount {
    oauth_name: string;
    account_email: string;
}

export interface MeAPIResponseBody {
    email: string;
    nickname: string;
    is_verified: boolean;
    avatar_url: string;
    id: string;
    oauth_accounts: OauthAccount[];
}

export interface MeAPIRequestBody {
    nickname?: string;
    email?: string;
    password?: string;
    re_password?: string;
    old_password?: string;
}
