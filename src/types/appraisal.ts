import type { KeysOf } from './common'

/** Appraisals types */
export type Comparable = {
  id?: string
  urlAd?: string
  surfaceTotal?: number
  terrainSurface?: number
  builtYear?: number
  numBedrooms?: number
  numBathrooms?: number
  numParkingLots?: number
  isNewPropertyProb?: number
  pricePerSquareMeter?: number
  dissimilarityToTarget?: number
}

export interface AppraisalRequestOutput {
  value: number
  valuePerSqm: number
  upperValueRangePerSqm: number
  lowerValueRangePerSqm: number
  upperValueRange: number
  lowerValueRange: number
  comparables?: Comparable[]
}

export interface UnitAmenities {
  hasBalcony: boolean
  hasFurniture: boolean
  hasAirConditioner: boolean
  hasCellar: boolean
  hasInternet: boolean
  hasRooftop: boolean
  petsAllowed: boolean
  hasServiceRoom: boolean
}

export interface DevelopmentAmenities {
  hasBusinessCenter: boolean
  hasElevator: boolean
  hasEventsHall: boolean
  hasGym: boolean
  hasKidsPlayground: boolean
  hasPool: boolean
  hasSpecialFacilities: boolean
  hasSurveillance: boolean
  hasCafeteria: boolean
  hasGrill: boolean
  hasJacuzzi: boolean
  hasSharedRooftop: boolean
  isCondominium: boolean
  hasGarden: boolean
}

export type AppraisalRequestInput = {
  latitude: number
  longitude: number
  lotSurface: number
  constructionArea: number
  parkingSpaces?: number
  bathrooms?: number
  yearBuilt?: number
  floor?: number
  isNewProbAvg?: number
  propertyType?: string
  appraisalType?: string
  unitAmenities?: UnitAmenities
  /**
   * This propertie return comparables on the response
   */
  withComps?: number
  m2PrivateTerrace?: number
  hasView?: number
  developmentAmenities?: DevelopmentAmenities
  /*
   * you can specify which
   * specific fields from `AppraisalRequestOutput`
   * you are interested in receiving in the response. */
  fields?: KeysOf<AppraisalRequestOutput>
}

export type AppraisalRequestInputVariable = Omit<
  AppraisalRequestInput,
  'appraisalType' | 'propertyType'
>

export interface AppraisalOutputCoverage {
  hasCoverage: boolean
  cvegeo?: string
}

/** Report types */
export type AppraisalReportRequestInput = Omit<
  AppraisalRequestInput,
  'appraisalType'
>

export type AppraisalReportRequestOutput = {
  appraisalRent: AppraisalRequestOutput
  appraisalSale: AppraisalRequestOutput
  property: AppraisalRequestInput
  capitalGain: {
    currentCapGain: number
    capGainTimeSeries: Record<string, number>
    currentPrice: number
    m2PricePerQuarter: Record<string, number>
  }
}
