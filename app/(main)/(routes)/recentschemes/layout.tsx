"use client"

import React from "react"
import { redirect } from "next/navigation"

import { useCurrentUser } from "@/hooks/use-current-user"

const SchemeLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser()
  if (!user) {
    redirect("/")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <main className="h-full">{children}</main>
    </div>
  )
}

export default SchemeLayout
