import { getAccess } from "@/utils/auth/client";

export interface RequestOptions {
    path: string;
    method: string;
    body?: string | FormData;
    headers?: HeadersInit;
}

export default interface ApiResponse<T> {
    errors: string[];
    data: T | null;
    isOk: boolean;
    statusCode: number;
}


type Error = {
    code: string;
    message: string
}
type ApiErrorResponse = {
    errors?: Error[];
    non_field_errors?: Error[];
};


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const MAP_ERRORS: Record<string, string> = {
    user_bad_username: "Неверное имя пользователя или пароль",
    user_bad_password: "Неверное имя пользователя или пароль",
};


export async function apiRequest<T>(options: RequestOptions): Promise<ApiResponse<T>> {
    const { path, method, body, headers } = options
    const url = BASE_URL + path
    const access = getAccess()

    const requestOptions: RequestInit = {
        method,
        headers: {
            ...headers,
            'Authorization': access ? `Bearer ${access}` : ''
        },
        body: body,
    };

    try {
        const response = await fetch(url, requestOptions);
        const text = await response.text();
        let responseBody: T | ApiErrorResponse | null = null;
        try {
            responseBody = JSON.parse(text);
        } catch {
            responseBody = null
        }

        if (!response.ok) {
            const allErrors = [
                ...((responseBody as ApiErrorResponse)?.errors || []),
                ...((responseBody as ApiErrorResponse)?.non_field_errors || [])
            ];

            const errors = allErrors.map(
                (err) => MAP_ERRORS[err.code] || err.message || `Код ошибки: ${err.code}`
            )

            return { errors, data: null, isOk: false, statusCode: response.status };
        }

        return { errors: [], data: responseBody as T, isOk: true, statusCode: response.status };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { errors: [error.message], data: null, isOk: false, statusCode: 500 };
        }

        return { errors: ['Непредвиденная ошибка'], data: null, isOk: false, statusCode: 500 };
    }
}
