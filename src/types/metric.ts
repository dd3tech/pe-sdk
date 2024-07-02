interface TimeSeries {
  [date: string]: number
}

export interface TrafficIndex {
  label: string
  score: number
  level: string
}

export interface TrafficResponse {
  traffic: string
  score: number
  trafficIndex: Array<TrafficIndex>
}

export interface CapitalGainResponse {
  currentCapGain: number
  capGainTimeSeries?: Record<string, number> | []
  m2PricePerQuarter?: TimeSeries
}

export interface CostOfLivingResponse {
  costOfLiving: string
  score: number
}

export interface WalkabilityResponse {
  walkability: string
  score: number
}

export interface ProximityToWorkResponse {
  proximityToWork: string
  score: number
}
export interface CurrentPriceResponse {
  currentPrice: number
}
