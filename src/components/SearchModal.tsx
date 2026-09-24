"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { searchProducts, CATEGORIES, formatCurrency } from "@/data/products";
import { Search, X, ArrowRight } from "lucide-react";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = searchProducts(query);

  return (
    <div
      className="modal-backdrop active"
      onClick={() => setIsSearchOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 18, 16, 0.7)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "4rem 1rem 2rem",
      }}
    >
      <div
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "680px",
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
          animation: "fadeIn 0.2s ease-out",
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid var(--border-light)",
            gap: "0.75rem",
          }}
        >
          <Search size={20} color="var(--accent-gold)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search solid teak beds, L-shape sofas, dining sets, desks..."
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              background: "transparent",
              color: "var(--text-primary)",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ color: "var(--text-tertiary)", padding: "4px" }}
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              color: "var(--text-secondary)",
              padding: "4px 8px",
              fontSize: "0.85rem",
              background: "var(--bg-secondary)",
              borderRadius: "4px",
            }}
          >
            ESC
          </button>
        </div>

        {/* Suggested Categories Bar */}
        <div
          style={{
            padding: "0.75rem 1.25rem",
            background: "var(--bg-secondary)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflowX: "auto",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "var(--text-tertiary)",
              whiteSpace: "nowrap",
            }}
          >
            Rooms:
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              onClick={() => setIsSearchOpen(false)}
              style={{
                fontSize: "0.82rem",
                padding: "3px 10px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-surface)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-light)",
                whiteSpace: "nowrap",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Search Results List */}
        <div style={{ overflowY: "auto", flex: 1, padding: "1rem" }}>
          {query.trim() === "" ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-tertiary)" }}>
              <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                Type to instantly search across our handcrafted catalogue.
              </p>
              <p style={{ fontSize: "0.82rem" }}>
                Try searching for &ldquo;Teak Bed&rdquo;, &ldquo;Leather Sofa&rdquo;, &ldquo;Dining Table&rdquo;, or &ldquo;Sheesham&rdquo;.
              </p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-tertiary)" }}>
              <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                No pieces found matching &ldquo;{query}&rdquo;
              </p>
              <p style={{ fontSize: "0.85rem" }}>
                Our architects can custom craft to your specifications. Inquire via Showroom Concierge.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                Found {results.length} piece{results.length > 1 ? "s" : ""}
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.75rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-gold)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-light)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    style={{
                      width: "64px",
                      height: "64px",
                      objectFit: "cover",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>
                        {product.name}
                      </h4>
                      {product.badge && (
                        <span
                          style={{
                            fontSize: "0.68rem",
                            background: "var(--accent-gold-light)",
                            color: "var(--accent-gold-hover)",
                            padding: "1px 6px",
                            borderRadius: "3px",
                            fontWeight: 600,
                          }}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {product.material} • {product.dimensions}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                        {formatCurrency(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-tertiary)",
                            textDecoration: "line-through",
                          }}
                        >
                          {formatCurrency(product.originalPrice)}
                        </div>
                      )}
                    </div>
                    <ArrowRight size={16} color="var(--accent-gold)" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
