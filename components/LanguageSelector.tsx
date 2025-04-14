"use client"

import * as React from "react"
import { useLanguageStore } from "@/store/language-store"
import { Check, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { label: "English", value: "en" },
  { label: "தமிழ்", value: "ta" },
] as const

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore()

  const handleLanguageChange = (value: "en" | "ta") => {
    setLanguage(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-[140px] justify-start gap-2 bg-white hover:bg-gray-100"
        >
          <Globe className="h-4 w-4" />
          <span>
            {languages.find((l) => l.value === language)?.label || "English"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white w-[140px] border border-gray-200 shadow-lg"
        sideOffset={5}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
            className="cursor-pointer hover:bg-gray-100 px-3 py-2"
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                language === lang.value ? "opacity-100" : "opacity-0"
              }`}
            />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
