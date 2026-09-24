"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, Clock, ArrowRight, Check } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import { useShop } from "@/context/ShopContext";

export default function Footer() {
  const { showToast } = useShop();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    showToast("Welcome to the Verona Atelier Private Circle");
    setEmail("");
  };

  return (
    <footer className="site-footer" style={{ background: "var(--bg-dark)", color: "var(--text-inverse)" }}>
      {/* Guarantees Bar */}
      <div
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "3rem 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              gap: "2rem",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "rgba(184, 142, 79, 0.15)",
                  color: "var(--accent-gold)",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  flexShrink: 0,
                }}
              >
                <Truck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.3rem", color: "#fff" }}>
                  White-Glove Delivery
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#9B948C", lineHeight: 1.4 }}>
                  Complimentary unboxing, room placement, and expert assembly across 15,000+ pin codes.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "rgba(184, 142, 79, 0.15)",
                  color: "var(--accent-gold)",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.3rem", color: "#fff" }}>
                  10-Year Warranty
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#9B948C", lineHeight: 1.4 }}>
                  Comprehensive structural guarantee on kiln-dried solid Sheesham and Teak wood.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "rgba(184, 142, 79, 0.15)",
                  color: "var(--accent-gold)",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.3rem", color: "#fff" }}>
                  Bespoke Customization
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#9B948C", lineHeight: 1.4 }}>
                  Tailor timber stains, dimensions, and premium upholstery fabrics to your sanctuary.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div
                style={{
                  background: "rgba(184, 142, 79, 0.15)",
                  color: "var(--accent-gold)",
                  padding: "0.85rem",
                  borderRadius: "var(--radius-md)",
                  flexShrink: 0,
                }}
              >
                <Clock size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.3rem", color: "#fff" }}>
                  100-Night Sleep Trial
                </h4>
                <p style={{ fontSize: "0.85rem", color: "#9B948C", lineHeight: 1.4 }}>
                  Experience orthopedic mattresses and luxury beds in the tranquil sanctuary of your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div style={{ padding: "4.5rem 0 3.5rem" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "3rem",
            }}
          >
            {/* Brand Column */}
            <div style={{ maxWidth: "340px" }}>
              <div className="brand-logo" style={{ marginBottom: "1.25rem" }}>
                <div className="brand-emblem">V</div>
                <div className="brand-text">
                  <span className="brand-name" style={{ color: "#fff" }}>
                    VERONA
                  </span>
                  <span className="brand-tagline">ATELIER • FURNITURE</span>
                </div>
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#9B948C",
                  lineHeight: 1.7,
                  marginBottom: "1.75rem",
                }}
              >
                Verona Atelier handcrafts enduring architectural furniture inspired by Italian elegance
                and built with seasoned sustainable hardwoods. Designed to stand as the centerpiece of modern life.
              </p>
              <div style={{ fontSize: "0.82rem", color: "var(--accent-gold)" }}>
                ✦ Flagship Showrooms: Bandra Mumbai • Indiranagar Bengaluru • Mehrauli New Delhi
              </div>
            </div>

            {/* Living Spaces */}
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  color: "#fff",
                  marginBottom: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Living Spaces
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.id}`}
                      style={{
                        color: "#9B948C",
                        fontSize: "0.9rem",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#9B948C")}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sanctuaries & Work */}
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  color: "#fff",
                  marginBottom: "1.25rem",
                  fontWeight: 600,
                }}
              >
                Collections
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {CATEGORIES.slice(5).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.id}`}
                      style={{
                        color: "#9B948C",
                        fontSize: "0.9rem",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#9B948C")}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/category/sofas"
                    style={{ color: "#9B948C", fontSize: "0.9rem" }}
                  >
                    Architectural Custom Builds
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  textTransform: "uppercase",
                  letterSpacing: "1.2px",
                  color: "#fff",
                  marginBottom: "1.25rem",
                  fontWeight: 600,
                }}
              >
                The Private Circle
              </h4>
              <p
                style={{
                  fontSize: "0.86rem",
                  color: "#9B948C",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                }}
              >
                Receive seasonal catalogs, private showroom invitations, and bespoke lookbooks directly.
              </p>
              {subscribed ? (
                <div
                  style={{
                    background: "rgba(184, 142, 79, 0.15)",
                    border: "1px solid var(--accent-gold)",
                    padding: "0.85rem",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--accent-gold)",
                    fontSize: "0.85rem",
                  }}
                >
                  <Check size={18} />
                  <span>You are subscribed to the Atelier Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "var(--radius-md)",
                      color: "#fff",
                      padding: "0.75rem 1rem",
                      fontSize: "0.88rem",
                      flex: 1,
                      minWidth: 0,
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      padding: "0 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.82rem",
              color: "#68615A",
            }}
          >
            <div>
              © {new Date().getFullYear()} Verona Atelier Luxury Furniture Private Limited. All rights reserved.
            </div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span style={{ cursor: "pointer" }}>Privacy Policy</span>
              <span style={{ cursor: "pointer" }}>Terms of Craft</span>
              <span style={{ cursor: "pointer" }}>Sustainability Index</span>
              <span style={{ cursor: "pointer" }}>White-Glove Care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
