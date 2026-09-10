import { ClientPingDemo } from '../../../../src/client-api/system/client-ping-demo'

export default function PingVerificationPage() {
  return (
    <main className="min-h-screen bg-surface-canvas p-6 text-content-primary">
      <div className="mx-auto w-full max-w-3xl">
        <ClientPingDemo />
      </div>
    </main>
  )
}
