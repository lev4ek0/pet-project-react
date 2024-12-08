import { MeAPIRequestBody, MeAPIResponseBody } from "@/app/profile/types/me";
import { RequestOptions } from "../base";
import { privateAPIRequest } from "../privateMiddleware";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default async function meAPI(router: AppRouterInstance) {
    const requestOptions: RequestOptions = {
        path: "/auth/users/me/",
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<MeAPIResponseBody>(requestOptions, router);
}

function createRequestBody(updatedFields: Partial<MeAPIRequestBody>): string {
    const body: Partial<MeAPIRequestBody> = {};

    for (const key in updatedFields) {
        if (updatedFields[key as keyof MeAPIRequestBody] !== undefined) {
            body[key as keyof MeAPIRequestBody] =
                updatedFields[key as keyof MeAPIRequestBody];
        }
    }

    return JSON.stringify(body);
}

export async function meAPIPatch(
    body: MeAPIRequestBody,
    router: AppRouterInstance,
) {
    const bodyString = createRequestBody(body);

    const requestOptions: RequestOptions = {
        path: "/auth/users/me/",
        method: "PATCH",
        body: bodyString,
        headers: { "Content-Type": "application/json" },
    };
    return await privateAPIRequest<MeAPIResponseBody>(requestOptions, router);
}
