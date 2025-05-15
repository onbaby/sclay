import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import FacebookPixel from "@/components/FacebookPixel"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SCLAY - Scale Your Local Service Business",
  description:
    "We help local service businesses scale through website optimization, system upgrades, and task automation.",
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Blinker:wght@100;200;300;400;600;700;800;900&family=Oxanium:wght@200..800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} dark`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <FacebookPixel />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
