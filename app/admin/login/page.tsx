import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"

export const dynamic = "force-dynamic"

export default async function AdminLoginPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect("/admin")

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-serif text-sm uppercase tracking-widest text-creative">Clear, Simple, Result.</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your website content.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
