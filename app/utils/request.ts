import { ofetch } from 'ofetch'

let _api: ReturnType<typeof ofetch.create> | null = null

export function useApi() {
  if (!_api) {
    const { public: { apiBase } } = useRuntimeConfig()
    _api = ofetch.create({
      baseURL: apiBase,
      timeout: 15_000,
      onRequest({ options }) {
        if (import.meta.client) {
          options.headers = { ...options.headers, 'X-Client': 'nuxt-web' }
        }
      },
      onResponseError({ response }) {
        console.error('[API]', response.status, response._data)
      },
    })
  }
  return _api
}
