import { useContext } from "react";
import PasswordInput from "./loginPasswordInput";
import UsernameInput from "./loginUsernameInput";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { setAccess, setRefresh } from "@/utils/auth/client";
import loginAPI from "@/api/auth/login";
import LoginButton from "./loginButton";

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
        router.replace('/profile');
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} action="#" method="POST" className="space-y-6">
                <UsernameInput />
                <PasswordInput />
                <LoginButton />
            </form>
        </div>
    )
}