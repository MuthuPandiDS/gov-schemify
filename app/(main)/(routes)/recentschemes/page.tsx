"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { trpc } from "@/app/_trpc/client"

const parseSchemeDetails = (schemeData: string | null) => {
  if (!schemeData) return null
  try {
    // First try direct JSON parse
    const parsed = JSON.parse(schemeData)
    return parsed
  } catch (e) {
    try {
      // If direct parse fails, try cleaning the string first
      const cleanedData = schemeData
        .replace(/^```json\s*/, "") // Remove ```json
        .replace(/```$/, "") // Remove trailing ```
        .trim()
      return JSON.parse(cleanedData)
    } catch (e2) {
      // If both attempts fail, try to extract content between curly braces
      const match = schemeData.match(/{[\s\S]*}/)
      if (match) {
        try {
          return JSON.parse(match[0])
        } catch (e3) {
          console.error("Failed to parse scheme data:", e3)
          return null
        }
      }
      console.error("Failed to parse scheme data:", e2)
      return null
    }
  }
}

const cleanTextContent = (text: string) => {
  return text
    ?.replaceAll('"', " ")
    .replaceAll("{", " ")
    .replaceAll("}", " ")
    .replaceAll("[", " ")
    .replaceAll("]", " ")
    .replaceAll("```json", " ")
    .replaceAll("```", " ")
    .trim()
}

const RecentSchemes = () => {
  const recentSchemes = trpc.scheme.getNewSchemes.useQuery().data
  const { t } = useTranslation()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            {t("recentSchemes")}
          </span>
        </h1>
        <p className="text-gray-600 text-lg">
          {t("discoverTheLatestGovernmentSchemesAvailableForYou")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentSchemes?.map((scheme, index) => {
          const schemeDetails = parseSchemeDetails(scheme.schemeName)
          if (!schemeDetails?.Details) return null

          const cleanDetails = cleanTextContent(schemeDetails.Details)
          if (!cleanDetails) return null

          return (
            <Card
              key={scheme.id}
              className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50 border-green-100"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {t("scheme")} {index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-4">{cleanDetails}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Link
                  href={{
                    pathname: "/chatbot",
                    query: {
                      schemedetail: cleanDetails,
                    },
                  }}
                >
                  <Button
                    variant="outline"
                    className="group-hover:bg-green-500 group-hover:text-white transition-all duration-300 border-green-200"
                  >
                    {t("viewDetails")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default RecentSchemes
