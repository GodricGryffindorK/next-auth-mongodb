import type { Metadata } from "next";
import { Provider } from "./provider";
import { Inter } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import "./globals.css";
import User from "@/models/User";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mar-k Order",
  description: "Order to Mar-k",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
