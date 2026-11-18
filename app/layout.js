import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ploy Support Desk",
  description: "Customer complaint ticket management for administrators.",
};

// The root layout wraps every page, including the login page.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-slate-900">{children}</body>
    </html>
  );
}
