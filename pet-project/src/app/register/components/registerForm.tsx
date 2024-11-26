import PasswordInput from "./registerPasswordInput";
import EmailInput from "./registerEmailInput";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/providers/authProvider";
import RePasswordInput from "./registerRePasswordInput";
import { useAlertStore } from "@/providers/alertsProvider";
import registerAPI from "@/api/auth/register";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function RegisterForm() {
    const { registerEmail, registerPassword, registerRePassword } =
        useAuthStore((state) => state);
    const { addAlerts } = useAlertStore((state) => state);
    const { toast } = useToast();
    const router = useRouter();
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const body = {
            email: registerEmail,
            password: registerPassword,
            re_password: registerRePassword,
        };

        const { errors, isOk } = await registerAPI(body);

        if (!isOk) {
            addAlerts(errors);
            return;
        }

        toast({
            title: "Вы успешно зарегистрировались! Пожалуйста, подвердите вашу почту",
        });
        router.replace("/");
    };

    const handleRegisterClick = () => {
        router.push("/login");
    };

    return (
        <Card className="mx-auto max-w-sm min-w-96">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                    Зарегистрируйте аккаунт
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleSubmit}
                        action="#"
                        method="POST"
                        className="space-y-6"
                    >
                        <EmailInput />
                        <PasswordInput
                            isShowPassword={isShowPassword}
                            setIsShowPassword={setIsShowPassword}
                        />
                        <RePasswordInput
                            isShowPassword={isShowPassword}
                            setIsShowPassword={setIsShowPassword}
                        />
                        <Button full>Зарегистрироваться</Button>
                        <Button
                            type="button"
                            variant="secondary"
                            full
                            onClick={handleRegisterClick}
                        >
                            Войти
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
