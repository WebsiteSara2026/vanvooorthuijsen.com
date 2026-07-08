import { SplitBrain } from "@/components/split-brain"
import { getSiteContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export default async function Page() {
  const content = await getSiteContent()
  return <SplitBrain content={content} />
}
