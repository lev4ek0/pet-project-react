import { useContext } from "react";
import PasswordInput from "./loginPasswordInput";
import UsernameInput from "./loginUsernameInput";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { setAccess, setRefresh } from "@/utils/auth/client";
import loginAPI from "@/api/auth/login";
import { Button } from "@/components/ui/button"
import {
    Card, CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function LoginForm() {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', authContext?.username || "");
        formData.append('password', authContext?.password || "");

        const { errors, data, isOk } = await loginAPI(formData)

        if (!isOk || !data) {
            authContext?.setErrors(errors);
            setTimeout(() => {
                authContext?.setErrors([]);
            }, 5000);
            return
        }

        setAccess(data.access_token)
        setRefresh(data.refresh_token)
        router.replace('/');
    };

    return (
        <Card className="mx-auto max-w-sm min-w-96">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Войдите в аккаунт</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                        <UsernameInput />
                        <PasswordInput />
                        <Button full>Войти</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}