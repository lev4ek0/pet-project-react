"use client";

import React, { useEffect, useId, useMemo } from "react";

type TelegramUser = {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date?: number;
    hash: string;
};

type Props = {
    botUsername: string;              // например: "my_bot"
    onAuth: (user: TelegramUser) => void | Promise<void>;
    size?: "large" | "medium" | "small";
    radius?: number;                  // 0..20 обычно
    lang?: "en" | "ru" | "de" | "fr" | "es" | string;
    requestAccess?: "write" | "read"; // обычно "write"
    className?: string;               // обёртка (как кнопка)
    widgetClassName?: string;         // контейнер для виджета
};

declare global {
    interface Window {
        // динамически создаём уникальные колбэки
        [key: string]: unknown;
    }
}

export function TelegramLoginButton({
    botUsername,
    onAuth,
    size = "large",
    radius = 12,
    lang = "en",
    requestAccess = "write",
    className = "",
    widgetClassName = "",
}: Props) {
    const reactId = useId();
    const containerId = useMemo(
        () => `tg-login-${reactId.replace(/:/g, "")}`,
        [reactId],
    );

    useEffect(() => {
        if (!botUsername) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        // очищаем контейнер (на случай повторного маунта/ре-рендера)
        container.innerHTML = "";

        // уникальное имя колбэка в window, чтобы не конфликтовать
        const cbName = `__tgAuth_${containerId}`;
        window[cbName] = (user: TelegramUser) => onAuth(user);

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://telegram.org/js/telegram-widget.js?22";

        script.setAttribute("data-telegram-login", botUsername);
        script.setAttribute("data-size", size);
        script.setAttribute("data-radius", String(radius));
        script.setAttribute("data-lang", lang);
        script.setAttribute("data-request-access", requestAccess);

        // Telegram ожидает строку с вызовом функции
        script.setAttribute("data-onauth", `${cbName}(user)`);

        container.appendChild(script);

        return () => {
            // cleanup
            try {
                delete window[cbName];
            } catch { }
            script.remove();
            if (container) container.innerHTML = "";
        };
    }, [botUsername, containerId, size, radius, lang, requestAccess, onAuth]);

    /**
     * Обёртка сделана "как кнопка":
     * - full width
     * - центрирование
     * - бордер/радиус
     * Telegram сам рисует кнопку внутри.
     */
    return (
        <div
            className={[
                "w-full rounded-md border border-input bg-background shadow-sm",
                "px-2 py-2 flex justify-center",
                className,
            ].join(" ")}
        >
            <div id={containerId} className={widgetClassName} />
        </div>
    );
}
