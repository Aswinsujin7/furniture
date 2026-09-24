"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/data/products";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck, Truck } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    setIsConciergeOpen,
  } = useShop();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div
      className="drawer-backdrop active"
      onClick={() => setIsCartOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 18, 16, 0.6)",
        zIndex: 9998,
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "440px",
          maxWidth: "92vw",
          height: "100%",
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} color="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600 }}>Atelier Bag</h3>
            <span
              style={{
                fontSize: "0.8rem",
                color: "var(--text-tertiary)",
              }}
            >
              ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{ padding: "4px", color: "var(--text-secondary)" }}
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Delivery Privilege Banner */}
        <div
          style={{
            background: "var(--bg-secondary)",
            padding: "0.75rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.82rem",
            color: "var(--text-secondary)",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <Truck size={16} color="var(--accent-gold)" />
          <span>
            You qualify for <strong>Complimentary White-Glove Setup</strong>!
          </span>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-tertiary)",
                }}
              >
                <ShoppingBag size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>
                  Your Atelier Bag is Empty
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Discover handcrafted solid wood and contemporary upholstered pieces.
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: "0.5rem" }}
              >
                Explore Showroom
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid var(--border-light)",
                  }}
                >
                  {/* Thumbnail */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: "var(--text-tertiary)", padding: "2px" }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--text-secondary)",
                        marginTop: "4px",
                      }}
                    >
                      {item.selectedColor && <span>Finish: {item.selectedColor}</span>}
                      {item.selectedSize && <span> • {item.selectedSize}</span>}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "0.75rem",
                      }}
                    >
                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid var(--border-light)",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{ padding: "4px 8px" }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span
                          style={{
                            padding: "2px 8px",
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            minWidth: "24px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{ padding: "4px 8px" }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div
            style={{
              padding: "1.5rem",
              borderTop: "1px solid var(--border-light)",
              background: "var(--bg-secondary)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.85rem",
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
              }}
            >
              <span>White-Glove Delivery & Assembly</span>
              <span style={{ color: "var(--accent-sage)", fontWeight: 600 }}>
                FREE
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-light)",
                marginBottom: "1.25rem",
                fontSize: "1.15rem",
                fontWeight: 700,
              }}
            >
              <span>Total Investment</span>
              <span style={{ color: "var(--text-primary)" }}>
                {formatCurrency(subtotal)}
              </span>
            </div>

            <button
              className="btn-primary"
              onClick={() => {
                setIsCartOpen(false);
                setIsConciergeOpen(true);
              }}
              style={{
                width: "100%",
                padding: "0.9rem",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <span>Proceed to White-Glove Order</span>
              <ArrowRight size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                marginTop: "0.75rem",
                fontSize: "0.75rem",
                color: "var(--text-tertiary)",
              }}
            >
              <ShieldCheck size={14} />
              <span>10-Year Structural Guarantee Included</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
