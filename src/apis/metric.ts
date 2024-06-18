import { BaseFetcher, type ClientOptions } from '../fetcher'
import type {
  CapitalGainResponse,
  CostOfLivingResponse,
  CurrentPriceResponse,
  ProximityToWorkResponse,
  TrafficResponse,
  WalkabilityResponse,
  CommonRequestInput
} from '../types'
import { API_RESOURCES_PATH, METRIC_RESOURCES_PATH } from '../utils'

export class Metric extends BaseFetcher {
  constructor(props: ClientOptions) {
    super(props)
  }

  public async getTraffic(
    request: CommonRequestInput
  ): Promise<TrafficResponse> {
    return this.request(
      `/${API_RESOURCES_PATH.METRICS}/${METRIC_RESOURCES_PATH.TRAFFIC}`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }

  public async getCapitalGain(
    request: CommonRequestInput
  ): Promise<CapitalGainResponse> {
    return this.request(
      `/${API_RESOURCES_PATH.METRICS}/${METRIC_RESOURCES_PATH.CAPITAL_GAIN}`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }

  public async getCostOfLiving(
    request: CommonRequestInput
  ): Promise<CostOfLivingResponse> {
    return this.request(
      `/${API_RESOURCES_PATH.METRICS}/${METRIC_RESOURCES_PATH.COST_OF_LIVING}`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }

  public async getWalkability(
    request: CommonRequestInput
  ): Promise<WalkabilityResponse> {
    return this.request(
      `/${API_RESOURCES_PATH.METRICS}/${METRIC_RESOURCES_PATH.WALKABILITY}`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }

  public async getCurrentPrice(
    request: CommonRequestInput
  ): Promise<CurrentPriceResponse> {
    return this.request(
      `/${API_RESOURCES_PATH.METRICS}/${METRIC_RESOURCES_PATH.CURRENT_PRICE}`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }

  public async getProximityToWork(
    request: CommonRequestInput
  ): Promise<ProximityToWorkResponse> {
    return this.request(
      `/${API_RESOURCES_PATH.METRICS}/${METRIC_RESOURCES_PATH.PROXIMITY_TO_WORK}`,
      {
        method: 'POST',
        body: JSON.stringify(request)
      }
    )
  }
}
