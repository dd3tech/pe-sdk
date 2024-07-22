import {
  AppraisalReportRequestOutput,
  AppraisalRequestInput,
  AppraisalRequestOutput
} from './appraisal'

export type ComparablesRequestInput = Omit<
  AppraisalRequestInput,
  'withComps' | 'fields'
>

export type ComparablesRequestOutput = {
  propertyId?: string
  propertyCode?: string
  id?: string
  title?: string
  addressStreet?: string
  addressNeighborhood?: string
  addressState?: string
  addressMunicipality?: string
  urlAd?: string
  urlAds?: string[]
  surfaceTotal?: number
  terrainSurface?: number
  builtYear?: number
  numBedrooms?: number
  numBathrooms?: number
  numParkingLots?: number
  isNewPropertyProb?: number
  price?: number
  pricePerSquareMeter?: number
  dissimilarityToTarget?: number
  latitude?: number
  longitude?: number
}

export type PricePredictionFromCompsOutput = AppraisalRequestOutput

export type PricePredictionFromCompsInput = AppraisalRequestInput

export type ReportPricePredictionFromCompsInput = Omit<
  AppraisalRequestInput,
  'appraisalType'
>

export type ReportPricePredictionFromCompsOutput = AppraisalReportRequestOutput
