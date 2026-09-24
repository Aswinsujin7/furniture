"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, formatCurrency } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useShop();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return null;

  const currentImage = selectedImage || product.primaryImage;
  const currentColor = selectedColor || product.colors?.[0]?.name;
  const currentSize = selectedSize || product.sizes?.[0];

  const handleAddToCart = () => {
    addToCart(product, currentColor, currentSize);
    onClose();
  };

  return (
    <div
      className="modal-backdrop active"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 18, 16, 0.7)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "880px",
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          overflow: "hidden",
          position: "relative",
          animation: "fadeIn 0.25s ease-out",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-sm)",
          }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            overflowY: "auto",
          }}
        >
          {/* Gallery Column */}
          <div style={{ padding: "clamp(1rem, 2.5vw, 1.5rem)", background: "var(--bg-secondary)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentImage}
              alt={product.name}
              style={{
                width: "100%",
                height: "clamp(220px, 35vh, 340px)",
                objectFit: "cover",
                borderRadius: "var(--radius-md)",
                marginBottom: "0.75rem",
              }}
            />
            {product.gallery && product.gallery.length > 1 && (
              <div className="no-scrollbar" style={{ display: "flex", gap: "0.5rem", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      border: currentImage === img ? "2px solid var(--accent-gold)" : "2px solid transparent",
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt=""
                      style={{ width: "54px", height: "54px", objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div style={{ padding: "clamp(1.25rem, 3vw, 2rem)", display: "flex", flexDirection: "column" }}>
            {product.badge && (
              <span
                style={{
                  alignSelf: "flex-start",
                  fontSize: "0.72rem",
                  background: "var(--accent-gold-light)",
                  color: "var(--accent-gold-hover)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {product.badge}
              </span>
            )}

            <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.4rem" }}>
              {product.name}
            </h2>

            {/* Ratings */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", color: "#E59819" }}>
                <Star size={14} fill="#E59819" />
              </div>
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: "var(--text-tertiary)" }}>({product.reviewsCount} verified reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: "1rem", color: "var(--text-tertiary)", textDecoration: "line-through" }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Selected Finish: <span style={{ color: "var(--accent-gold)" }}>{currentColor}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        outline: currentColor === c.name ? "2px solid var(--accent-gold)" : "none",
                        outlineOffset: "2px",
                        border: "1px solid rgba(0,0,0,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Dimensions / Size
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "0.4rem 0.85rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        border: currentSize === s ? "1.5px solid var(--accent-gold)" : "1px solid var(--border-light)",
                        background: currentSize === s ? "var(--accent-gold-light)" : "transparent",
                        color: currentSize === s ? "var(--accent-gold-hover)" : "var(--text-primary)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "auto", marginBottom: "1rem" }}>
              <button
                className="btn-primary"
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.95rem",
                }}
              >
                <ShoppingBag size={18} />
                <span>Add to Atelier Bag</span>
              </button>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="btn-outline"
                style={{
                  padding: "0.85rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                }}
              >
                <span>Full Details</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Privileges */}
            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Truck size={14} color="var(--accent-gold)" />
                <span>White-Glove Setup</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <ShieldCheck size={14} color="var(--accent-gold)" />
                <span>{product.warranty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
