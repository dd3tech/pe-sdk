import { describe } from "node:test";
import { beforeEach, expect, it, vi } from "vitest";

import { ClientOptions } from '@/fetcher'
import { Metric } from '@/apis'
import ApiError from '@/error'


const clientOptions: ClientOptions = {
  baseURL: 'https://api.dd360.mx',
  timeout: 5000,
  maxRetries: 2
}

describe('Metric', () => {

    let fetchMock: any
    beforeEach(() => {
    fetchMock = vi.fn()
    global.fetch = fetchMock
    })

    it('should create an instance of Metric', () => {
        const fetcher = new Metric(clientOptions)
        expect(fetcher).toBeInstanceOf(Metric)
        expect(fetcher.getVersion()).toBe('v9')
    })

    it('should timeout and throw an error if the request exceeds the timeout', async () => {
    fetchMock.mockImplementation(
        () =>
        new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true }), 10)
        )
    )
    const metric = new Metric(clientOptions)
    const requestBody = {
        latitude: 19.41712064426177,
        longitude: -99.17343830677876
    }
    try {
        await metric.getWalkability(requestBody)
    } catch (error) {
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(error).toBeInstanceOf(ApiError)
        expect(error.message).toBe('Request timed out')
        expect(error.status).toBe(408)
    }
    })

    it('should retry the request according to maxRetries option', async () => {
    fetchMock.mockRejectedValue(
        new ApiError('Request failed after max retries')
    )
    const metric = new Metric(clientOptions)
    const requestBody = {
        latitude: 19.41712064426177,
        longitude: -99.17343830677876
    }
    try {
        await metric.getCurrentPrice(requestBody)
    } catch (error) {
        expect(fetchMock).toHaveBeenCalledTimes(clientOptions.maxRetries + 1)
        expect(error).toBeInstanceOf(ApiError)
        expect(error.message).toBe('Request failed after max retries')
    }
    })

    it('should get walkability metric', async () => {
      const request = {
        latitude: 19.41712064426177,
        longitude: -99.17343830677876
      }
 
      const appraisalEngine = new Metric(clientOptions)
      const result = await appraisalEngine.getWalkability(request)
      expect(result).toEqual(
        expect.objectContaining({
          walkability: expect.any(String),
          score: expect.any(Number)
        })
      )
    })
})