import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skycast Weather App",
  description: "Check live weather updates from anywhere in the world",
  icons: "/icon.webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased container mx-auto bg-cover bg-center min-h-screen bg-[#101010] text-white">
        {children}
      </body>
    </html>
  );
}
