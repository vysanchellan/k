import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kairos",
  description: "a portrait in code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-mono">
        {children}
      </body>
    </html>
  );
}
