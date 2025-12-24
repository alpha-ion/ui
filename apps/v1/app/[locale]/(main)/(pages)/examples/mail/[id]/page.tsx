"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { MailDisplay } from "../components/mail-display"
import { mails } from "../data"

export default function MailPage() {
    const params = useParams()
    const router = useRouter()
    const mailId = params.id as string
    const mail = mails.find((item) => item.id === mailId)

    if (!mail) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
                <h1 className="text-2xl font-semibold text-foreground">Email not found</h1>
                <Button onClick={() => router.back()} variant="outline" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Go back
                </Button>
            </div>
        )
    }

    return (
        <main className="h-screen w-full bg-background">
            <div className="flex h-full flex-col">
                <div className="border-b border-border bg-card/50 px-4 py-3 sm:px-6 sm:py-4 backdrop-blur-sm">
                    <Button
                        onClick={() => router.back()}
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Go back to inbox"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Back to Inbox</span>
                        <span className="sm:hidden">Back</span>
                    </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                    <MailDisplay mail={mail} />
                </div>
            </div>
        </main>
    )
}
