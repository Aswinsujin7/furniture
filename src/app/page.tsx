"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
  Calendar,
  Star,
  Award,
  Compass,
} from "lucide-react";

export default function HomePage() {
  const { setIsConciergeOpen } = useShop();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter masterpieces
  const filteredProducts = activeTab === "all"
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <>
      {/* ======================================================================
          HERO SHOWROOM SECTION
          ====================================================================== */}
      <section
        className="hero-section"
        style={{
          padding: "clamp(2.5rem, 5vw, 4rem) 0 clamp(3rem, 5vw, 5rem)",
          background: "linear-gradient(180deg, #FAF8F5 0%, #F3EFEA 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "2.5rem",
              alignItems: "center",
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: "600px", minWidth: 0, width: "100%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: "var(--accent-gold-light)",
                  color: "var(--accent-gold-hover)",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                <Sparkles size={14} />
                <span>2026 Architectural Collection</span>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.85rem, 5vw, 3.8rem)",
                  lineHeight: 1.15,
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                Handcrafted Elegance for Contemporary Sanctuaries
              </h1>

              <p
                style={{
                  fontSize: "clamp(0.92rem, 2vw, 1.05rem)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "1.75rem",
                }}
              >
                Artisanal Solid Teak, seasoned Indian Sheesham, and Italian upholstery tailored to
                elevate daily living into an enduring sensory experience.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                  marginBottom: "2rem",
                  width: "100%",
                }}
              >
                <Link
                  href="/category/sofas"
                  className="btn-primary"
                  style={{
                    padding: "0.85rem 1.75rem",
                    fontSize: "0.92rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flex: "1 1 auto",
                    justifyContent: "center",
                  }}
                >
                  <span>Explore Living Room</span>
                  <ArrowRight size={18} />
                </Link>

                <button
                  onClick={() => setIsConciergeOpen(true)}
                  className="btn-outline"
                  style={{
                    padding: "0.85rem 1.5rem",
                    fontSize: "0.92rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flex: "1 1 auto",
                    justifyContent: "center",
                  }}
                >
                  <Calendar size={18} />
                  <span>Book Showroom Visit</span>
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div
                className="hero-trust-grid"
                style={{
                  paddingTop: "1.25rem",
                  borderTop: "1px solid var(--border-light)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <ShieldCheck size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>10-Yr Warranty</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Truck size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Free Setup</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Award size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Solid Hardwood</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <Compass size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Custom Blueprints</span>
                </div>
              </div>
            </div>

            {/* Right Media Hero Banner */}
            <div style={{ position: "relative", width: "100%", maxWidth: "100%", overflow: "hidden", borderRadius: "var(--radius-xl)" }}>
              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xl)",
                  position: "relative",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"
                  alt="Verona Atelier Living Space"
                  style={{
                    width: "100%",
                    height: "clamp(260px, 45vh, 480px)",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* Floating Highlight Card 1 */}
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-lg)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  maxWidth: "calc(100% - 24px)",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--accent-gold-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent-gold-hover)",
                    flexShrink: 0,
                  }}
                >
                  <Award size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                    Signature Series
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Solid Teak & Bouclé
                  </div>
                </div>
              </div>

              {/* Floating Highlight Card 2 */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  background: "rgba(20, 18, 16, 0.88)",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  boxShadow: "var(--shadow-lg)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.76rem",
                  fontWeight: 600,
                }}
              >
                <Star size={13} fill="#B88E4F" color="#B88E4F" />
                <span>4.9 ★ (1,400+ Homes)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          CURATED ROOMS & LIVING SPACES
          ====================================================================== */}
      <section style={{ padding: "clamp(3rem, 5vw, 5rem) 0 2.5rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 2.5rem" }}>
            <span
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "var(--accent-gold)",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.4rem",
              }}
            >
              Curated Collections
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 600,
                marginBottom: "0.6rem",
              }}
            >
              Architectural Living Spaces
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Explore bespoke furniture tailored for every room of your sanctuary.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  height: "clamp(260px, 35vh, 340px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "1.5rem",
                  boxShadow: "var(--shadow-md)",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-xl)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
              >
                {/* Background Image with Dark Vignette */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                    transition: "transform 0.6s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(20, 18, 16, 0.1) 0%, rgba(20, 18, 16, 0.85) 100%)",
                    zIndex: 2,
                  }}
                />

                {/* Content Overlay */}
                <div style={{ position: "relative", zIndex: 3, color: "#fff" }}>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--accent-gold-light)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {cat.subcategories.length - 1} Variations
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255, 255, 255, 0.8)",
                      lineHeight: 1.4,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {cat.tagline}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--accent-gold)",
                    }}
                  >
                    <span>View Room Collection</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
          MASTERPIECES SHOWCASE (TABS & PRODUCT GRID)
          ====================================================================== */}
      <section style={{ padding: "clamp(3.5rem, 5vw, 5rem) 0", background: "var(--bg-secondary)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "var(--accent-gold)",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.3rem",
                }}
              >
                Signature Portfolio
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  fontWeight: 600,
                }}
              >
                Architectural Highlights
              </h2>
            </div>

            {/* Filter Tabs - Horizontal Scroll on Mobile */}
            <div
              className="no-scrollbar"
              style={{
                display: "flex",
                overflowX: "auto",
                whiteSpace: "nowrap",
                WebkitOverflowScrolling: "touch",
                gap: "0.4rem",
                background: "var(--bg-surface)",
                padding: "4px 6px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-light)",
                maxWidth: "100%",
              }}
            >
              {[
                { id: "all", label: "Featured" },
                { id: "sofas", label: "Sofas" },
                { id: "beds", label: "Beds" },
                { id: "dining", label: "Dining" },
                { id: "tables", label: "Tables" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    background: activeTab === tab.id ? "var(--text-primary)" : "transparent",
                    color: activeTab === tab.id ? "#fff" : "var(--text-secondary)",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
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

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link
              href="/category/sofas"
              className="btn-primary"
              style={{ padding: "0.85rem 2rem", fontSize: "0.92rem" }}
            >
              View Full 2026 Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================================
          THE ATELIER DIFFERENCE / CRAFTSMANSHIP
          ====================================================================== */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 4rem" }}>
            <span
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "var(--accent-gold)",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              Artisanal Heritage
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 600,
                marginBottom: "0.75rem",
              }}
            >
              The Verona Atelier Standard
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
              Every creation is built with uncompromising standards of joinery, sustainably harvested
              timbers, and meticulous hand-finishing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "2rem",
            }}
          >
            <div
              style={{
                background: "var(--bg-surface)",
                padding: "2.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent-gold)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                01
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Kiln-Seasoned Hardwoods
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Grade-A Indian Sheesham and aged Teak seasoned down to 8–10% moisture content to ensure
                zero warping or creaking in all seasonal humidity.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-surface)",
                padding: "2.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent-gold)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                02
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Ergonomic High Resilience
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Multi-layer 38-density high-resilience foam paired with pocket springs and hypoallergenic
                down feathers for optimal lumbar relaxation.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-surface)",
                padding: "2.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent-gold)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                03
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Hand-Rubbed Organic Oils
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Non-toxic, plant-based beeswax and satin polyurethane that enhance the tactile warmth
                of the timber while offering natural water resistance.
              </p>
            </div>

            <div
              style={{
                background: "var(--bg-surface)",
                padding: "2.25rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-light)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontFamily: "var(--font-serif)",
                  color: "var(--accent-gold)",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                04
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                Made-to-Measure Blueprints
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Collaborate with our in-house architects to customize bed dimensions, sofa modularity,
                timber stains, and Italian fabric textures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          VIP CONCIERGE BANNER CALLOUT
          ====================================================================== */}
      <section
        style={{
          background: "var(--bg-dark)",
          color: "#fff",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "var(--accent-gold)",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.75rem",
                }}
              >
                Atelier Architectural Services
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                  color: "#fff",
                }}
              >
                Furnishing a New Residence or Penthouse?
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#9B948C",
                  lineHeight: 1.65,
                  marginBottom: "2rem",
                }}
              >
                Our Senior Architects offer comprehensive spatial consultations, timber sample deliveries,
                and custom 3D renders to harmonize with your interior layout.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <CheckCircle2 size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.92rem", color: "#EBE5DC" }}>
                    Private walkthroughs in Mumbai, Bengaluru & Delhi
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <CheckCircle2 size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.92rem", color: "#EBE5DC" }}>
                    Complimentary fabric and solid wood veneer swatch box
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <CheckCircle2 size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: "0.92rem", color: "#EBE5DC" }}>
                    Dedicated White-Glove project coordinator from workshop to installation
                  </span>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => setIsConciergeOpen(true)}
                style={{
                  padding: "0.95rem 2.25rem",
                  fontSize: "0.95rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Calendar size={18} />
                <span>Schedule VIP Architectural Session</span>
              </button>
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xl)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                  alt="Architectural Consultation"
                  style={{ width: "100%", height: "400px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
