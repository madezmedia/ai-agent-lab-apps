import { WhopApp } from "@whop/react/components";
import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-lab-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-lab-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roadmap Vote",
  description: "Proposal cards for the AI Agent Lab roadmap.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable}`}>
        <WhopApp appearance="dark">{children}</WhopApp>
      </body>
    </html>
  );
}
