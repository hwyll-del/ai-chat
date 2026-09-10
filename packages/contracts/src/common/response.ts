import type { BizCode } from '../index'

export interface ApiMeta {
  requestId: string
  timestamp: string
}

export interface ApiSuccess<T> {
  ok: true
  data: T
  meta: ApiMeta
}

export interface ApiError<E = unknown> {
  code: BizCode
  message: string
  details?: E
}

export interface ApiFailure<E = unknown> {
  ok: false
  error: ApiError<E>
  meta: ApiMeta
}

export type ApiResponse<T, E = unknown> = ApiSuccess<T> | ApiFailure<E>

export function buildSuccess<T>(data: T, meta: ApiMeta): ApiSuccess<T> {
  return { ok: true, data, meta }
}

export function buildFailure<E = unknown>(
  error: ApiError<E>,
  meta: ApiMeta,
): ApiFailure<E> {
  return { ok: false, error, meta }
}
