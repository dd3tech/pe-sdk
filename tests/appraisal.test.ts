import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Appraisal } from '@/apis'
import { ClientOptions } from '@/fetcher'
import ApiError from '@/error'
import type { AppraisalOutputCoverage } from '@/types'

const clientOptions: ClientOptions = {
  baseURL: 'https://api.dd360.mx',
  timeout: 5000,
  maxRetries: 2
}

describe('Appraisal', () => {
  let fetchMock: any
  beforeEach(() => {
    fetchMock = vi.fn()
    global.fetch = fetchMock
  })

  it('should create an instance of Appraisal', () => {
    const fetcher = new Appraisal(clientOptions)
    expect(fetcher).toBeInstanceOf(Appraisal)
    expect(fetcher.getVersion()).toBe('v9')
  })

  it('should timeout and throw an error if the request exceeds the timeout', async () => {
    fetchMock.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 10))
    )
    const appraisalEngine = new Appraisal(clientOptions)
    const requestBody = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876
    }
    try {
      await appraisalEngine.getAppraisalCoverage(requestBody)
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
    const appraisalEngine = new Appraisal(clientOptions)
    const requestBody = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876
    }
    try {
      await appraisalEngine.getAppraisalCoverage(requestBody)
    } catch (error) {
      expect(fetchMock).toHaveBeenCalledTimes(clientOptions.maxRetries + 1)
      expect(error).toBeInstanceOf(ApiError)
      expect(error.message).toBe('Request failed after max retries')
    }
  })

  it('should get appraisal coverage', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876
    }
    const response: AppraisalOutputCoverage = {
      hasCoverage: true,
      cvegeo: '0901500011182008'
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })
    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisalCoverage(request)
    expect(result).toEqual(
      expect.objectContaining({
        hasCoverage: expect.any(Boolean),
        cvegeo: expect.any(String)
      })
    )
  })

  it('should handle API errors correctly on wrong input format', async () => {
    const request = {
      latitudi: '19.41712064426177',
      longitudo: '-99.17343830677876'
    }
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request'
    })
    const appraisalEngine = new Appraisal(clientOptions)
    await expect(
      appraisalEngine.getAppraisalCoverage(request as any)
    ).rejects.toThrow('Bad Request: Bad Request')
  })

  it('should get appraisal', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876,
      lotSurface: 644,
      constructionArea: 702,
      propertyType: 'house',
      appraisalType: 'sale'
    }
    const response = {
      value: 29869257.6,
      valuePerSqm: 40600,
      upperValueRangePerSqm: 45472.00000000001,
      lowerValueRangePerSqm: 35728,
      upperValueRange: 31921344.000000004,
      lowerValueRange: 25081056
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })

    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisal(request)
    expect(result).toEqual(
      expect.objectContaining({
        value: expect.any(Number),
        valuePerSqm: expect.any(Number),
        upperValueRangePerSqm: expect.any(Number),
        lowerValueRangePerSqm: expect.any(Number),
        upperValueRange: expect.any(Number),
        lowerValueRange: expect.any(Number)
      })
    )
  })

  it('should get appraisal for apartment rent', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876,
      lotSurface: 644,
      constructionArea: 702
    }
    const response = {
      value: 154496.16,
      valuePerSqm: 210,
      upperValueRangePerSqm: 235.20000000000002,
      lowerValueRangePerSqm: 184.8,
      upperValueRange: 165110.40000000002,
      lowerValueRange: 129729.6,
      comparables: []
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })

    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisalApartmentRent(request)
    expect(result).toEqual(
      expect.objectContaining({
        value: expect.any(Number),
        valuePerSqm: expect.any(Number),
        upperValueRangePerSqm: expect.any(Number),
        lowerValueRangePerSqm: expect.any(Number),
        upperValueRange: expect.any(Number),
        lowerValueRange: expect.any(Number),
        comparables: expect.any(Array)
      })
    )
  })

  it('should get appraisal report', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876,
      lotSurface: 644,
      constructionArea: 702,
      propertyType: 'house',
      appraisalType: 'sale'
    }
    const response = {
      appraisalRent: {
        value: 176567.04,
        valuePerSqm: 240,
        upperValueRangePerSqm: 268.8,
        lowerValueRangePerSqm: 211.2,
        upperValueRange: 188697.6,
        lowerValueRange: 148262.4
      }
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })

    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisalReport(request)
    expect(result).toEqual(
      expect.objectContaining({
        appraisalRent: expect.objectContaining({
          value: expect.any(Number),
          valuePerSqm: expect.any(Number),
          upperValueRangePerSqm: expect.any(Number),
          lowerValueRangePerSqm: expect.any(Number),
          upperValueRange: expect.any(Number),
          lowerValueRange: expect.any(Number)
        })
      })
    )
  })

  it('should get appraisal for apartment sale', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876,
      lotSurface: 644,
      constructionArea: 702
    }
    const response = {
      value: 35681256,
      valuePerSqm: 48500,
      upperValueRangePerSqm: 54320.00000000001,
      lowerValueRangePerSqm: 35728,
      upperValueRange: 31921344.000000004,
      lowerValueRange: 25081056
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })

    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisalApartmentSale(request)
    expect(result).toEqual(
      expect.objectContaining({
        value: expect.any(Number),
        valuePerSqm: expect.any(Number),
        upperValueRangePerSqm: expect.any(Number),
        lowerValueRangePerSqm: expect.any(Number),
        upperValueRange: expect.any(Number),
        lowerValueRange: expect.any(Number),
        comparables: expect.any(Array)
      })
    )
  })

  it('should get appraisal for house rent', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876,
      lotSurface: 644,
      constructionArea: 702
    }
    const response = {
      value: 176567.04,
      valuePerSqm: 240,
      upperValueRangePerSqm: 268.8,
      lowerValueRangePerSqm: 211.2,
      upperValueRange: 188697.6,
      lowerValueRange: 148262.4
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })

    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisalHouseRent(request)
    expect(result).toEqual(
      expect.objectContaining({
        value: expect.any(Number),
        valuePerSqm: expect.any(Number),
        upperValueRangePerSqm: expect.any(Number),
        lowerValueRangePerSqm: expect.any(Number),
        upperValueRange: expect.any(Number),
        lowerValueRange: expect.any(Number)
      })
    )
  })

  it('should get appraisal for house sale', async () => {
    const request = {
      latitude: 19.41712064426177,
      longitude: -99.17343830677876,
      lotSurface: 644,
      constructionArea: 702
    }
    const response = {
      value: 29869257.6,
      valuePerSqm: 40600,
      upperValueRangePerSqm: 45472.00000000001,
      lowerValueRangePerSqm: 35728,
      upperValueRange: 31921344.000000004,
      lowerValueRange: 25081056,
      comparables: []
    }
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: response })
    })

    const appraisalEngine = new Appraisal(clientOptions)
    const result = await appraisalEngine.getAppraisalHouseSale(request)
    expect(result).toEqual(
      expect.objectContaining({
        value: expect.any(Number),
        valuePerSqm: expect.any(Number),
        upperValueRangePerSqm: expect.any(Number),
        lowerValueRangePerSqm: expect.any(Number),
        upperValueRange: expect.any(Number),
        lowerValueRange: expect.any(Number),
        comparables: expect.any(Array)
      })
    )
  })
})
