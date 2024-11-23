import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PasswordInput() {
    const authContext = useContext(AuthContext);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <div className="text-sm">
                    <a href="#" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Забыли пароль?
                    </a>
                </div>
            </div>
            <Input onChange={(e) => authContext?.setPassword(e.target.value)} type="password" placeholder="Пароль" autoComplete="password" required />
        </div>
    )
}
