import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ilumino - Lançando luz sobre sua saúde",
  description: "Preparação inteligente para exames e consultas.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Ilumino - Lançando luz sobre sua saúde",
    description: "Preparação inteligente para exames e consultas.",
    url: "https://ilumino.quadrosdesaude.com.br",
    siteName: "Ilumino Health",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Ilumino - Lâmpada iluminando sua saúde",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ilumino - Lançando luz sobre sua saúde",
    description: "Preparação inteligente para exames e consultas.",
    images: ["/icon.svg"],
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
