import type { Metadata } from "next";
import { Rubik, Rubik_Mono_One } from "next/font/google";
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

import { CloudTransitionProvider } from "@/components/cloud/CloudTransitionProvider";

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
      className={`${rubik.variable} ${rubikOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CloudTransitionProvider>
          {children}
        </CloudTransitionProvider>
      </body>
    </html>
  );
}
