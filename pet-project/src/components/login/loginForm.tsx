import PasswordInput from "./loginPasswordInput";
import UsernameInput from "./loginUsernameInput";
import { useRouter } from "next/navigation";
import { setAccess, setRefresh } from "@/utils/auth/client";
import loginAPI from "@/api/auth/login";
import { Button } from "@/components/ui/button"
import {
    Card, CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useAuthStore } from "@/providers/authProvider";
import { useAlertStore } from "@/providers/alertsProvider";

export default function LoginForm() {
    const { loginName, loginPassword, reset } = useAuthStore(
        (state) => state,
    )
    const { addAlerts } = useAlertStore(
        (state) => state,
    )
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', loginName);
        formData.append('password', loginPassword);

        const { errors, data, isOk } = await loginAPI(formData)

        if (!isOk || !data) {
            addAlerts(errors)
            return
        }

        setAccess(data.access_token)
        setRefresh(data.refresh_token)
        router.replace('/');
        reset()
    };

    const handleRegisterClick = () => {
        router.push('/register');
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
                        <Button type="button" variant="secondary" full onClick={handleRegisterClick}>Зарегистрироваться</Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}