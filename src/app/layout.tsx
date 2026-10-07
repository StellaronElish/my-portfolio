import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rafly Eryan Azis | Full-Stack Developer",
  description: "Portfolio of Rafly Eryan Azis, a junior full-stack developer building useful things for real people.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en"><body>{children}</body></html>
  );
}
