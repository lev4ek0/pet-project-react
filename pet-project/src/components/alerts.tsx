"use client";

import { useAlertStore } from "@/providers/alertsProvider";
import { Alert, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorAlerts() {
    const { alerts } = useAlertStore((state) => state);

    return (
        <>
            <div className="fixed top-10 right-10 z-50">
                {alerts.map((error, index) => (
                    <Alert className="mt-2" key={index} variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>{error.message}</AlertTitle>
                    </Alert>
                ))}
            </div>
        </>
    );
}
