import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "./providers";
import { AuthStoreProvider } from "@/providers/authProvider";
import { AlertStoreProvider } from "@/providers/alertsProvider";
import ErrorAlerts from "@/components/alerts";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
    title: "Адаптация",
    description: "Браузерная мультиплеерная игра",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html className="h-full bg-white">
                <body className="h-full">
                    <ReactQueryProvider>
                        <AlertStoreProvider>
                            <AuthStoreProvider>
                                <ErrorAlerts />
                                <Toaster />
                                {children}
                            </AuthStoreProvider>
                        </AlertStoreProvider>
                    </ReactQueryProvider>
                </body>
            </html>
        </>
    );
}
