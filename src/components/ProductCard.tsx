"use client";

import React from "react";
import Link from "next/link";
import { Product, formatCurrency } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Star, Heart, ShoppingBag, Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card">
      <div className="product-card-media" style={{ position: "relative", overflow: "hidden" }}>
        {/* Status Badge */}
        {product.badge && (
          <span
            className="product-badge"
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              zIndex: 3,
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          className={`wishlist-toggle ${isFavorited ? "active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          aria-label="Toggle wishlist"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 3,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(4px)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isFavorited ? "#E03131" : "var(--text-secondary)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <Heart size={16} fill={isFavorited ? "#E03131" : "none"} />
        </button>

        {/* Main Product Image Link */}
        <Link href={`/product/${product.id}`} className="product-img-link" style={{ display: "block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.primaryImage}
            alt={product.name}
            className="product-primary-img"
            loading="lazy"
            style={{
              width: "100%",
              height: "260px",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
          />
        </Link>

        {/* Hover Quick Actions Bar */}
        <div
          className="product-overlay-actions"
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            right: "12px",
            display: "flex",
            gap: "0.5rem",
            zIndex: 3,
            opacity: 0,
            transform: "translateY(8px)",
            transition: "all 0.25s ease",
          }}
        >
          {onQuickView && (
            <button
              className="quick-view-btn"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(6px)",
                color: "var(--text-primary)",
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.82rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.35rem",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <Eye size={14} />
              Quick Look
            </button>
          )}

          <button
            className="quick-add-btn"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            style={{
              flex: 1,
              background: "var(--text-primary)",
              color: "#fff",
              padding: "0.5rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.82rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.35rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <ShoppingBag size={14} />
            Add to Bag
          </button>
        </div>
      </div>

      <div className="product-card-body" style={{ padding: "1.25rem" }}>
        {/* Colors Swatches Dots */}
        {product.colors && product.colors.length > 0 && (
          <div
            className="product-color-dots"
            style={{ display: "flex", gap: "6px", marginBottom: "0.6rem" }}
          >
            {product.colors.map((c, i) => (
              <span
                key={i}
                title={c.name}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: c.hex,
                  border: "1px solid rgba(0,0,0,0.15)",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        )}

        {/* Product Title */}
        <h3
          className="product-title"
          style={{
            fontSize: "1.05rem",
            fontWeight: 600,
            marginBottom: "0.35rem",
            lineHeight: 1.3,
          }}
        >
          <Link
            href={`/product/${product.id}`}
            style={{ color: "var(--text-primary)", transition: "color 0.2s ease" }}
          >
            {product.name}
          </Link>
        </h3>

        {/* Material Note */}
        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--text-secondary)",
            marginBottom: "0.6rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.material}
        </p>

        {/* Ratings */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.82rem",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", color: "#E59819", alignItems: "center" }}>
            <Star size={13} fill="#E59819" />
          </div>
          <span style={{ fontWeight: 600 }}>{product.rating}</span>
          <span style={{ color: "var(--text-tertiary)" }}>({product.reviewsCount})</span>
        </div>

        {/* Price & Savings */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
            paddingTop: "0.5rem",
            borderTop: "1px solid var(--border-light)",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-tertiary)",
                  textDecoration: "line-through",
                }}
              >
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {discountPercent > 0 && (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--accent-terracotta)",
                background: "rgba(168, 90, 50, 0.08)",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
