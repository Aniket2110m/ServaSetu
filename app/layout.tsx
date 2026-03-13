import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthButton from "@/components/AuthButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ServaSetu | Professional Home Services, Simplified",
  description: "Experience premium home maintenance with our certified experts. From plumbing to full home AMC plans, we ensure your peace of mind.",
  metadataBase: new URL("https://servasetu.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AuthButton />
        {children}
      </body>
    </html>
  );
}
