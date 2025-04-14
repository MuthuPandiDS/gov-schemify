"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Mic } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"

type ResultType = {
  speechBlob?: Blob
  timestamp: number
  transcript: string
}

const SpeechToTextComponent = ({
  form,
}: {
  form: UseFormReturn<{ prompt: string }>
}) => {
  const [isClient, setIsClient] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [results, setResults] = useState<ResultType[]>([])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      const {
        startSpeechToText,
        stopSpeechToText,
      } = require("react-hook-speech-to-text")

      if (isRecording) {
        startSpeechToText({
          continuous: true,
          useLegacyResults: false,
          onResult: (result: ResultType) => {
            setResults((prev) => [...prev, result])
          },
        })
      } else {
        stopSpeechToText()
      }
    }
  }, [isRecording, isClient])

  // Update form value when results change
  useEffect(() => {
    if (results && results.length > 0) {
      const transcripts = results.map((result) => result.transcript).join(" ")

      if (transcripts) {
        form.setValue("prompt", transcripts)
      }
    }
  }, [results, form])

  // Clear recording when form is submitted
  useEffect(() => {
    if (form.formState.isSubmitting && isRecording) {
      setIsRecording(false)
    }
  }, [form.formState.isSubmitting, isRecording])

  const handleMicClick = () => {
    setIsRecording(!isRecording)
  }

  return (
    <button
      type="button"
      onClick={handleMicClick}
      className={cn(
        "p-2 rounded-full transition-colors",
        isRecording ? "bg-red-500" : "bg-gray-200 hover:bg-gray-300"
      )}
    >
      <Mic
        className={cn("h-4 w-4", isRecording ? "text-white" : "text-gray-600")}
      />
    </button>
  )
}

// Export the component with dynamic import
export default dynamic(() => Promise.resolve(SpeechToTextComponent), {
  ssr: false,
})
