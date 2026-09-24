"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/data/products";
import { X, Trash2, Heart, ShoppingBag } from "lucide-react";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div
      className="drawer-backdrop active"
      onClick={() => setIsWishlistOpen(false)}
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
            <Heart size={20} color="var(--accent-gold)" fill="var(--accent-gold)" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600 }}>Saved Pieces</h3>
            <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{ padding: "4px", color: "var(--text-secondary)" }}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {wishlist.length === 0 ? (
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
                <Heart size={32} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>
                  Your Saved List is Empty
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Click the heart icon on any masterpiece to save it for later comparison.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBottom: "1.25rem",
                    borderBottom: "1px solid var(--border-light)",
                    alignItems: "center",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => setIsWishlistOpen(false)}
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {product.name}
                    </Link>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {product.material}
                    </p>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", marginTop: "4px" }}>
                      {formatCurrency(product.price)}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        addToCart(product);
                      }}
                      style={{
                        padding: "0.4rem 0.75rem",
                        fontSize: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                      title="Add to bag"
                    >
                      <ShoppingBag size={14} />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      style={{
                        color: "var(--text-tertiary)",
                        padding: "4px",
                        alignSelf: "center",
                      }}
                      title="Remove from saved"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
