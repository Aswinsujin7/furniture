"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  getProductById,
  getCategoryById,
  PRODUCTS,
  Product,
  formatCurrency,
} from "@/data/products";
import { useShop } from "@/context/ShopContext";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ChevronRight,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = typeof params?.id === "string" ? params.id : "royal-king-bed";

  const product = getProductById(productId) || PRODUCTS[0];
  const category = getCategoryById(product.category);

  const { addToCart, toggleWishlist, isInWishlist, setIsConciergeOpen, showToast } = useShop();
  const isFavorited = isInWishlist(product.id);

  const [activeImage, setActiveImage] = useState<string>(product.primaryImage);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || "Standard"
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || "Standard"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "warranty">("features");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      setPincodeStatus("error");
      showToast("Please enter a valid 6-digit Indian PIN code");
      return;
    }

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const dateStr = deliveryDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    setPincodeStatus(`Free White-Glove Delivery by ${dateStr} • Assembly Included`);
    showToast(`Delivery available for PIN ${pincode}`);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div style={{ paddingBottom: "6rem" }}>
      {/* Breadcrumbs */}
      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "1rem 0",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="container">
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
            }}
          >
            <Link href="/" style={{ color: "var(--text-primary)" }}>
              Home
            </Link>
            <ChevronRight size={14} />
            {category && (
              <>
                <Link href={`/category/${category.id}`} style={{ color: "var(--text-primary)" }}>
                  {category.name}
                </Link>
                <ChevronRight size={14} />
              </>
            )}
            <span style={{ color: "var(--accent-gold)", fontWeight: 600 }}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container" style={{ paddingTop: "1.5rem" }}>
        <div className="product-detail-layout">
          {/* Left Media Gallery */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                background: "var(--bg-secondary)",
                boxShadow: "var(--shadow-md)",
                marginBottom: "0.75rem",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "clamp(260px, 45vh, 480px)",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />

              {product.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    background: "var(--text-primary)",
                    color: "#fff",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-sm)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div
                className="no-scrollbar"
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  overflowX: "auto",
                  paddingBottom: "0.5rem",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    style={{
                      border: activeImage === img ? "2px solid var(--accent-gold)" : "2px solid var(--border-light)",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      padding: 0,
                      flexShrink: 0,
                      cursor: "pointer",
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      style={{ width: "70px", height: "70px", objectFit: "cover", display: "block" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details & Options */}
          <div>
            {/* Stock Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--accent-sage)",
                  background: "rgba(56, 80, 64, 0.1)",
                  padding: "3px 10px",
                  borderRadius: "var(--radius-full)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <CheckCircle2 size={13} />
                {product.availability} • Only {product.stockCount} left in showroom
              </span>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 2.7rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: "0.6rem",
              }}
            >
              {product.name}
            </h1>

            {/* Ratings */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1.25rem",
                fontSize: "0.88rem",
              }}
            >
              <div style={{ display: "flex", color: "#E59819", alignItems: "center", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#E59819" />
                ))}
              </div>
              <span style={{ fontWeight: 600 }}>{product.rating}</span>
              <span style={{ color: "var(--text-tertiary)" }}>
                ({product.reviewsCount} verified homeowner reviews)
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                background: "var(--bg-secondary)",
                padding: "1.25rem 1.5rem",
                borderRadius: "var(--radius-md)",
                marginBottom: "1.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                    }}
                  >
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span
                      style={{
                        fontSize: "1.1rem",
                        color: "var(--text-tertiary)",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                  Inclusive of all taxes & free expert assembly
                </div>
              </div>

              {discountPercent > 0 && (
                <div
                  style={{
                    background: "var(--accent-terracotta)",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                  }}
                >
                  Save {discountPercent}% Today
                </div>
              )}
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "0.6rem",
                  }}
                >
                  <span>Select Timber / Fabric Finish:</span>
                  <span style={{ color: "var(--accent-gold)" }}>{selectedColor}</span>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        backgroundColor: c.hex,
                        outline: selectedColor === c.name ? "2px solid var(--accent-gold)" : "none",
                        outlineOffset: "3px",
                        border: "1px solid rgba(0,0,0,0.15)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: "1.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    marginBottom: "0.6rem",
                  }}
                >
                  <span>Dimension Configuration:</span>
                  <span style={{ color: "var(--accent-gold)" }}>{selectedSize}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: "0.55rem 1.15rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        border: selectedSize === s ? "1.5px solid var(--accent-gold)" : "1px solid var(--border-light)",
                        background: selectedSize === s ? "var(--accent-gold-light)" : "var(--bg-surface)",
                        color: selectedSize === s ? "var(--accent-gold-hover)" : "var(--text-primary)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pincode Delivery Checker */}
            <div
              style={{
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                marginBottom: "2rem",
                background: "var(--bg-surface)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                <MapPin size={16} color="var(--accent-gold)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  Delivery & White-Glove Assembly Checker
                </span>
              </div>
              <form onSubmit={handlePincodeCheck} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN code (e.g. 400050)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.65rem 1rem",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: "0 1.25rem", fontSize: "0.85rem" }}
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <div
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.82rem",
                    color: pincodeStatus === "error" ? "var(--accent-terracotta)" : "var(--accent-sage)",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <CheckCircle2 size={14} />
                  <span>{pincodeStatus}</span>
                </div>
              )}
            </div>

            {/* Add to Bag and Wishlist Actions */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {/* Quantity */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-surface)",
                  flexShrink: 0,
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ padding: "0.75rem 0.9rem", fontSize: "1rem" }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ fontWeight: 600, minWidth: "24px", textAlign: "center" }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: "0.75rem 0.9rem", fontSize: "1rem" }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Main Add Button */}
              <button
                className="btn-primary"
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "0.85rem 1.25rem",
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

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid var(--border-light)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isFavorited ? "#E03131" : "var(--text-secondary)",
                  background: "var(--bg-surface)",
                  flexShrink: 0,
                }}
                title={isFavorited ? "Saved in wishlist" : "Add to wishlist"}
              >
                <Heart size={20} fill={isFavorited ? "#E03131" : "none"} />
              </button>
            </div>

            {/* Concierge Consultation Button */}
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="btn-outline"
              style={{
                width: "100%",
                padding: "0.85rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
                marginBottom: "2rem",
              }}
            >
              <Calendar size={16} />
              <span>Book Virtual Architectural Walkthrough</span>
            </button>

            {/* Key Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
                gap: "1rem",
                borderTop: "1px solid var(--border-light)",
                paddingTop: "1.5rem",
                fontSize: "0.82rem",
                color: "var(--text-secondary)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShieldCheck size={18} color="var(--accent-gold)" />
                <span>{product.warranty}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Truck size={18} color="var(--accent-gold)" />
                <span>Free White-Glove Setup</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={18} color="var(--accent-gold)" />
                <span>100% Solid Seasoned Timber</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Clock size={18} color="var(--accent-gold)" />
                <span>Zero-Sag Spring Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Craftsmanship Information */}
        <div style={{ marginTop: "3.5rem" }}>
          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              borderBottom: "1px solid var(--border-light)",
              gap: "1.5rem",
              overflowX: "auto",
              whiteSpace: "nowrap",
              WebkitOverflowScrolling: "touch",
              marginBottom: "1.5rem",
              paddingBottom: "0.25rem",
            }}
          >
            <button
              onClick={() => setActiveTab("features")}
              style={{
                padding: "0.65rem 0",
                fontSize: "0.95rem",
                fontWeight: 600,
                borderBottom: activeTab === "features" ? "2px solid var(--accent-gold)" : "2px solid transparent",
                color: activeTab === "features" ? "var(--text-primary)" : "var(--text-secondary)",
                flexShrink: 0,
              }}
            >
              Handcrafted Features
            </button>

            <button
              onClick={() => setActiveTab("specs")}
              style={{
                padding: "0.65rem 0",
                fontSize: "0.95rem",
                fontWeight: 600,
                borderBottom: activeTab === "specs" ? "2px solid var(--accent-gold)" : "2px solid transparent",
                color: activeTab === "specs" ? "var(--text-primary)" : "var(--text-secondary)",
                flexShrink: 0,
              }}
            >
              Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab("warranty")}
              style={{
                padding: "0.65rem 0",
                fontSize: "0.95rem",
                fontWeight: 600,
                borderBottom: activeTab === "warranty" ? "2px solid var(--accent-gold)" : "2px solid transparent",
                color: activeTab === "warranty" ? "var(--text-primary)" : "var(--text-secondary)",
                flexShrink: 0,
              }}
            >
              Warranty & White-Glove Care
            </button>
          </div>

          <div
            style={{
              background: "var(--bg-surface)",
              padding: "clamp(1.25rem, 3vw, 2.5rem)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-light)",
            }}
          >
            {activeTab === "features" && (
              <div>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "var(--text-secondary)",
                    marginBottom: "1.75rem",
                  }}
                >
                  {product.description}
                </p>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>
                  Signature Atelier Highlights
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "0.85rem" }}>
                  {product.features.map((feat, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                      <CheckCircle2 size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.9rem", color: "var(--text-primary)" }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "280px", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.75rem 0", color: "var(--text-secondary)", width: "40%" }}>
                        Primary Material
                      </td>
                      <td style={{ padding: "0.75rem 0", fontWeight: 600 }}>{product.material}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.85rem 0", color: "var(--text-secondary)" }}>Dimensions</td>
                      <td style={{ padding: "0.85rem 0", fontWeight: 600 }}>{product.dimensions}</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "0.85rem 0", color: "var(--text-secondary)" }}>Warranty</td>
                      <td style={{ padding: "0.85rem 0", fontWeight: 600 }}>{product.warranty}</td>
                    </tr>
                    {product.specs &&
                      Object.entries(product.specs).map(([k, v]) => (
                        <tr key={k} style={{ borderBottom: "1px solid var(--border-light)" }}>
                          <td style={{ padding: "0.85rem 0", color: "var(--text-secondary)" }}>{k}</td>
                          <td style={{ padding: "0.85rem 0", fontWeight: 600 }}>{v}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "warranty" && (
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.75rem" }}>
                  10-Year Comprehensive Structural Warranty
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Every solid wood bed, sofa framework, and dining suite is warranted against termite infestation,
                  structural joint loosening, and timber warping for a decade from the installation date.
                </p>

                <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Caring for Artisanal Hardwood & Bouclé
                </h4>
                <ul
                  style={{
                    paddingLeft: "1.25rem",
                    fontSize: "0.88rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  <li>Dust gently along timber grain lines using a soft micro-fiber dry cloth.</li>
                  <li>Avoid direct prolonged exposure to extreme dampness or harsh midday sun rays.</li>
                  <li>Re-nourish solid Teak and Sheesham with organic beeswax once every 18 months.</li>
                  <li>Blot spills immediately with an absorbent towel; do not scrub bouclé loops.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "6rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "var(--accent-gold)",
                    fontWeight: 600,
                  }}
                >
                  Harmonious Pairings
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: 600 }}>
                  Complementary Pieces
                </h2>
              </div>
              {category && (
                <Link
                  href={`/category/${category.id}`}
                  style={{ fontSize: "0.9rem", color: "var(--accent-gold)", fontWeight: 600 }}
                >
                  Explore All {category.name} →
                </Link>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                gap: "2rem",
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <div className="sticky-mobile-buy-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0, flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.primaryImage}
            alt=""
            style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "var(--radius-sm)", flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--text-primary)" }}>
              {product.name}
            </div>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {formatCurrency(product.price)}
            </div>
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={handleAddToCart}
          style={{
            padding: "0.55rem 1.15rem",
            fontSize: "0.85rem",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            flexShrink: 0,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <ShoppingBag size={16} />
          <span>Add</span>
        </button>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
