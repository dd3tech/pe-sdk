export type PriceEngineVersion = 'v8' | 'v9'

export type CoordinatesRequestInput = {
  latitude: number
  longitude: number
}

/**
 * Array of keys of an object.
 */
export type KeysOf<T> = (keyof T)[]
