import fetch from 'isomorphic-unfetch'
import ApiError from './error'
import { PriceEngineVersion } from './types'

const {
  PRICE_ENGINE_API_KEY = '',
  PRICE_ENGINE_BASE_URL = 'https://api.dd360.mx'
} = process?.env || {}

export interface ClientOptions {
  /**
   * Defaults to process.env['PRICE_ENGINE_API_KEY'].
   */
  apiKey?: string | undefined
  /**
   * The API version to use.
   *
   * @default 'v9'
   */
  version?: PriceEngineVersion | undefined
  /**
   * Override the default base URL for the API, e.g., "https://api.dd360.mx"
   *
   * Defaults to process.env['PRICE_ENGINE_BASE_URL'].
   */
  baseURL?: string
  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   */
  timeout?: number
  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   * @default 2
   */
  maxRetries?: number
}

export class BaseFetcher {
  public readonly version: PriceEngineVersion = 'v9'
  private readonly apiKey: string
  private readonly baseURL: string
  private readonly timeout: number
  private readonly maxRetries: number

  constructor(clientOptions: ClientOptions) {
    this.baseURL = clientOptions.baseURL || PRICE_ENGINE_BASE_URL
    this.apiKey = clientOptions.apiKey || PRICE_ENGINE_API_KEY
    this.version = clientOptions.version || this.version
    this.timeout = clientOptions.timeout || 5000
    this.maxRetries = clientOptions.maxRetries || 2
  }

  private getApiKey(): string {
    return this.apiKey
  }

  public getVersion(): PriceEngineVersion {
    return this.version
  }

  private getURL(endpoint: string): string {
    return `${this.baseURL}${endpoint}`
  }

  private getAuthorizationHeader(): string {
    return `Bearer ${this.getApiKey()}`
  }

  private async requestWithTimeout<T>(
    url: string,
    options: RequestInit
  ): Promise<T> {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), this.timeout)
    const response: Response = await fetch(url, {
      ...options,
      signal: controller.signal
    })

    clearTimeout(id)
    return response?.json() as T
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url: string = this.getURL(endpoint)
    const headers = {
      ...options?.headers,
      Authorization: this.getAuthorizationHeader(),
      'Content-Type': 'application/json'
    }
    const config: RequestInit = {
      ...options,
      headers
    }

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await this.requestWithTimeout<Response>(url, config)
        if (response?.ok) {
          return response.json() as T
        }

        throw new ApiError(response?.statusText)
      } catch (error) {
        if (attempt === this.maxRetries) {
          throw error
        }
      }
    }

    throw new ApiError('Request failed after max retries')
  }
}