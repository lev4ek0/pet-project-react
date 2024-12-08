import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";
import { AuthStoreProvider } from "@/providers/authProvider";
import { AlertStoreProvider } from "@/providers/alertsProvider";
import ErrorAlerts from "@/components/alerts";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { CardStoreProvider } from "@/providers/cardProvider";
import { ProfileStoreProvider } from "@/providers/profileProvider";

export const metadata: Metadata = {
    title: "ООО СБЛЕВ",
    description: "Твой ИИ помощник",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="h-full" suppressHydrationWarning>
            <body className="h-full">
                <ReactQueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <AlertStoreProvider>
                            <AuthStoreProvider>
                                <ProfileStoreProvider>
                                    <CardStoreProvider>
                                        <ErrorAlerts />
                                        <Toaster />
                                        {children}
                                    </CardStoreProvider>
                                </ProfileStoreProvider>
                            </AuthStoreProvider>
                        </AlertStoreProvider>
                    </ThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
