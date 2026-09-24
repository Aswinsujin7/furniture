import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import ConciergeModal from "@/components/ConciergeModal";
import ToastContainer from "@/components/ToastContainer";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Verona Atelier | Handcrafted Luxury Furniture & Contemporary Sanctuaries",
  description:
    "Discover handcrafted solid teak beds, modular sectionals, sintered stone dining tables, and ergonomic chairs inspired by Italian elegance.",
  keywords: [
    "luxury furniture",
    "solid wood bed",
    "teak wood king bed",
    "modular sofa",
    "dining table set",
    "verona atelier",
  ],
  authors: [{ name: "Verona Atelier" }],
  openGraph: {
    title: "Verona Atelier | Handcrafted Luxury Furniture",
    description: "Artisanal solid wood and contemporary upholstered pieces crafted to elevate your sanctuary.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23141210'/><text x='50' y='68' font-family='serif' font-size='60' font-weight='bold' fill='%23B88E4F' text-anchor='middle'>V</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body>
        <ShopProvider>
          <Header />
          <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
          <Footer />
          <SearchModal />
          <CartDrawer />
          <WishlistDrawer />
          <ConciergeModal />
          <ToastContainer />
        </ShopProvider>
      </body>
    </html>
  );
}
