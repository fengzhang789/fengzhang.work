import type { Metadata } from "next";
import { Schibsted_Grotesk, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk-src",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-bodoni-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Feng Zhang",
  description:
    "Software Engineer studying CS at the University of Waterloo. Interested in distributed systems, databases, kernels, and networking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${bodoni.variable}`}>
      <body>
        <div className="atmosphere" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
