import { ClientOptions, BaseFetcher } from './fetcher'
import { APPRAISAL_TYPES, APPRAISAL_PROPERTY_TYPES } from './utils'
import type {
  AppraisalReportRequestInput,
  AppraisalReportRequestOutput,
  AppraisalRequestInput,
  AppraisalRequestInputVariable,
  AppraisalRequestOutput
} from './types'

/*
 * This is the API Client to interact with our Price Engine API.
 */
export class PriceEngine extends BaseFetcher {
  private readonly resourceName = 'appraisals'

  constructor(props: ClientOptions) {
    super(props)
  }

  public async getAppraisal(
    request: AppraisalRequestInput
  ): Promise<AppraisalRequestOutput> {
    return this.request(`/${this.resourceName}/`, {
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
    return this.request(`/${this.resourceName}/report`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}
