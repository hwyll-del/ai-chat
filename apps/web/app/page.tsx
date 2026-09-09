import type { AppType } from '@repo/api'
import { BizCode, type ApiResponse, type PingRequest, type PingResponse } from '@repo/contracts'
import { Button } from '@repo/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { Separator } from '@repo/ui/separator'
import { TailwindDemo } from '@repo/ui/tailwind-demo'
import { hc, type InferResponseType } from 'hono/client'
import { getWebServerEnv } from '../src/env.server'
import { WebEnvBadge } from '../src/web-env-badge'

const rpcPayload: PingRequest = { name: 'web' }

type PingRpcResponse = InferResponseType<
  ReturnType<typeof hc<AppType>>['rpc']['system']['ping']['$post']
>

async function getPingResponse(apiBaseUrl: string): Promise<PingRpcResponse> {
  const client = hc<AppType>(apiBaseUrl)

  try {
    const response = await client.rpc.system.ping.$post({
      json: rpcPayload,
    })

    return await response.json()
  } catch (error) {
    return {
      ok: false,
      error: {
        code: BizCode.SYSTEM_UPSTREAM_TIMEOUT,
        message: error instanceof Error ? error.message : 'API request failed',
      },
      meta: {
        requestId: 'unavailable',
        timestamp: new Date().toISOString(),
      },
    } satisfies ApiResponse<PingResponse>
  }
}

export default async function Home() {
  const env = getWebServerEnv()
  const pingResult = await getPingResponse(env.API_BASE_URL)
  const requestBody = JSON.stringify(rpcPayload, null, 2)
  const responseBody = JSON.stringify(pingResult, null, 2)

  return (
    <main className="min-h-screen bg-surface-canvas p-6 text-content-primary">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <TailwindDemo appName="web" />

        <Card>
          <CardHeader>
            <CardTitle>Primitive validation in web</CardTitle>
            <CardDescription>
              This section imports shared Button, Input, Label, Card, and Separator components directly from <code className="rounded bg-white/10 px-2 py-1 text-slate-100">@repo/ui</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project name</Label>
              <Input id="project-name" placeholder="AI Agent workspace" />
            </div>
            <Separator />
            <div className="flex flex-wrap gap-3">
              <Button>Save draft</Button>
              <Button variant="secondary">Preview</Button>
              <Button variant="outline">Open docs</Button>
            </div>
          </CardContent>
        </Card>

        <section>
          <Card>
            <CardContent className="space-y-5 p-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-content-tertiary">
                  RPC validation
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-content-primary">
                  Shared request and response contract
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 text-xs text-content-tertiary">
                  <span className="rounded-full border border-border-default px-3 py-1">
                    server {env.APP_ENV}
                  </span>
                  <span className="rounded-full border border-border-default px-3 py-1">
                    {env.API_BASE_URL}
                  </span>
                </div>
                <WebEnvBadge />
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-content-tertiary">
                <span className="rounded-full border border-border-default px-3 py-1">
                  POST /rpc/system/ping
                </span>
                <span className="rounded-full border border-border-default px-3 py-1">
                  {pingResult.ok ? 'ok=true' : 'code=' + pingResult.error.code}
                </span>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border-default bg-surface-canvas p-4">
                  <p className="text-sm font-medium text-content-primary">Request</p>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-secondary">
                    {requestBody}
                  </pre>
                </div>
                <div className="rounded-2xl border border-border-default bg-surface-canvas p-4">
                  <p className="text-sm font-medium text-content-primary">Response</p>
                  <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all text-xs leading-6 text-content-secondary">
                    {responseBody}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
