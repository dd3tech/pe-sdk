import 'dotenv/config'
import fetch from 'cross-fetch'
import ApiError from './error'
import type { PriceEngineVersion } from './types'
import Joi from 'joi'

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
   * @default 5000
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
  public readonly version: PriceEngineVersion
  private readonly apiKey: string
  private readonly baseURL: string
  private readonly timeout: number
  private readonly maxRetries: number

  constructor(clientOptions: ClientOptions = {}) {
    const apk = clientOptions?.apiKey || PRICE_ENGINE_API_KEY
    if (!apk || apk === undefined) {
      throw new ApiError('API Key is required', 500)
    }

    this.apiKey = apk
    this.baseURL = clientOptions.baseURL || PRICE_ENGINE_BASE_URL
    this.version = clientOptions.version || 'v9'
    this.timeout = clientOptions.timeout || 5000
    this.maxRetries = clientOptions.maxRetries || 2
  }

  public validate<T>(schema: Joi.ObjectSchema, data: T) {
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((d) => d.message).join(', ')}`
      )
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

      if (!response?.ok) {
        throw ApiError.createError(response.statusText, response.status)
      }

      return response.json() as Promise<T>
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timed out', 408)
      }

      throw error
    } finally {
      clearTimeout(id)
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
