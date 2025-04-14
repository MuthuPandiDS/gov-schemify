import React, { useEffect } from "react"
import { Mic } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import useSpeechToText from "react-hook-speech-to-text"

type ResultType = {
  speechBlob?: Blob
  timestamp: number
  transcript: string
}

export default function SpeechToText({
  form,
}: {
  form: UseFormReturn<
    {
      prompt: string
    }
  >
}) {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  })

  // Update form value when results change
  useEffect(() => {
    if (results && results.length > 0) {
      const transcripts = (results as ResultType[])
        .map((result) => result.transcript)
        .join(" ")

      if (transcripts) {
        form.setValue("prompt", transcripts)
      }
    }
  }, [results, form])

  // Clear recording when form is submitted
  useEffect(() => {
    if (form.formState.isSubmitting && isRecording) {
      stopSpeechToText()
    }
  }, [form.formState.isSubmitting, isRecording, stopSpeechToText])

  const handleMicClick = () => {
    if (isRecording) {
      stopSpeechToText()
    } else {
      // Clear both form and results before starting new recording
      form.setValue("prompt", "")
      // Clear the results array
      setResults([])
      // Stop current recording and start a fresh one
      stopSpeechToText()
      setTimeout(() => {
        startSpeechToText()
      }, 100)
    }
  }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>

  return (
    <div className="relative">
      {isRecording && (
        <div className="animate-ping bg-red-600 w-7 h-7 rounded-full"></div>
      )}
      {!isRecording && <div className="w-7 h-7 rounded-full"></div>}
      <button
        type="button"
        onClick={handleMicClick}
        className={`bg-white w-7 h-7 rounded-full absolute top-0 flex items-center justify-center p-1 hover:bg-gray-100 transition-colors ${
          isRecording ? "text-red-600" : "text-gray-700"
        }`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        <Mic className="w-4 h-4" />
      </button>
    </div>
  )
}
