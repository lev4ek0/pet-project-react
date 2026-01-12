import PasswordInput from "./loginPasswordInput";
import UsernameInput from "./loginUsernameInput";
import { useRouter } from "next/navigation";
import { setAccess, setRefresh } from "@/utils/auth/client";
import loginAPI from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/providers/authProvider";
import { useAlertStore } from "@/providers/alertsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faVk } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import googleLinkAPI from "@/api/auth/oauth2/google";
import vkLinkAPI from "@/api/auth/oauth2/vk";

export default function LoginForm() {
    const { loginName, loginPassword, reset } = useAuthStore((state) => state);
    const [vkLink, setVkLink] = useState("");
    const [googleLink, setGoogleLink] = useState("");
    const { addAlerts } = useAlertStore((state) => state);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const googleResponse = await googleLinkAPI(false);
            const vkResponse = await vkLinkAPI(false);

            setGoogleLink(googleResponse.data?.url || "");
            setVkLink(vkResponse.data?.url || "");
        };

        fetchData();
    }, [router]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", loginName);
        formData.append("password", loginPassword);

        const { errors, data, isOk } = await loginAPI(formData);

        if (!isOk || !data) {
            addAlerts(errors.map((error) => error.message));
            return;
        }

        setAccess(data.access_token);
        setRefresh(data.refresh_token);
        reset();
        router.replace("/");
    };

    const handleRegisterClick = () => {
        router.push("/register");
    };

    return (
        <Card className="mx-auto max-w-sm min-w-96">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                    Войдите в аккаунт
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
                        <UsernameInput />
                        <PasswordInput />
                        <Button full>Войти</Button>
                        <Button
                            type="button"
                            variant="outline"
                            full
                            onClick={handleRegisterClick}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className="mt-4">
                        <div className="flex items-center mt-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-sm text-gray-500">
                                или
                            </span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <Button
                                type="button"
                                variant="google"
                                onClick={() => router.replace(googleLink)}
                                className="flex-1 mr-1 flex items-center justify-center"
                            >
                                <FontAwesomeIcon
                                    icon={faGoogle}
                                    className="mr-2"
                                />{" "}
                                Google
                            </Button>
                            <Button
                                type="button"
                                variant="vk"
                                onClick={() => router.replace(vkLink)}
                                className="flex-1 ml-1 flex items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faVk} className="mr-2" />{" "}
                                VK
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
