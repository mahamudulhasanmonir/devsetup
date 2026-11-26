import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DevSetup — Generate Your Perfect Dev Environment",
  description:
    "Pick your OS, select the tools you need, and get a ready-to-run AI agent setup script — no bloat, no guesswork.",
  openGraph: {
    title: "DevSetup — Generate Your Perfect Dev Environment",
    description:
      "Pick your OS, select the tools you need, and get a ready-to-run AI agent setup script.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0f] text-white font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
