import { MeAPIRequestBody, MeAPIResponseBody } from "@/types/profile/me";
import { RequestOptions } from "../base"
import { privateAPIRequest } from "../privateMiddleware";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function meAPI(router: AppRouterInstance) {

    const requestOptions: RequestOptions = {
        path: "/auth/me",
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    }
    return await privateAPIRequest<MeAPIResponseBody>(requestOptions, router)
}

export async function meAPIPatch(body: MeAPIRequestBody, router: AppRouterInstance) {
    const bodyString = JSON.stringify(body)

    const requestOptions: RequestOptions = {
        path: "/auth/me",
        method: "PATCH",
        body: bodyString,
        headers: { 'Content-Type': 'application/json' }
    }
    return await privateAPIRequest<MeAPIResponseBody>(requestOptions, router)
}
