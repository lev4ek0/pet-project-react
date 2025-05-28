import { getAccess } from "@/utils/auth/client";

export interface RequestOptions {
    path: string;
    method: string;
    body?: string | FormData;
    headers?: HeadersInit;
}

export default interface ApiResponse<T> {
    errors: ApiError[];
    data: T | null;
    isOk: boolean;
    statusCode: number;
}

type ApiError = {
    source: string;
    code: string;
    message: string;
};

type ApiErrorResponse = {
    errors?: ApiError[];
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const MAP_ERRORS: Record<string, string> = {
    // Аутентификация и управление пользователями
    invalid_refresh_token: "Недействительный токен обновления. Пожалуйста, войдите заново",
    email_exists: "Пользователь с таким email уже существует",
    token_required: "Необходима авторизация",
    invalid_or_expired_token: "Недействительный или просроченный токен",
    user_not_found_or_already_verified: "Пользователь не найден или уже верифицирован",
    user_not_found: "Пользователь не найден",
    password_already_changed: "Пароль уже был изменен",
    invalid_login: "Неверные учетные данные",
    inactive: "Учетная запись неактивна",
    password_incorrect: "Неверный пароль",
    password_mismatch: "Пароли не совпадают",
    no_active_account: "Учетная запись не найдена или неактивна",

    // Валидация пароля
    weak_password: "Пароль слишком простой",
    password_too_short: "Пароль слишком короткий",
    password_too_similar: "Пароль слишком похож на ваши личные данные",
    password_too_common: "Пароль слишком распространенный",
    password_entirely_numeric: "Пароль не может состоять только из цифр",

    // Загрузка файлов
    avatar_file_required: "Необходимо выбрать файл аватара",
    failed_to_update_avatar: "Не удалось обновить аватар",
    invalid_image: "Недопустимый формат изображения",

    // Валидация форм
    required: "Обязательное поле",
    invalid: "Недопустимое значение",
    invalid_choice: "Выбрано недопустимое значение",
    max_length: "Превышена максимальная длина",
    empty: "Поле не может быть пустым",
    contradiction: "Обнаружены противоречивые значения",
    invalid_list: "Неверный формат списка",

    // Операции с базой данных
    unique: "Такое значение уже существует у другого пользователя",
    unique_together: "Такая комбинация значений уже существует у другого пользователя",
    unique_for_date: "Значение должно быть уникальным для этой даты",
    null: "Значение не может быть пустым",
    blank: "Поле не может быть пустым",

    // Специфичные для PostgreSQL
    not_a_string: "Значение должно быть текстом",
    item_invalid: "Недопустимый элемент в массиве",
    nested_array_mismatch: "Неверная структура вложенного массива",
    missing_keys: "Отсутствуют обязательные поля",
    extra_keys: "Обнаружены лишние поля",
    invalid_json: "Неверный формат JSON",
    invalid_format: "Неверный формат",
    bound_ordering: "Неверный порядок границ",

    // GIS
    invalid_geom: "Неверная геометрия",
    invalid_geom_type: "Неверный тип геометрии",
    transform_error: "Ошибка преобразования геометрии",

    // Прочее
    ambiguous_timezone: "Неоднозначный часовой пояс",
    missing_management_form: "Отсутствует форма управления",
    too_many_forms: "Слишком много форм",
    too_few_forms: "Недостаточно форм",
    overflow: "Превышено допустимое значение",
    invalid_date: "Неверный формат даты",
    invalid_datetime: "Неверный формат даты и времени",
    invalid_time: "Неверный формат времени",
    unexpected_error: "Непредвиденная ошибка"
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
            const apiErrors = (responseBody as ApiErrorResponse)?.errors || [];
            
            const mappedErrors = apiErrors.map((err) => ({
                source: err.source,
                code: err.code,
                message: `${MAP_ERRORS[err.code] || err.message || `Код ошибки: ${err.code}`}${err.source !== '__response__' ? ` для поля ${err.source}` : ''}`,
            }));
            if (mappedErrors.length > 0) {
                return {
                    errors: mappedErrors,
                    data: null,
                    isOk: false,
                    statusCode: response.status,
                };
            }
            return {
                errors: [{
                    source: "client",
                    code: "unexpected_error",
                    message: "Непредвиденная ошибка"
                }],
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
                errors: [{
                    source: "client",
                    code: "unexpected_error",
                    message: error.message
                }],
                data: null,
                isOk: false,
                statusCode: 500,
            };
        }

        return {
            errors: [{
                source: "client",
                code: "unexpected_error",
                message: "Непредвиденная ошибка"
            }],
            data: null,
            isOk: false,
            statusCode: 500,
        };
    }
}
