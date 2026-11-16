import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "TheUrbanHuts | Business Control Centre",
  description: "TheUrbanHuts CRM and operations dashboard"
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}