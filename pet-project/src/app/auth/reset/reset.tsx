"use client";

import { ResetForm } from "@/app/auth/reset/components/resetForm";
import { Suspense } from "react";

export function ResetPageWithSearchParams() {
    return (
        <>
            <ResetForm />
        </>
    );
}

export function Reset() {
    return (
        // TODO: skeletons
        <Suspense fallback={<div></div>}>
            <ResetPageWithSearchParams />
        </Suspense>
    );
}
