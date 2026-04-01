import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hultprize-nationals-boston.com"),
  title: {
    default: "Hult Prize Nationals | Hult Boston 2026",
    template: "%s | Hult Prize Nationals Boston",
  },
  description:
    "Hult Prize Nationals at Hult Boston on May 1 to 2, 2026. The participant hub for schedule, submissions, FAQs, and travel information.",
  keywords: [
    "Hult Prize",
    "Nationals",
    "Boston",
    "2026",
    "social entrepreneurship",
    "pitch competition",
  ],
  openGraph: {
    title: "Hult Prize Nationals | Hult Boston 2026",
    description:
      "May 1 to 2, 2026 · 1 Education St, Cambridge, MA. Your participant hub for Hult Prize Nationals.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hult Prize Nationals | Hult Boston 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hult Prize Nationals | Hult Boston 2026",
    description: "May 1 to 2, 2026 · Cambridge, MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // #region agent log
  void fetch("http://127.0.0.1:7888/ingest/44cf9682-741f-426a-a997-54e782ee96e3", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "b40630",
    },
    body: JSON.stringify({
      sessionId: "b40630",
      runId: "deploy-debug-pre-fix",
      hypothesisId: "H1",
      location: "app/layout.tsx:57",
      message: "RootLayout rendered",
      data: { pageType: "app-root" },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  return (
    <html lang="en" className={figtree.variable}>
      <body className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
