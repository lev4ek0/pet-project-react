import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/providers/authProvider";
import { useState } from "react";

export default function PasswordInput() {
    const { setLoginPassword, loginPassword } = useAuthStore((state) => state);
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <div className="text-sm">
                    <a
                        href="/auth/forgot"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Забыли пароль?
                    </a>
                </div>
            </div>
            <div className="relative">
                <Input
                    id="password"
                    onChange={(e) => setLoginPassword(e.target.value)}
                    value={loginPassword}
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Пароль"
                    autoComplete="password"
                    required
                />
                <button
                    type="button"
                    className={`absolute top-[10px] right-[10px] w-[20px] h-[20px] bg-no-repeat cursor-pointer border-none ${isShowPassword ? 'bg-[url("/no-view-password.svg")]' : 'bg-[url("/view-password.svg")]'}`}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    aria-label={
                        isShowPassword ? "Скрыть пароль" : "Показать пароль"
                    }
                />
            </div>
        </div>
    );
}
