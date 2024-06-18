interface TimeSeries {
  [date: string]: number
}

export interface TrafficResponse {
  traffic: string
  trafficIndex: Record<string, number>
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
