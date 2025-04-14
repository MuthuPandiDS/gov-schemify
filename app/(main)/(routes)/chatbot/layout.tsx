"use client"

import React from "react"
import { redirect } from "next/navigation"

import { useCurrentUser } from "@/hooks/use-current-user"

const ChatbotLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser()
  if (!user) {
    redirect("/")
  }
  return (
    <>
      <div className="h-full">
        <main className="flex relative h-full mt-auto mb-7 justify-center w-full">
          {children}
        </main>
      </div>
    </>
  )
}
export default ChatbotLayout
