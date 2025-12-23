import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
// import Sidebar from "@/components/sidebar";
// import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Origin App",
  description: "Dashboard with a sidebar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      {/* <div className="absolute top-0 left-0 w-full z-10">
          <Header />
        </div> */}
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
