"use client";

import React, { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, CheckCircle, Calendar, Sparkles, Phone, ShieldCheck } from "lucide-react";

export default function ConciergeModal() {
  const { isConciergeOpen, setIsConciergeOpen, showToast } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Mumbai Bandra Flagship",
    interest: "Complete Home Interior",
    date: "",
  });

  if (!isConciergeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast("Please provide your name and contact phone number");
      return;
    }
    setSubmitted(true);
    showToast("Concierge session requested successfully!");
  };

  const resetAndClose = () => {
    setIsConciergeOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        city: "Mumbai Bandra Flagship",
        interest: "Complete Home Interior",
        date: "",
      });
    }, 300);
  };

  return (
    <div
      className="modal-backdrop active"
      onClick={resetAndClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 18, 16, 0.75)",
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
          maxWidth: "540px",
          background: "var(--bg-surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-xl)",
          overflow: "hidden",
          animation: "fadeIn 0.25s ease-out",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "var(--bg-dark)",
            color: "#fff",
            padding: "1.5rem 1.75rem",
            position: "relative",
          }}
        >
          <button
            onClick={resetAndClose}
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              color: "rgba(255, 255, 255, 0.7)",
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <Sparkles size={18} color="var(--accent-gold)" />
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "1.2px",
                color: "var(--accent-gold)",
                fontWeight: 600,
              }}
            >
              VIP Concierge & Consultation
            </span>
          </div>
          <h3 style={{ fontSize: "1.4rem", fontFamily: "var(--font-serif)", fontWeight: 600 }}>
            Consult with Our Interior Architects
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#9B948C", marginTop: "4px" }}>
            Complimentary design advice, material swatches, and custom dimensional blueprints.
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: "1.75rem" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <CheckCircle
                size={54}
                color="var(--accent-sage)"
                style={{ margin: "0 auto 1rem", display: "block" }}
              />
              <h4 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", fontWeight: 600 }}>
                Appointment Confirmed
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  maxWidth: "380px",
                  margin: "0 auto 1.5rem",
                }}
              >
                Thank you, <strong>{formData.name}</strong>. Our Senior Design Architect will contact you
                within 2 business hours on <strong>{formData.phone}</strong> to confirm your slot.
              </p>
              <button className="btn-primary" onClick={resetAndClose}>
                Return to Gallery
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    marginBottom: "0.35rem",
                    color: "var(--text-primary)",
                  }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raghav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Showroom / Meeting
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-surface)",
                      outline: "none",
                    }}
                  >
                    <option value="Mumbai Bandra Flagship">Mumbai - Bandra West Flagship</option>
                    <option value="Bengaluru Indiranagar">Bengaluru - 100ft Road Indiranagar</option>
                    <option value="New Delhi Mehrauli">New Delhi - The Qutub Mehrauli</option>
                    <option value="Virtual 3D Video Walkthrough">Virtual 3D Video Walkthrough</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    Space / Requirement
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-surface)",
                      outline: "none",
                    }}
                  >
                    <option value="Complete Home Interior">Complete Home Sanctuary</option>
                    <option value="Master Bedroom Suite">Master Bedroom Suite</option>
                    <option value="Living Room Sectional">Living Room & Lounges</option>
                    <option value="Dining & Bar">Dining Table & Seating</option>
                    <option value="Executive Office">Executive Home Office</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Calendar size={18} />
                  <span>Confirm Complimentary Session</span>
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  textAlign: "center",
                }}
              >
                <ShieldCheck size={14} />
                <span>Zero obligations. 100% confidential architectural service.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
