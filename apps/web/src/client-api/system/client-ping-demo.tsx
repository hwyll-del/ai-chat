'use client'

import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '@repo/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import { getClientHealth } from './health.api'
import { postClientPing } from './ping.api'

const HEALTH_QUERY_KEY = ['system-health']

export function ClientPingDemo() {
  const queryClient = useQueryClient()
  const [pingName, setPingName] = useState('client-web')

  const healthQuery = useQuery({
    queryKey: HEALTH_QUERY_KEY,
    queryFn: getClientHealth,
  })

  const pingMutation = useMutation({
    mutationFn: () => postClientPing({ name: pingName }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: HEALTH_QUERY_KEY })
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client query and mutation</CardTitle>
        <CardDescription>
          useQuery reads health data. useMutation sends ping and refreshes the health query.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <section className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-content-primary">GET /health</p>
              <p className="text-xs text-content-tertiary">
                Query status: {healthQuery.isPending ? 'pending' : healthQuery.isError ? 'error' : 'success'}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => healthQuery.refetch()}
              disabled={healthQuery.isFetching}
            >
              {healthQuery.isFetching ? 'Refreshing...' : 'Refetch health'}
            </Button>
          </div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl border border-border-default bg-surface-canvas p-4 text-xs leading-6 text-content-secondary">
            {healthQuery.isPending
              ? 'Loading health response...'
              : JSON.stringify(healthQuery.data, null, 2)}
          </pre>
        </section>

        <section className="space-y-3 border-t border-border-default pt-5">
          <div>
            <p className="text-sm font-medium text-content-primary">POST /rpc/system/ping</p>
            <p className="text-xs text-content-tertiary">
              Mutation status: {pingMutation.isPending ? 'pending' : pingMutation.isSuccess ? 'success' : 'idle'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-content-secondary">
              Name
              <input
                value={pingName}
                onChange={(event) => setPingName(event.target.value)}
                className="min-w-0 flex-1 rounded-md border border-border-default bg-surface-canvas px-3 py-2 text-content-primary outline-none focus:border-content-secondary"
              />
            </label>
            <Button
              onClick={() => pingMutation.mutate()}
              disabled={pingMutation.isPending || pingName.trim().length === 0}
            >
              {pingMutation.isPending ? 'Sending...' : 'Send ping'}
            </Button>
          </div>
          {pingMutation.data && (
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-xl border border-border-default bg-surface-canvas p-4 text-xs leading-6 text-content-secondary">
              {JSON.stringify(pingMutation.data, null, 2)}
            </pre>
          )}
        </section>
      </CardContent>
    </Card>
  )
}
