import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProviderWrapper from "@/providers/SessionProviderWrapper";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Todo App",
  description:
    "A minimal, fast, and accessible todo app built with Next.js — create, edit, and organize tasks with priorities and due dates. Keyboard-friendly controls and local persistence help you stay focused and productive.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper session={session}>
          <Header />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
