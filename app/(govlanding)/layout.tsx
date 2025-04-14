"use client"

import Header from "./_component/Header"
import "../i18n"

// Import i18n configuration

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="sticky top-0 z-[100] bg-white">
        <Header />
      </div>
      <main className="flex-1 relative z-0">{children}</main>
    </div>
  )
}

export default AppLayout
