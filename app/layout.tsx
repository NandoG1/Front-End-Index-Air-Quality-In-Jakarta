import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnimationProvider from "@/components/animation-provider"
import ChatBotWrapper from "@/components/chat/ChatBotWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Jakarta Weather AI - Advanced Weather Prediction",
  description:
    "AI-powered weather prediction for Jakarta using machine learning models. Get accurate weather classifications based on dates or specific parameters.",
    generator: 'v0.dev'
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black min-h-screen`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <AnimationProvider>
            <div className="fixed inset-0 noise-bg pointer-events-none"></div>
            {children}
          </AnimationProvider>
        </ThemeProvider>
        <ChatBotWrapper/>
      </body>
    </html>
  )
}
