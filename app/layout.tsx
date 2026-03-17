import type { Metadata, Viewport } from "next";
import "./globals.css";
import { APP_NAME, RIGHTS_HOLDER } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} · ${RIGHTS_HOLDER}`,
  description: "Read .lpdx Light Progressive Document Exchange files in a clean, mobile-friendly interface.",
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  keywords: ["LightDoc", ".lpdx", "document reader", "The Palace Tech House"],
};

export const viewport: Viewport = {
  themeColor: "#0b1020",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
