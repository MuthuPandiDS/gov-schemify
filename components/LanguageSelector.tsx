"use client"

import * as React from "react"
import { useLanguageStore } from "@/store/language-store"
import { Check, Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

const languages = [
  { label: "English", value: "en" },
  { label: "தமிழ்", value: "ta" },
] as const

export function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore()
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLanguageChange = (value: "en" | "ta") => {
    setLanguage(value)
    i18n.changeLanguage(value)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-[140px] px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-200"
      >
        <Globe className="h-4 w-4" />
        <span className="flex-1 text-left">
          {languages.find((l) => l.value === language)?.label || t("english")}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-200 rounded-md shadow-lg z-[9999]">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleLanguageChange(lang.value)}
              className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none transition-colors duration-200"
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  language === lang.value ? "opacity-100" : "opacity-0"
                }`}
              />
              {lang.value === "en" ? t("english") : t("tamil")}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
