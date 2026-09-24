"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { CheckCircle2 } from "lucide-react";

export default function ToastContainer() {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: "var(--bg-dark)",
            color: "var(--text-inverse)",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.88rem",
            fontWeight: 500,
            borderLeft: "3px solid var(--accent-gold)",
            animation: "slideInUp 0.25s ease-out",
            pointerEvents: "auto",
            maxWidth: "360px",
          }}
        >
          <CheckCircle2 size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
