import { Header } from "@/components/header"
import { Chat } from "./Chat"

export default async function ChatGPTWithX() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full h-full">
            <Header
                heading="Le Psychanalyste Artificiel"
                subheading="Posez toutes les questions que vous voulez"
            />
            <Chat />
        </main>
    )
}