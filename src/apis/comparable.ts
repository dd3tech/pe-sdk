import { API_RESOURCES_PATH } from '../utils'
import { BaseFetcher, ClientOptions } from '../fetcher'
import {
  ComparablesRequestInput,
  ComparablesRequestOutput,
  PricePredictionFromCompsInput,
  PricePredictionFromCompsOutput,
  ReportPricePredictionFromCompsInput,
  ReportPricePredictionFromCompsOutput
} from '../types'
import { baseRequestInputSchema } from 'src/validators'

export class Comparables extends BaseFetcher {
  constructor(props: ClientOptions) {
    super(props)
  }

  public async getComparables(
    request: ComparablesRequestInput
  ): Promise<ComparablesRequestOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.request(`/${API_RESOURCES_PATH.COMPARABLES}`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async getPricePredictionFromComparables(
    request: PricePredictionFromCompsInput
  ): Promise<PricePredictionFromCompsOutput | null> {
    this.validate(baseRequestInputSchema, request)
    return this.request(`/${API_RESOURCES_PATH.COMPARABLES}/price-prediction`, {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }

  public async getReportPricePredictionFromComparables(
    request: ReportPricePredictionFromCompsInput
  ): Promise<ReportPricePredictionFromCompsOutput> {
    this.validate(baseRequestInputSchema, request)
    return this.request(
      `/${API_RESOURCES_PATH.COMPARABLES}/price-prediction/report`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }
}
