import { AuthContext } from "@/context/auth";
import { useContext } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UsernameInput() {
    const authContext = useContext(AuthContext);

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Логин</Label>
            <Input id="email" onChange={(e) => authContext?.setUsername(e.target.value)} type="email" placeholder="Логин" autoComplete="email" required/>
        </div>
    )
}
