import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    errors: string[];
    setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    return (
        <AuthContext.Provider value={{ username, setUsername, password, setPassword, errors, setErrors }}>
            {children}
        </AuthContext.Provider>
    );
};