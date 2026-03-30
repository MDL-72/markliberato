import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mark David Liberato - Front-End Engineer",
  description: "Front-End Engineer with 3 years of experience building scalable web applications using React, Next.js, and TypeScript. Skilled at crafting optimized UIs, integrating APIs, and improving performance.",
  keywords: "Front-End Engineer, React, Next.js, TypeScript, Web Development, UI/UX, JavaScript, Portfolio, Samsung, Collabera",
  authors: [{ name: "Mark David Liberato" }],
  creator: "Mark David Liberato",
  publisher: "Mark David Liberato",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Mark David Liberato - Front-End Engineer",
    description: "Front-End Engineer with 3 years of experience building scalable web applications using React, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    siteName: "Mark David Liberato Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mark David Liberato - Front-End Engineer",
    description: "Front-End Engineer with 3 years of experience building scalable web applications using React, Next.js, and TypeScript.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
