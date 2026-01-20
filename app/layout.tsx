import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kodchasan = localFont({
  variable: "--font-kodchasan",
  display: "swap",
  src: [
    { path: "../public/fonts/Kodchasan-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/Kodchasan-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Kodchasan-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Kodchasan-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Kodchasan-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Kodchasan-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/Kodchasan-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/Kodchasan-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/fonts/Kodchasan-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/fonts/Kodchasan-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/Kodchasan-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../public/fonts/Kodchasan-SemiBoldItalic.ttf", weight: "600", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Wedding Invitation | Khuanpawee & Chukiat",
  description: "Online wedding invitation for Khuanpawee Thuma and Chukiat Jadeestan — Save the date 10.03.2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${kodchasan.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
