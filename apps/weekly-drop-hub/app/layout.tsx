import { WhopApp } from "@whop/react/components";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-lab-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weekly Drop Hub",
  description: "Dated archive of Tuesday live builds and Friday skill drops for AI Agent Lab.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sans.variable}>
        <WhopApp appearance="dark">{children}</WhopApp>
      </body>
    </html>
  );
}
