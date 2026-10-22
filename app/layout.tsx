import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import rawData from "@/data/templates.json";
import { PetTemplateData, ThemeFontVariables } from "@/types/templates.types";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});


const templateData: PetTemplateData = rawData;
const fontVariables: ThemeFontVariables = {
  '--font-primary': templateData.common.theme.fonts.primary,
  '--font-heading': templateData.common.theme.fonts.heading,
  '--font-navigation': templateData.common.theme.fonts.navigation,
};

export const metadata: Metadata = {
  title: templateData.common.metadata.title,
  description: templateData.common.metadata.description,
  icons: {
    icon: templateData.common.metadata.icon,
    shortcut: templateData.common.metadata.icon,
    apple: templateData.common.metadata.icon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`} style={fontVariables}>
        {children}
      </body>
    </html>
  );
}
