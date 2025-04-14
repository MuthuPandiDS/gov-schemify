"use client"

import { FormEvent, useEffect, useState } from "react"
import { Pacifico } from "next/font/google"
import toast from "react-hot-toast"

import ScrapeAndStoreSchemes from "@/lib/actions"
import { trpc } from "@/app/_trpc/client"

import { sendmail } from "./mailerlist"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
})

const isValidSchemeURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname
    if (
      hostname.includes("myscheme.gov.in") ||
      hostname.includes("myscheme") ||
      hostname.endsWith("myscheme.gov.in")
    ) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

const Searchbar = () => {
  // Get all users' emails
  const { data: users } = trpc.user.getAll.useQuery()
  const userEmails = users
    ?.map((user) => user.email)
    .filter(Boolean) as string[]

  // For storing the scheme id from scraping
  const [schemeId, setSchemeId] = useState<string | null>(null)
  // Flag to avoid sending email multiple times
  const [mailSent, setMailSent] = useState(false)
  const [searchPrompt, setSearchPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emoji, setEmoji] = useState("👋")

  // TRPC mutations and queries
  const scrapedSchemes = trpc.scrapeSchemes.createScheme.useMutation()
  const { data: schemeData } = trpc.scheme.getSchemeById.useQuery(
    schemeId || "",
    {
      enabled: !!schemeId,
    }
  )

  // When scheme data is available, send the email.
  useEffect(() => {
    const sendSchemeEmail = async () => {
      if (schemeId && schemeData && !mailSent && userEmails?.length > 0) {
        try {
          const html = `<p>${schemeData.schemeName}</p>`
          await sendmail({
            to: userEmails,
            subject: "New Scheme Added",
            html: html,
          })
          setMailSent(true)
          toast.success("Email notification sent!")
        } catch (error) {
          console.error("Failed to send email:", error)
          toast.error("Failed to send email notification")
        }
      }
    }

    sendSchemeEmail()
  }, [schemeId, schemeData, mailSent, userEmails])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!searchPrompt) {
      toast.error("Please enter a scheme link")
      return
    }

    const isValidLink = isValidSchemeURL(searchPrompt)
    if (!isValidLink) {
      toast.error("Please provide a valid scheme link")
      return
    }

    try {
      setIsLoading(true)
      // Scrape the scheme and store it
      const scrape = await ScrapeAndStoreSchemes(searchPrompt)
      if (!scrape) {
        throw new Error("Failed to scrape scheme")
      }

      await scrapedSchemes.mutateAsync({
        schemeLink: searchPrompt,
        schemeId: scrape,
      })

      // Set the schemeId. This will trigger the query.
      setSchemeId(scrape)
      setEmoji("👍")
      setTimeout(() => setEmoji("👋"), 5000)
      toast.success("Successfully added the scheme!")
      setSearchPrompt("")
    } catch (error) {
      console.error("Error adding scheme:", error)
      toast.error("Error in adding new scheme")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="text-8xl mb-5 flex justify-center w-full">{emoji}</div>
      <div className="flex flex-col w-full justify-center items-center text-4xl font-serif">
        <h1 className={`${pacifico.className} text-6xl text-center`}>
          Hello Admin, add a new scheme here
        </h1>
      </div>
      <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          placeholder="Enter scheme link"
          className="flex-1 min-w-[400px] p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          disabled={isLoading || !searchPrompt}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  )
}

export default Searchbar
