"use client";
import { useSearchParams } from "next/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({
  children,
  modal,
  modal_admin,
  
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  modal_admin: React.ReactNode;
  
}>) {
   const queryparams=useSearchParams();
   const isModal=queryparams.get("modal");
   const isAdmin=queryparams.get("admin");
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {isModal ? modal : null}
        {isAdmin ? modal_admin : null}
      </body>
    </html>
  );
}



