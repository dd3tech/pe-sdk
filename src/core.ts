import { ClientOptions, Base } from './fetcher'
import {
  AppraisalReportRequestInput,
  AppraisalReportRequestOutput,
  AppraisalRequestInput,
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

  public async appraisal(
    request: AppraisalRequestInput
  ): Promise<AppraisalRequestOutput> {
    return this.request(`/${this.resourceName}/`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async appraisalReport(
    request: AppraisalReportRequestInput
  ): Promise<AppraisalReportRequestOutput> {
    return this.request(`/${this.resourceName}/report`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}
