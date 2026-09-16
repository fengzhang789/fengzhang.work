import type { Metadata } from "next";
import { Schibsted_Grotesk, Bodoni_Moda, Source_Serif_4 } from "next/font/google";
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

// Long-form reading face for writing posts — a text serif built for
// extended reading, distinct from Schibsted Grotesk's UI-chrome duty.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-src",
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
    <html
      lang="en"
      className={`${grotesk.variable} ${bodoni.variable} ${sourceSerif.variable}`}
    >
      <body>
        <div className="atmosphere" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
