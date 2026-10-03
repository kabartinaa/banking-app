import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter,IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter= Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  weight:['400' , '700'],
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Horizon - Personal Finance Dashboard",
  description: "A modern personal finance dashboard built with Next.js",
  icons:{
    icon:'/public/icons/logo.svg'
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className={`${inter.variable} ${ibmPlexSerif.variable} `}>{children}</body>
    </html>
  );
}
