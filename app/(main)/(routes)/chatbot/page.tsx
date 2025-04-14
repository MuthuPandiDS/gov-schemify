"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useLanguageStore } from "@/store/language-store"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { MessageSquareIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useTranslation } from "react-i18next"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { useProModal } from "@/hooks/use-pro-modal"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BotAvatar } from "@/components/BotAvatar"
import { Empty } from "@/components/Empty"
import Heading from "@/components/Heading"
import { LanguageSelector } from "@/components/LanguageSelector"
import { Loader } from "@/components/Loader"
import { UserAvatar } from "@/components/UserAvatar"

import SpeechToText from "../../_components/speechToText"

const ConversationPage = () => {
  const searchParams = useSearchParams()
  const proModal = useProModal()
  const router = useRouter()
  const { t } = useTranslation()
  const { language } = useLanguageStore()
  const [messages, setMessages] = useState<{ role: string; content: any }[]>([])

  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required",
    }),
  })
  let promptMessage = searchParams.get("schemedetail")
  promptMessage = !promptMessage ? "" : promptMessage
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage]

      const response = await axios.post("/api/geminiConversation", {
        messages: newMessages,
        language: language == "ta" ? "tamil" : "english",
      })
      console.log(response)
      const botMessage = {
        role: "user",
        content: response.data.result,
      }
      setMessages((prev) => [...prev, userMessage, botMessage])
      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong")
      }
    } finally {
      router.refresh()
    }
  }
  useEffect(() => {
    function setPromptMessage() {
      form.setValue("prompt", promptMessage!)
    }
    setPromptMessage()
  }, [])
  return (
    <div className="mt-10">
      <Heading
        title="conversation"
        description="chatWithGovernmentSchemesQueryResolver"
        Icon={MessageSquareIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 ld:px-8">
        <div className="flex flex-row gap-4 items-center">
          <SpeechToText form={form} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="roundeed-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        placeholder={t("explainAboutRecentSchemes")}
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                {t("ask")}
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label={t("noConversationStarted")} />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 ",
                  message.role === "user"
                    ? "bg-white border border-black/10 justify-end"
                    : "bg-muted justify-start"
                )}
              >
                {message.role === "assistant" ? <BotAvatar /> : null}
                {message.content}
                {message.role === "user" ? <UserAvatar /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage
