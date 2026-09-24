"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CATEGORIES, getCategoryById, PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { SlidersHorizontal, ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = typeof params?.id === "string" ? params.id : "sofas";

  const category = getCategoryById(categoryId) || CATEGORIES[0];
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [materialFilter, setMaterialFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === category.id);

    // Subcategory
    if (activeSubcategory !== "all") {
      list = list.filter((p) => p.subcategories.includes(activeSubcategory));
    }

    // Price
    if (priceFilter === "under-30k") {
      list = list.filter((p) => p.price < 30000);
    } else if (priceFilter === "30k-50k") {
      list = list.filter((p) => p.price >= 30000 && p.price <= 50000);
    } else if (priceFilter === "50k-80k") {
      list = list.filter((p) => p.price > 50000 && p.price <= 80000);
    } else if (priceFilter === "above-80k") {
      list = list.filter((p) => p.price > 80000);
    }

    // Material
    if (materialFilter !== "all") {
      list = list.filter((p) =>
        p.material.toLowerCase().includes(materialFilter.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [category.id, activeSubcategory, priceFilter, materialFilter, sortBy]);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Category Hero Banner */}
      <section
        style={{
          position: "relative",
          background: "var(--bg-dark)",
          color: "#fff",
          padding: "clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 4rem)",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
            filter: "brightness(0.7)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(20, 18, 16, 0.5) 0%, rgba(20, 18, 16, 0.9) 100%)",
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Breadcrumbs */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "rgba(255, 255, 255, 0.65)",
              marginBottom: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Home
            </Link>
            <ChevronRight size={14} />
            <span style={{ color: "var(--accent-gold)" }}>{category.name}</span>
            {activeSubcategory !== "all" && (
              <>
                <ChevronRight size={14} />
                <span style={{ color: "#fff", textTransform: "capitalize" }}>
                  {activeSubcategory.replace(/-/g, " ")}
                </span>
              </>
            )}
          </nav>

          <span
            style={{
              fontSize: "0.78rem",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "var(--accent-gold)",
              fontWeight: 600,
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            Atelier Curated Room
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 600,
              marginBottom: "0.6rem",
              color: "#fff",
            }}
          >
            {category.name}
          </h1>
          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "600px",
              lineHeight: 1.6,
            }}
          >
            {category.description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingTop: "1.75rem" }}>
        {/* Subcategories Horizontal Pills */}
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            paddingBottom: "0.75rem",
            marginBottom: "1.5rem",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          {category.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategory(sub.id)}
              style={{
                padding: "0.45rem 1.15rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                border: activeSubcategory === sub.id ? "1px solid var(--accent-gold)" : "1px solid var(--border-light)",
                background: activeSubcategory === sub.id ? "var(--text-primary)" : "var(--bg-surface)",
                color: activeSubcategory === sub.id ? "#fff" : "var(--text-secondary)",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              {sub.name}
            </button>
          ))}
        </div>

        {/* Filter and Sort Toolbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            background: "var(--bg-surface)",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-xs)",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <SlidersHorizontal size={18} color="var(--accent-gold)" />
            <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-primary)" }}>
              {filteredProducts.length} Piece{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", flex: "1 1 auto", justifyContent: "flex-end" }}>
            {/* Price Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flex: "1 1 120px" }}>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  fontSize: "0.82rem",
                  background: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              >
                <option value="all">All Prices</option>
                <option value="under-30k">Under ₹30,000</option>
                <option value="30k-50k">₹30,000 – ₹50,000</option>
                <option value="50k-80k">₹50,000 – ₹80,000</option>
                <option value="above-80k">Above ₹80,000</option>
              </select>
            </div>

            {/* Material Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flex: "1 1 120px" }}>
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  fontSize: "0.82rem",
                  background: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              >
                <option value="all">All Materials</option>
                <option value="Teak">Solid Teak Wood</option>
                <option value="Sheesham">Solid Sheesham Wood</option>
                <option value="Leather">Top-Grain Leather</option>
                <option value="Velvet">Velvet / Bouclé</option>
                <option value="Marble">Marble & Sintered Stone</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flex: "1 1 120px" }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.45rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  fontSize: "0.82rem",
                  background: "var(--bg-surface)",
                  color: "var(--text-primary)",
                  outline: "none",
                }}
              >
                <option value="featured">Featured Collection</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 1rem",
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-light)",
            }}
          >
            <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>
              No pieces match your selected filters
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "1.25rem" }}>
              Try broadening your price or material selection to view more pieces.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setActiveSubcategory("all");
                setPriceFilter("all");
                setMaterialFilter("all");
              }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
