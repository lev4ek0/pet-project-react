import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/providers/authProvider";
import { Dispatch, SetStateAction } from "react";

export default function PasswordInput({
    isShowPassword,
    setIsShowPassword,
}: {
    isShowPassword: boolean;
    setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}) {
    const { setRegisterPassword, registerPassword } = useAuthStore(
        (state) => state,
    );

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
            </div>
            <div className="relative">
                <Input
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    value={registerPassword}
                    type={isShowPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Пароль"
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
