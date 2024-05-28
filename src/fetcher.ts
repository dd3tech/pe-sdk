import fetch from 'isomorphic-unfetch'
import { PriceEngineVersion } from './types'

export interface ClientOptions {
  apiKey: string
  version?: PriceEngineVersion | undefined
  baseURL?: string
  timeout?: number
  maxRetries?: number
}

export class Base {
  public readonly version: PriceEngineVersion = 'v9'
  private readonly apiKey: string
  private readonly baseURL: string
  private readonly timeout: number
  private readonly maxRetries: number

  constructor(clientOptions: ClientOptions) {
    const {
      PRICE_ENGINE_API_KEY = '',
      PRICE_ENGINE_BASE_URL = 'https://api.dd360.mx'
    } = process?.env || {}

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
    return response.json() as T
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url: string = this.getURL(endpoint)
    const headers = {
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
        if (response.ok) {
          return response.json() as T
        }
        throw new Error(response.statusText)
      } catch (error) {
        if (attempt === this.maxRetries) {
          throw error
        }
      }
    }
    throw new Error('Request failed after max retries')
  }
}
