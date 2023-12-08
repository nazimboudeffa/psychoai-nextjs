"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, Bot, FileQuestion, Loader2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams } from 'next/navigation'

interface ChatInteraction {
    isBot: boolean
    message: string
}

async function askQuestion(apiKey: string, question: string, selectedDocument: string) {
    try {
        const ask = JSON.stringify({
            apiKey: apiKey,
            prompt: question,
            document: selectedDocument,
        })
        const response = await fetch('./api', {
            method: "POST",
            body: ask,
        })

        if (response.ok) {
            console.log("response", response)
            return (await response.json()) as {
                success: boolean
                result?: { text: string }
            }
        }

        return null
    } catch (e) {
        console.error(e)

        return null
    }
}

export function Chat() {
    const selectedDocument = useParams()
    const [apiKey, setApiKey] = useState<string>("")
    const [processing, setProcessing] = useState(false)
    const [chatInteractions, setChatInteractions] = useState<ChatInteraction[]>(
        [
            {
                message: `Hi! 👋, You are using a ChatGPT app. Try to prompt and see what happens.`,
                isBot: true,
            },
        ]
    )
    const [question, setQuestion] = useState<string>("")

    const onAskQuestion = async () => {
        if (question.length == 0) {
            return
        }

        setChatInteractions((previousInteractions) => [
            ...previousInteractions,
            { isBot: false, message: question },
        ])

        setProcessing(true)
        const result = await askQuestion(apiKey, question, selectedDocument.title.toString())
        setProcessing(false)

        if (result?.success && result.result) {
            const answer = result.result.text
            setChatInteractions((previousInteractions) => [
                ...previousInteractions,
                { isBot: true, message: answer },
            ])
            setQuestion("")

            return
        }
    }

    const interactionsRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (interactionsRef?.current?.lastElementChild) {
            interactionsRef.current.lastElementChild.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            })
        }
    }, [chatInteractions])

    return (
        <div className="w-full md:w-8/12">
            <div className="flex flex-row justify-between">
                <div>
                    <p className="text-sm text-muted-foreground mt-3 ml-3">
                        Actually working with <u>{selectedDocument.title}</u>
                    </p>
                </div>
                <div className="flex flex-row">
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className={`min-w-[80px] mr-5 text-xs sm:text-sm ${
                                !apiKey || apiKey.length == 0
                                    ? "animate-pulse"
                                    : ""
                            }`}
                        >
                            {apiKey && apiKey.length > 0 ? (
                                "Your OpenAI Key"
                            ) : (
                                <>
                                    <AlertCircle className="mr-2 h-4 w-4" />{" "}
                                    API Key
                                </>
                            )}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>OpenAI API key</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>
                                This tool requires your OpenAI API key.
                                It will not be stored, only temporarily on this page.
                            </p>
                            <p className="mt-2">
                                <Input
                                    type="text"
                                    id="apiKey"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Enter your OpenAI API key..."
                                />
                            </p>
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Save</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <div className="mt-4 rounded-lg">
                <div
                    ref={interactionsRef}
                    className="flex h-[450px] flex-col gap-2 overflow-scroll rounded-lg bg-secondary p-2"
                >
                    {chatInteractions.map((i, index) => (
                        <Alert key={index}>
                            {i.isBot ? (
                                <Bot className="h-4 w-4" />
                            ) : (
                                <FileQuestion className="h-4 w-4" />
                            )}
                            <AlertDescription>
                                {i.message}
                            </AlertDescription>
                        </Alert>
                    ))}

                    {processing && (
                        <Alert key="processing" className="animate-pulse">
                            <Bot className="h-4 w-4" />
                            <AlertDescription>...</AlertDescription>
                        </Alert>
                    )}
                </div>
                <form
                    className="mt-2 flex flex-row gap-2"
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await onAskQuestion()
                    }}
                >
                    <Input
                        disabled={processing}
                        type="text"
                        placeholder="Your prompt..."
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
                    />
                    <Button
                        type="submit"
                        disabled={processing}
                        className="min-w-[80px]"
                    >
                        {processing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            "Send"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}