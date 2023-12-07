import { Header } from "@/components/header"

export default async function ChatGPTWithX() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full h-full">
            <Header
                heading="AI Psychotherapist"
                subheading="Powered by ChatGPT"
            />
        </main>
    )
}