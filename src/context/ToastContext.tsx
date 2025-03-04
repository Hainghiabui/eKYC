import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastType } from '../components/Toast';

interface ToastState {
    visible: boolean;
    type: ToastType;
    title: string;
    message: string;
}

interface ToastContextProps {
    showToast: (type: ToastType, title: string, message: string) => void;
    hideToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [ toast, setToast ] = useState<ToastState>({
        visible: false,
        type: 'info',
        title: '',
        message: '',
    });

    const showToast = (type: ToastType, title: string, message: string) => {
        // Ensure message is always a string
        const safeMessage = typeof message === 'string' ? message : String(message);

        setToast({
            visible: true,
            type,
            title,
            message: safeMessage,
        });
    };

    const hideToast = () => {
        setToast((prev) => ({
            ...prev,
            visible: false,
        }));
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            <Toast
                visible={toast.visible}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                onDismiss={hideToast}
            />
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
