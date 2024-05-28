import fetch, { RequestInit } from 'node-fetch'

export type Fetcher = typeof fetch

export interface HttpClientOptions {
  injectedFetcher?: Fetcher
  apiKey: string
  baseURL: string
}

export class HttpClient {
  private fetcher: Fetcher
  private apiKey: string
  private baseURL: string

  constructor({ injectedFetcher, baseURL, apiKey }: HttpClientOptions) {
    if (!injectedFetcher) {
      this.fetcher = fetch
    } else {
      this.fetcher = injectedFetcher
    }

    this.baseURL = baseURL
    this.apiKey = apiKey
  }

  private getURL(path: string): string {
    return `${this.baseURL}${path}`
  }

  private getAuthorizationHeader(): string {
    return `Bearer ${this.apiKey}`
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await this.fetcher(this.getURL(url), {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationHeader(),
        ...options?.headers
      }
    })

    return response.json()
  }

  async post<T>(url: string, body: any, options?: RequestInit): Promise<T> {
    const response = await this.fetcher(this.getURL(url), {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationHeader(),
        ...options?.headers
      }
    })

    return response.json()
  }

  async put<T>(url: string, body: any, options?: RequestInit): Promise<T> {
    const response = await this.fetcher(this.getURL(url), {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthorizationHeader(),
        ...options?.headers
      }
    })

    return response.json()
  }
}
