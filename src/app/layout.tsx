import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundBottom, BackgroundTop } from "@/components/background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Message Board",
  description:
    "A chat-like fun mini message board for posting and sharing thoughts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative h-dvh md:h-auto`}
      >
        <BackgroundTop />
        <BackgroundBottom />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
