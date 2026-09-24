"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Search, Heart, ShoppingBag, Menu, X, PhoneCall } from "lucide-react";
import { CATEGORIES } from "@/data/products";

export default function Header() {
  const pathname = usePathname();
  const {
    cart,
    wishlist,
    setIsSearchOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsConciergeOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsSearchOpen]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="announcement-bar" aria-label="Special Offers">
        <div className="announcement-content">
          <span className="announcement-pill">Atelier Privilege</span>
          <span className="announcement-item">
            Complimentary <strong>White-Glove Delivery & Assembly</strong> Across India
          </span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span className="announcement-item">
            10-Year Structural Warranty on all Solid Teak & Sheesham
          </span>
        </div>
      </aside>

      {/* Main Header */}
      <header
        className={`site-header ${isScrolled ? "scrolled" : ""}`}
        id="siteHeader"
        style={{
          boxShadow: isScrolled ? "var(--shadow-md)" : "none",
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div className="container">
          <div className="header-inner">
            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn action-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
            </button>

            {/* Brand Logo */}
            <Link href="/" className="brand-logo" aria-label="Verona Atelier Home">
              <div className="brand-emblem">V</div>
              <div className="brand-text">
                <span className="brand-name">VERONA</span>
                <span className="brand-tagline">ATELIER • FURNITURE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                href="/category/sofas"
                className={`nav-link ${pathname.startsWith("/category/sofas") ? "active" : ""}`}
              >
                Living Room
              </Link>
              <Link
                href="/category/beds"
                className={`nav-link ${pathname.startsWith("/category/beds") ? "active" : ""}`}
              >
                Bedroom
              </Link>
              <Link
                href="/category/dining"
                className={`nav-link ${pathname.startsWith("/category/dining") ? "active" : ""}`}
              >
                Dining Room
              </Link>
              <Link
                href="/category/office"
                className={`nav-link ${pathname.startsWith("/category/office") ? "active" : ""}`}
              >
                Office
              </Link>
              <Link
                href="/category/tables"
                className={`nav-link ${pathname.startsWith("/category/tables") ? "active" : ""}`}
              >
                Tables
              </Link>
              <Link
                href="/category/wardrobes"
                className={`nav-link ${pathname.startsWith("/category/wardrobes") ? "active" : ""}`}
              >
                Wardrobes
              </Link>
              <button
                type="button"
                className="nav-link badge-pill"
                onClick={() => setIsConciergeOpen(true)}
                style={{ cursor: "pointer", background: "none" }}
              >
                Showroom Concierge
              </button>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* Search Trigger */}
              <button
                className="action-btn"
                onClick={() => setIsSearchOpen(true)}
                title="Search Collection (Press /)"
                aria-label="Search Furniture"
              >
                <Search size={18} />
              </button>

              {/* Wishlist Trigger */}
              <button
                className="action-btn"
                onClick={() => setIsWishlistOpen(true)}
                title="Saved Items"
                aria-label="Wishlist"
                style={{ position: "relative" }}
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "var(--accent-gold)",
                      color: "#fff",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Atelier Bag Trigger */}
              <button
                className="action-btn"
                onClick={() => setIsCartOpen(true)}
                title="Atelier Bag"
                aria-label="Cart"
                style={{ position: "relative" }}
              >
                <ShoppingBag size={18} />
                {totalCartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "var(--accent-terracotta)",
                      color: "#fff",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`drawer-backdrop ${mobileMenuOpen ? "active" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(20, 18, 16, 0.6)",
          zIndex: 998,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      <aside
        className="drawer-panel"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "320px",
          maxWidth: "85vw",
          background: "var(--bg-surface)",
          zIndex: 999,
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "var(--shadow-xl)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="drawer-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <div className="brand-logo">
            <div className="brand-emblem">V</div>
            <span className="brand-name" style={{ fontSize: "1.2rem" }}>
              VERONA
            </span>
          </div>
          <button
            className="drawer-close-btn action-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className="drawer-body"
          style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}
        >
          <h5
            className="section-label"
            style={{
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "1px",
              color: "var(--text-tertiary)",
              marginBottom: "1rem",
            }}
          >
            Browse Showroom Rooms
          </h5>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "1.05rem",
                fontWeight: 600,
                padding: "0.6rem 0",
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              Home
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  padding: "0.6rem 0",
                  borderBottom: "1px solid var(--border-light)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{cat.name}</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Explore →
                </span>
              </Link>
            ))}
          </nav>

          <div
            style={{
              background: "var(--bg-secondary)",
              padding: "1.25rem",
              borderRadius: "var(--radius-md)",
            }}
          >
            <span
              className="section-label"
              style={{
                display: "block",
                marginBottom: "0.3rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--accent-gold)",
              }}
            >
              Concierge Desk
            </span>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-secondary)",
                marginBottom: "1rem",
                lineHeight: 1.4,
              }}
            >
              Need interior guidance or custom dimensions? Speak with our showroom architects.
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsConciergeOpen(true);
              }}
              style={{
                width: "100%",
                fontSize: "0.85rem",
                padding: "0.65rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <PhoneCall size={16} />
              Book Consultation
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
