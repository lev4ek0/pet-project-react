import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

export function CurrentPassword({
    currentPassword,
    isShowPassword,
    setCurrentPassword,
    setIsShowPassword,
}: {
    currentPassword: string;
    isShowPassword: boolean;
    setCurrentPassword: Dispatch<SetStateAction<string>>;
    setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor="current-password">Текущий пароль</Label>
            <div className="relative">
                <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
