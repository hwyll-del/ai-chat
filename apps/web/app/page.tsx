import Link from 'next/link'

const links = [
  {
    href: '/verify/system/health',
    label: 'Verify system health',
  },
  {
    href: '/verify/system/ping',
    label: 'Verify system ping',
  },
  {
    href: '/design-system',
    label: 'Open design system',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-canvas p-6 text-content-primary">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-content-tertiary">
            Web verification
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            API route directory
          </h1>
          <p className="text-content-secondary">
            Choose a verification page to inspect one API request and response.
          </p>
        </header>

        <nav className="grid gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl border border-border-default bg-surface-strong p-4 text-sm font-medium text-content-primary transition hover:border-content-secondary"
            >
              {link.label}
              <span className="mt-1 block text-xs font-normal text-content-tertiary">
                {link.href}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
