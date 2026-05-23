import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";

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

        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>

      </body>
    </html>
  );
}