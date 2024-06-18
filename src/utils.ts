export const APPRAISAL_TYPES = {
  SALE: 'sale',
  RENT: 'rent'
} as const

export const APPRAISAL_PROPERTY_TYPES = {
  APARTMENT: 'apartment',
  HOUSE: 'house'
} as const

export const API_RESOURCES_PATH = {
  APPRAISALS: 'appraisals',
  METRICS: 'metrics'
} as const

export const METRIC_RESOURCES_PATH = {
  CAPITAL_GAIN: 'capital-gain',
  CURRENT_PRICE: 'current-price',
  COST_OF_LIVING: 'cost-of-living',
  PROXIMITY_TO_WORK: 'proximity-to-work',
  WALKABILITY: 'walkability',
  TRAFFIC: 'traffic'
} as const
