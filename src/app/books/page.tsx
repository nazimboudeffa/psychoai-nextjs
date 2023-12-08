import { Header } from "@/components/header"
import Link from "next/link"
import { CheckCircle2 } from 'lucide-react';

const Books = function () {

    const books = [
        {
            id: "0",
            title: "A General Introduction to Psychoanalysis",
            author:
                "Sigmund Freud",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/books/a-general-introduction-to-psychoanalysis",
        },
        {
            id: "1",
            title: "The theory of psychoanalysis",
            author:
                "C. G. Jung",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/books/the-theory-of-psychoanalysis",
        },
    ]
    
    return (
        <div className="mt-10 flex flex-col items-center justify-center w-full h-full">
        <Header
            heading="Our list of books"
            subheading="Ask and get answers"
        />
        <section className="flex flex-col items-center gap-10">
        <div className="ml-5 mr-5 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {books.map((book) => (
                <div
                    key={book.id}
                    className="p-5 shadow rounded-[12px] dark:shadow-slate-900"
                >
                    <Link
                        href={book.link}
                        className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
                    >
                        <span className={`text-${book.color}-500 dark:text-${book.color}-700`}>
                            {book.icon}
                        </span>
                        <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                        {book.author}
                        </div>
                    </Link>
                    <p className="ml-8 mt-2 text-muted-foreground">
                    {book.title}
                    </p>
                </div>
            ))}
        </div>
        </section>
        </div>
    )
}

export default Books