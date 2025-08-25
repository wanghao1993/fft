"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface ToastProps {
  id: string;
  title: string;
  description: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({
  id,
  title,
  description,
  type,
  duration = 5000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "warning":
        return "text-yellow-400";
      case "info":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg border shadow-lg ${getTypeStyles()}`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div
              className={`w-5 h-5 rounded-full ${getIconColor()} flex items-center justify-center`}
            >
              {type === "success" && "✓"}
              {type === "error" && "✕"}
              {type === "warning" && "⚠"}
              {type === "info" && "ℹ"}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="text-sm mt-1">{description}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => onClose(id)}
              className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (toast: Omit<ToastProps, "id" | "onClose">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: removeToast,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const toast = {
    success: (props: { title: string; description: string }) =>
      addToast({ ...props, type: "success" }),
    error: (props: { title: string; description: string }) =>
      addToast({ ...props, type: "error" }),
    warning: (props: { title: string; description: string }) =>
      addToast({ ...props, type: "warning" }),
    info: (props: { title: string; description: string }) =>
      addToast({ ...props, type: "info" }),
  };

  return { toast, toasts, removeToast };
}
