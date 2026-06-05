import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillProof | Proof-backed resume claims",
  description: "A hardcoded SkillProof mock demo for turning student experience into proof-backed resume claims."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
