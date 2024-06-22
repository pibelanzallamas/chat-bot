import { Inter } from "next/font/google";
import "dotenv/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Demo-bot",
  description: "demo-bot por brandon castillo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
