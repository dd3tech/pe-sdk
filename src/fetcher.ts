import fetch from 'isomorphic-unfetch'
import ApiError from './error'
import type { PriceEngineVersion } from './types'

const {
  PRICE_ENGINE_API_KEY = '',
  PRICE_ENGINE_BASE_URL = 'https://api.dd360.mx'
} = process?.env || {}

export interface ClientOptions {
  apiKey?: string
  version?: PriceEngineVersion
  baseURL?: string
  timeout?: number
  maxRetries?: number
}

export class BaseFetcher {
  public readonly version: PriceEngineVersion
  private readonly apiKey: string
  private readonly baseURL: string
  private readonly timeout: number
  private readonly maxRetries: number

  constructor(clientOptions: ClientOptions = {}) {
    this.apiKey = clientOptions.apiKey || PRICE_ENGINE_API_KEY
    this.baseURL = clientOptions.baseURL || PRICE_ENGINE_BASE_URL
    this.version = clientOptions.version || 'v9'
    this.timeout = clientOptions.timeout || 5000
    this.maxRetries = clientOptions.maxRetries || 2

    if (!this.apiKey) {
      throw new ApiError('API Key is required', 401)
    }
  }

  public getVersion(): PriceEngineVersion {
    return this.version
  }

  private getURL(endpoint: string): string {
    return `${this.baseURL}${endpoint}`
  }

  private getAuthorizationHeader(): string {
    return `Bearer ${this.apiKey}`
  }

  private async requestWithTimeout<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response: Response = await fetch(url, {
        ...options,
        signal: controller.signal
      })
      clearTimeout(id)

      if (!response.ok) {
        throw new ApiError(
          `Request failed with status ${response.status}: ${response.statusText}`,
          response.status
        )
      }

      return response.json() as Promise<T>
    } catch (error: any) {
      clearTimeout(id)
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out', 408)
      }
      throw error
    }
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = this.getURL(endpoint)
    const headers = {
      ...options?.headers,
      Authorization: this.getAuthorizationHeader(),
      'Content-Type': 'application/json'
    }
    const config: RequestInit = { ...options, headers }

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.requestWithTimeout<{ data: T }>(url, config)
        return response?.data || (response as T)
      } catch (error) {
        if (attempt === this.maxRetries) {
          throw error
        }
        const delay = Math.pow(2, attempt) * 100
        await new Promise((res) => setTimeout(res, delay))
      }
    }

    throw new ApiError('Request failed after max retries', 500)
  }
}
