import type { PriceEngineVersion } from './types'

export interface ClientOptions {
  /**
   * Defaults to process.env['PRICE_ENGINE_API_KEY'].
   */
  apiKey: string

  /**
   * The API version to use.
   *
   * @default 'v9'
   */
  version?: PriceEngineVersion

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
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
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we use `node-fetch` on Node.js and otherwise expect that `fetch` is
   * defined globally.
   */
  fetch?: any | undefined

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   * @default 2
   */
  maxRetries?: number
}

/*
 * This is the API Client to interact with our Price Engine API.
 */
export class PriceEngine {
  private clientConfig: ClientOptions

  constructor({ apiKey = '', version = 'v9', ...rest }: ClientOptions) {
    if (!apiKey || apiKey === undefined) {
      throw new Error('API Key is required')
    }

    this.clientConfig = {
      apiKey,
      version,
      ...rest
    }
  }

  public getApiKey(): string {
    return this.clientConfig.apiKey
  }

  public getVersion(): PriceEngineVersion {
    return this.clientConfig.version!
  }

  public getBaseURL(): string {
    return this.clientConfig.baseURL!
  }
}
