"use client"

import Header from "@/components/Header"
import { LanguageSelector } from "@/components/LanguageSelector"

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default AppLayout
