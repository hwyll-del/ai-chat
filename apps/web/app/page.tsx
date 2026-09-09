import { TailwindDemo } from '@repo/ui/tailwind-demo'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <TailwindDemo appName="web" />
    </main>
  )
}
