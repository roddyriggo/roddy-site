import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";
import Link from "next/link";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RDDY",
  description: "Producer / Writer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>

        {/* BRAND */}
        <Link
  href="/"
  style={{
    position: "fixed",
    top: "24px",
    left: "24px",
    zIndex: 9999,
  }}
  className="text-zinc-300 tracking-[0.2em] lowercase hover:text-white transition-colors"
>
  roddyriggo
</Link>

                <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>

      </body>
    </html>
  );
}