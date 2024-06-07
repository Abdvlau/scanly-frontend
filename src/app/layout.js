"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import HomeHeader from '@/components/HomeHeader';
import Footer from '@/components/footer';
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();
  const isDashboardPage = router.pathname === "/dashboard";

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <HomeHeader />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
