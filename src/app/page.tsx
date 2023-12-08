import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ChatGPTWithX() {

    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full h-full">
            <Header
                heading="Psychanalyste Artificiel"
                subheading="Propulsé par ChatGPT"
            />
            <Button asChild>
                <Link href="/books">Explorer</Link>
            </Button>
        </main>
    )
}