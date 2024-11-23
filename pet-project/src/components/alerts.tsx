import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertTitle,
} from "@/components/ui/alert"


export default function ErrorAlerts() {
    const authContext = useContext(AuthContext);

    return (
        <>
            <div className="fixed top-10 right-10 z-50">
                {
                    authContext?.errors.map((error, index) => (
                        <Alert key={index} variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>
                    ))
                }
            </div>
        </>
    );
}
