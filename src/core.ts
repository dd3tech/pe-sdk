import { ClientOptions, BaseFetcher } from './fetcher'
import {
  APPRAISAL_TYPES,
  APPRAISAL_PROPERTY_TYPES,
  API_RESOURCES_PATH
} from './utils'
import type {
  AppraisalReportRequestInput,
  AppraisalReportRequestOutput,
  AppraisalRequestInput,
  AppraisalRequestInputVariable,
  AppraisalRequestOutput,
  AppraisalOutputCoverage,
  CommonRequestInput
} from './types'

/**
 *  @deprecated This class is deprecated and will be removed in the next major version. Use new Appraisal or Metrics instead.
 */
export class PriceEngine extends BaseFetcher {
  constructor(props?: ClientOptions) {
    super(props)
  }

  public async getAppraisalCoverage(
    request: CommonRequestInput
  ): Promise<AppraisalOutputCoverage> {
    return this.request(`/${API_RESOURCES_PATH.APPRAISALS}/coverage`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async getAppraisal(
    request: AppraisalRequestInput
  ): Promise<AppraisalRequestOutput> {
    return this.request(`/${API_RESOURCES_PATH.APPRAISALS}/`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async getAppraisalApartmentRent(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    return this.getAppraisal({
      ...request,
      appraisalType: APPRAISAL_TYPES.RENT,
      propertyType: APPRAISAL_PROPERTY_TYPES.APARTMENT
    })
  }

  public async getAppraisalApartmentSale(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    return this.getAppraisal({
      ...request,
      appraisalType: APPRAISAL_TYPES.SALE,
      propertyType: APPRAISAL_PROPERTY_TYPES.APARTMENT
    })
  }

  public async getAppraisalHouseRent(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    return this.getAppraisal({
      ...request,
      appraisalType: APPRAISAL_TYPES.RENT,
      propertyType: APPRAISAL_PROPERTY_TYPES.HOUSE
    })
  }

  public async getAppraisalHouseSale(
    request: AppraisalRequestInputVariable
  ): Promise<AppraisalRequestOutput> {
    return this.getAppraisal({
      ...request,
      appraisalType: APPRAISAL_TYPES.SALE,
      propertyType: APPRAISAL_PROPERTY_TYPES.HOUSE
    })
  }

  public async getAppraisalReport(
    request: AppraisalReportRequestInput
  ): Promise<AppraisalReportRequestOutput> {
    return this.request(`/${API_RESOURCES_PATH.APPRAISALS}/report`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}
