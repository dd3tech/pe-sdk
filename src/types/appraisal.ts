import type { KeysOf } from './common'
import { AppraisalType, PropertyType, LuxuryCategory } from './constants'

/** Appraisals types */
export type Comparable = {
  id?: string
  propertyCode?: string
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
  hasServiceRoom?: boolean
  hasRooftop?: boolean
  hasBalcony?: boolean
  hasFurniture?: boolean
  hasAirConditioner?: boolean
  hasCellar?: boolean
  hasInternet?: boolean
  petsAllowed?: boolean
}

export interface DevelopmentAmenities {
  hasGarden?: boolean
  hasGym?: boolean
  isCondominium?: boolean
  hasElevator?: boolean
  hasJacuzzi?: boolean
  hasPool?: boolean
  hasSurveillance?: boolean
  hasBusinessCenter?: boolean
  hasEventsHall?: boolean
  hasKidsPlayground?: boolean
  hasSpecialFacilities?: boolean
  hasCafeteria?: boolean
  hasGrill?: boolean
  hasSharedRooftop?: boolean
  hasGolfClub?: boolean
  hasWaterFront?: boolean
}

export type AppraisalRequestInput = {
  /**
   * The region where the property is located.
   * If present along with address, latitude and longitude are not required.
   */
  region?: string
  /**
   * The address of the property.
   * If present along with region, latitude and longitude are not required.
   */
  address?: string
  /**
   * The latitude of the property. Required if region and address is not present.
   */
  latitude?: number
  /**
   * The longitude of the property. Required if region and address is not present.
   */
  longitude?: number

  /**
   * The surface of the property in square meters. Must be greater than constructionArea.
   */
  lotSurface: number
  /**
   * The surface of the property in square meters. Must be less than lotSurface.
   */
  constructionArea: number
  bathrooms?: number
  bedrooms?: number
  parkingSpaces?: number
  yearBuilt?: number
  floor?: number
  isNewProbAvg?: number
  propertyType?: PropertyType
  appraisalType?: AppraisalType
  distance?: number
  /**
   * This properties return comparables on the response
   */
  unitAmenities?: UnitAmenities
  withComps?: number
  m2PrivateTerrace?: number
  hasView?: number
  developmentAmenities?: DevelopmentAmenities
  /*
   * you can specify which
   * specific fields from `AppraisalRequestOutput`
   * you are interested in receiving in the response. */
  fields?: KeysOf<AppraisalRequestOutput>

  /**
   * Zone 3 Fields - PEv10
   */
  luxuryCategory?: LuxuryCategory
  isZone3?: boolean
}

export type AppraisalRequestInputVariable = Omit<
  AppraisalRequestInput,
  'appraisalType' | 'propertyType'
>

export interface AppraisalOutputCoverage {
  hasCoverage: boolean
  cvegeo?: string
  priceEngineVersion?: number
  hexagonalId?: string
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
