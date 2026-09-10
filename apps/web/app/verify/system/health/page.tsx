import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import { getHealth } from '../../../../src/api/system/health.api'

export default async function HealthVerificationPage() {
  const response = await getHealth()

  return (
    <main className="min-h-screen bg-surface-canvas p-6 text-content-primary">
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>System health</CardTitle>
            <CardDescription>GET /health</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl border border-border-default bg-surface-canvas p-4 text-xs leading-6 text-content-secondary">
              {JSON.stringify(response, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
