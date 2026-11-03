import type { Metadata, Viewport } from "next";
import { Rubik, Rubik_Mono_One, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const rubikOne = Rubik_Mono_One({
  variable: "--font-rubik-one",
  subsets: ["latin"],
  weight: ["400"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

import { CloudTransitionProvider } from "@/components/cloud/CloudTransitionProvider";
import ScreenGuard from "@/components/screenguard/ScreenGuard";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Hana Hunt - Petualangan Sinau Basa Jawa",
  description: "Game edukasi lan petualangan sinau aksara jawa kanggo kanca-kanca!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="jv"
      className={`${rubik.variable} ${rubikOne.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ScreenGuard />
        <CloudTransitionProvider>
          {children}
        </CloudTransitionProvider>
      </body>
    </html>
  );
}
