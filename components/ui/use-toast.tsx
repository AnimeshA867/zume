import React, { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

type ToastContextType = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9); // Generate a unique ID
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-4 rounded shadow ${
              toast.variant === "destructive"
                ? "bg-red-500 text-white"
                : toast.variant === "success"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-white"
            }`}
          >
            <strong>{toast.title}</strong>
            {toast.description && <p>{toast.description}</p>}
            <button
              className="mt-2 text-sm underline"
              onClick={() => removeToast(toast.id)}
            >
              Dismiss
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
