import { uuidv7 } from 'uuidv7'
import type { ApiMeta } from '@repo/contracts'

export function createMeta(): ApiMeta {
  return {
    requestId: uuidv7(),
    timestamp: new Date().toISOString(),
  }
}
