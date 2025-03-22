import type { Metadata } from "next";
import "./globals.css";
import ClientHeader from "../components/ClientHeader";
import HydrationBoundary from "../components/HydrationBoundary";

export const metadata: Metadata = {
  title: "Adhivakta - Legal Case Management",
  description: "A robust legal case management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="smooth-scroll">
        <HydrationBoundary>
          <ClientHeader />
          <main>{children}</main>
        </HydrationBoundary>
      </body>
    </html>
  );
}