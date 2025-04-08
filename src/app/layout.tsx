import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/services/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
// import { AntdRegistry } from '@ant-design/nextjs-registry';
// import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
import DynamicTitle from "./components/DynamicTitle";
// import '@ant-design/v5-patch-for-react-19';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workzen Pro",
  description: "Workzen Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-hide`}
      >
        <ReactQueryProvider>
          {/* <AntdRegistry> */}
            <DynamicTitle/>
            {children}
          {/* </AntdRegistry> */}
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
