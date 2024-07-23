import { ClientOptions, BaseFetcher } from '../fetcher'
import { API_RESOURCES_PATH } from '../utils'
import {
  type AppraisalReportRequestInput,
  type AppraisalReportRequestOutput,
  type AppraisalRequestInput,
  type AppraisalRequestInputVariable,
  type AppraisalRequestOutput,
  type AppraisalOutputCoverage,
  type CoordinatesRequestInput,
  AppraisalType,
  PropertyType
} from '../types'
import { baseRequestInputSchema } from '../validators'

export class Appraisal extends BaseFetcher {
  constructor(props?: ClientOptions) {
    super(props)
  }

  public async getAppraisalCoverage(
    request: CoordinatesRequestInput
  ): Promise<AppraisalOutputCoverage> {
    return this.request(`/${API_RESOURCES_PATH.APPRAISALS}/coverage`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async getAppraisal(
    request: AppraisalRequestInput
  ): Promise<AppraisalRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.request(`/${API_RESOURCES_PATH.APPRAISALS}/`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async getAppraisalApartmentRent(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.getAppraisal({
      ...request,
      appraisalType: AppraisalType.Rent,
      propertyType: PropertyType.Apartment
    })
  }

  public async getAppraisalApartmentSale(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.getAppraisal({
      ...request,
      appraisalType: AppraisalType.Sale,
      propertyType: PropertyType.Apartment
    })
  }

  public async getAppraisalHouseRent(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.getAppraisal({
      ...request,
      appraisalType: AppraisalType.Rent,
      propertyType: PropertyType.House
    })
  }

  public async getAppraisalHouseSale(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.getAppraisal({
      ...request,
      appraisalType: AppraisalType.Sale,
      propertyType: PropertyType.House
    })
  }

  public async getAppraisalReport(
    request: AppraisalReportRequestInput
  ): Promise<AppraisalReportRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.request(`/${API_RESOURCES_PATH.APPRAISALS}/report`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}
