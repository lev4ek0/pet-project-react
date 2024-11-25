import { createStore } from "zustand/vanilla";

export type Alert = {
    id: string;
    message: string;
};

export type AlertState = {
    alerts: Alert[];
};

export type AlertActions = {
    addAlert: (message: string, timeout?: number) => void;
    addAlerts: (messages: string[], timeout?: number) => void;
    clearAlerts: () => void;
};

export type AlertStore = AlertState & AlertActions;

export const defaultInitAlertState: AlertState = {
    alerts: [],
};

const generateUniqueId = () => "_" + Math.random().toString(36).substr(2, 9);

export const createAlertStore = (
    initState: AlertState = defaultInitAlertState,
) => {
    return createStore<AlertStore>()((set) => ({
        ...initState,

        addAlert: (message, timeout = 5000) => {
            const id = generateUniqueId();
            set((state) => ({ alerts: [...state.alerts, { id, message }] }));

            setTimeout(() => {
                set((state) => ({
                    alerts: state.alerts.filter((alert) => alert.id !== id),
                }));
            }, timeout);
        },

        addAlerts: (messages, timeout = 5000) => {
            const newAlerts = messages.map((message) => ({
                id: generateUniqueId(),
                message,
            }));
            set((state) => ({ alerts: [...state.alerts, ...newAlerts] }));

            setTimeout(() => {
                const ids = newAlerts.map((alert) => alert.id);
                set((state) => ({
                    alerts: state.alerts.filter(
                        (alert) => !ids.includes(alert.id),
                    ),
                }));
            }, timeout);
        },

        clearAlerts: () => set(() => ({ alerts: [] })),
    }));
};
