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
    message: string;
};

type ApiErrorResponse = {
    errors?: Error[];
    non_field_errors?: Error[];
    detail?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const MAP_ERRORS: Record<string, string> = {
    incorrect_email: "Почта неправильного формата",
    user_bad_username: "Неверное имя пользователя или пароль",
    user_bad_password: "Неверное имя пользователя или пароль",
    verify_user_bad_token: "Неправильная ссылка подтверждения пользователя",
    verify_user_already_verified: "Пользователь уже подтвержден",
    verify_user_token_expired: "Ссылка подтверждения пользователя устарела",
    passwords_mismatch: "Пароли не совпадают",
    same_password: "Введите новый пароль, отличный от старого",
    weak_password:
        "Пароль должен быть минимум 8 символов в длину, содержать заглавную и маленькую букву",
    reset_password_bad_token: "Неправильная ссылка сброса пароля",
    user_inactive: "Доступ пользователю ограничен",
    user_not_exist: "Пользователь не существует",
    user_not_verified: "Аккаунт пользователя не подтвержден",
    email_belongs_to_another_user: "Почта принадлежит другому пользователю",
    wrong_input: "Непредвиденная ошибка",
    register_user_already_exists: "Пользователь с такой почтой уже существует",
    register_invalid_password:
        "Пароль должен быть минимум 8 символов в длину, содержать заглавную и маленькую букву",
    internal_service_unavailable:
        "Один из внутренних сервисов не отвечает. Пожалуйста, попробуйте позже",
    oauth_not_available_email:
        "Укажите почту в стороннем сервисе и попробуйте войти снова",
    "Player is already in room": "Вы уже в комнате",
    "value is not a valid email address: The email address is not valid. It must have exactly one @-sign.":
        "Почта должна содержать ровно один знак @",
    "value is not a valid email address: There must be something after the @-sign.":
        "После знака @ должен быть еще текст",
    "value is not a valid email address: An email address cannot end with a period.":
        "Почта не может заканчиваться на точку",
    "value is not a valid email address: There must be something before the @-sign.":
        "Перед знаком @ должен быть еще текст",
    "value is not a valid email address: An email address cannot have a period immediately before the @-sign.":
        "В почте не может быть точки перед знаком @",
    "value is not a valid email address: An email address cannot start with a period.":
        "Почта не может начинаться с точки",
    "String should have at least 3 characters":
        "Должно быть как минимум 3 символ",
    "String should have at most 20 characters":
        "Должно быть не более 20 символов",
};

export async function apiRequest<T>(
    options: RequestOptions,
): Promise<ApiResponse<T>> {
    const { path, method, body, headers } = options;
    const url = BASE_URL + path;
    const access = getAccess();

    const requestOptions: RequestInit = {
        method,
        headers: {
            ...headers,
            Authorization: access ? `Bearer ${access}` : "",
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
            responseBody = null;
        }

        if (!response.ok) {
            const detail = (responseBody as ApiErrorResponse)?.detail || "";
            const allErrors = [
                ...((responseBody as ApiErrorResponse)?.errors || []),
                ...((responseBody as ApiErrorResponse)?.non_field_errors || []),
            ];
            if (detail) allErrors.push({ code: detail, message: detail });

            const errors = allErrors.map(
                (err) =>
                    MAP_ERRORS[err.code] ||
                    MAP_ERRORS[err.message] ||
                    err.message ||
                    `Код ошибки: ${err.code}`,
            );

            return {
                errors,
                data: null,
                isOk: false,
                statusCode: response.status,
            };
        }

        return {
            errors: [],
            data: responseBody as T,
            isOk: true,
            statusCode: response.status,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: [error.message],
                data: null,
                isOk: false,
                statusCode: 500,
            };
        }

        return {
            errors: ["Непредвиденная ошибка"],
            data: null,
            isOk: false,
            statusCode: 500,
        };
    }
}
