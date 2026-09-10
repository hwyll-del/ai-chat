import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import { postPing } from '../../../../src/api/system/ping.api'

const requestBody = { name: 'web' }

export default async function PingVerificationPage() {
  const response = await postPing(requestBody)

  return (
    <main className="min-h-screen bg-surface-canvas p-6 text-content-primary">
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>System ping</CardTitle>
            <CardDescription>POST /rpc/system/ping</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium">Request</p>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl border border-border-default bg-surface-canvas p-4 text-xs leading-6 text-content-secondary">
                {JSON.stringify(requestBody, null, 2)}
              </pre>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium">Response</p>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl border border-border-default bg-surface-canvas p-4 text-xs leading-6 text-content-secondary">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
