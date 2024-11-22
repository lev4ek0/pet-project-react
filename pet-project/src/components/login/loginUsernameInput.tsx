import { AuthContext } from "@/context/auth";
import { useContext } from "react";

export default function UsernameInput() {
    const authContext = useContext(AuthContext);

    return (
        <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Логин
            </label>
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    onChange={(e) => authContext?.setUsername(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    )
}
