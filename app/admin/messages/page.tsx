import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { loadMessages } from "@/app/actions/messages"
import { MessagesList } from "@/components/messages-list"

export const dynamic = "force-dynamic"

export default async function MessagesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/login")

  const messages = await loadMessages()
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MessagesList initial={messages} />
    </main>
  )
}
