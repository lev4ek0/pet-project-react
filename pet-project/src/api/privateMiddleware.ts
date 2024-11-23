import ApiResponse, { apiRequest } from "./base";
import { RequestOptions } from "./base"
import { deleteAccess, deleteRefresh, getAccess, getAccessPayload, getRefresh, getRefreshPayload, setAccess, setRefresh } from "@/utils/auth/client";
import { isExpiredToken } from "@/utils/auth/common";
import refreshAPI from "./auth/refresh";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export async function privateAPIRequest<T>(options: RequestOptions, router: AppRouterInstance): Promise<ApiResponse<T>> {
    const access = getAccess()
    const payloadAccess = getAccessPayload()
    const refresh = getRefresh()
    const payloadRefresh = getRefreshPayload()

    if ((isExpiredToken(payloadAccess) || !access) && refresh && !isExpiredToken(payloadRefresh)) {
        const body = { refresh_token: refresh }

        const { data, statusCode } = await refreshAPI(body)

        if (!data && statusCode === 401 ) {
            deleteAccess()
            deleteRefresh()
            router.replace('/login');
        } else if (data) {
            setAccess(data.access_token)
            setRefresh(data.refresh_token)
        }        

    } else if (!refresh || isExpiredToken(payloadRefresh)) {
        deleteAccess()
        deleteRefresh()
        router.replace('/login');
    }

    const response = await apiRequest<T>(options)
    if ( response.statusCode === 401 ) {
        router.replace('/login');
    }

    return response
}



