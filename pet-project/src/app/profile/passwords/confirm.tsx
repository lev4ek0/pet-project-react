import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

export function ConfirmPassword({
    confirmPassword,
    isShowPassword,
    setConfirmPassword,
    setIsShowPassword,
}: {
    confirmPassword: string;
    isShowPassword: boolean;
    setConfirmPassword: Dispatch<SetStateAction<string>>;
    setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor="confirm-password">Подтвердить новый пароль</Label>
            <div className="relative">
                <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
