"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { useCurrentUser } from "@/hooks/use-current-user"
import { LanguageSelector } from "@/components/LanguageSelector"
import { Button } from "@/components/button"
import UserItem from "@/app/(main)/_components/user-item"

const Header = () => {
  const user = useCurrentUser()

  return (
    <div className="flex w-full justify-between items-center mb-6 px-4 relative">
      <div className="flex items-center gap-6">
        <Image
          alt="government-logo"
          src={"/images/logoText.png"}
          width={150}
          height={100}
        />
        <div>{user && <UserItem />}</div>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        {!user && (
          <Link href={"/auth/login"}>
            <Button className="bg-[#008606] hover:bg-emerald-600 text-sm">
              Sign in
            </Button>
          </Link>
        )}

        {user && (
          <>
            <Link href={"/recentschemes"}>
              <Button
                className={`text-sm hover:bg-[#008606] hover:text-white`}
                variant={"outline"}
              >
                Recent schemes
              </Button>
            </Link>
            <Link href={"/chatbot"}>
              <Button
                className={`bg-[#008606] hover:bg-none text-white hover:text-black text-sm`}
                variant={"outline"}
              >
                Get Into Policy Now
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
