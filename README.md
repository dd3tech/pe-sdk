<div align="center">
<img src="https://onboarding.dd360.mx/assets/darkLogo.eaf6fea3.svg" alt="DD360 logo">
<hr />
<br/>

This SDK provides convenient access to the Price Engine REST API from TypeScript
or JavaScript. <br/>

[Stable v1](https://dd360.mx/)

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dd3tech/pe-sdk)
[![npm latest package](https://img.shields.io/npm/v/pe-sdk/latest.svg)](https://www.npmjs.com/package/pe-sdk)
[![npm downloads](https://img.shields.io/npm/dm/pe-sdk)](https://www.npmjs.com/package/pe-sdk)
[![conventional Commits](https://img.shields.io/badge/conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![nodejs](https://img.shields.io/badge/nodejs-v18-43853d.svg)](https://nodejs.org)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

<h3>
  <a rel="noopener" target="_blank" href="https://dd360.mx/docs">Documentation</a> 
</h3>
</div>

## 📲 Installation

```bash
npm install pe-sdk
```

```bash
yarn add pe-sdk
```

```bash
pnpm i pe-sdk
```

## Usage

### Importing the SDK

To use the SDK, import the `Appraisal` and `Metric` classes from the SDK:

```typescript
import { Appraisal, Metric } from 'pe-sdk'
```

### Configuration

```typescript
import { Appraisal, Metric } from 'pe-sdk'

const clientOptions = {
  apiKey: 'your_api_key', // Or via env variable PRICE_ENGINE_API_KEY
  baseURL: 'https://api.dd360.mx', // Or via env variable PRICE_ENGINE_BASE_URL
  version: 'v9',
  timeout: 5000,
  maxRetries: 2
}

const appraisalClient = new Appraisal(clientOptions)
const metricClient = new Metric(clientOptions)
```

### Appraisal API

#### Getting Appraisal Coverage

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = { latitude: 19.4326, longitude: -99.1332 }
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const coverage: AppraisalOutputCoverage =
  await appraisal.getAppraisalCoverage(request)
```

**Output:**

```typescript
{
  hasCoverage: true,
  cvegeo: "090010001"
}
```

#### Getting Appraisal

**Input:**

```typescript
import { AppraisalRequestInput } from 'pe-sdk'

const request: AppraisalRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332,
  lotSurface: 200,
  constructionArea: 150
}
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const appraisalResult: AppraisalRequestOutput =
  await appraisal.getAppraisal(request)
```

**Output:**

```typescript
{
  value: 5000000,
  valuePerSqm: 25000,
  upperValueRangePerSqm: 27000,
  lowerValueRangePerSqm: 23000,
  upperValueRange: 5400000,
  lowerValueRange: 4600000,
  comparables: [
    {
      id: "123",
      urlAd: "http://example.com",
      surfaceTotal: 200,
      terrainSurface: 150,
      builtYear: 2015,
      numBedrooms: 3,
      numBathrooms: 2,
      numParkingLots: 1,
      isNewPropertyProb: 0.8,
      pricePerSquareMeter: 26000,
      dissimilarityToTarget: 0.1
    }
  ]
}
```

#### Getting Appraisal for Apartment Rent

**Input:**

```typescript
import { AppraisalRequestInputVariable } from 'pe-sdk'

const request: AppraisalRequestInputVariable = {
  latitude: 19.4326,
  longitude: -99.1332,
  lotSurface: 200,
  constructionArea: 150
}
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const rentResult: AppraisalRequestOutput =
  await appraisal.getAppraisalApartmentRent(request)
```

**Output:**

```typescript
{
  value: 20000,
  valuePerSqm: 100,
  upperValueRangePerSqm: 110,
  lowerValueRangePerSqm: 90,
  upperValueRange: 22000,
  lowerValueRange: 18000,
  comparables: [
    {
      id: "124",
      urlAd: "http://example.com",
      surfaceTotal: 200,
      terrainSurface: 150,
      builtYear: 2018,
      numBedrooms: 2,
      numBathrooms: 1,
      numParkingLots: 1,
      isNewPropertyProb: 0.9,
      pricePerSquareMeter: 105,
      dissimilarityToTarget: 0.05
    }
  ]
}
```

#### Getting Appraisal for Apartment Sale

**Input:**

```typescript
import { AppraisalRequestInputVariable } from 'pe-sdk'

const request: AppraisalRequestInputVariable = {
  latitude: 19.4326,
  longitude: -99.1332,
  lotSurface: 200,
  constructionArea: 150
}
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const saleResult: AppraisalRequestOutput =
  await appraisal.getAppraisalApartmentSale(request)
```

**Output:**

```typescript
{
  value: 3000000,
  valuePerSqm: 15000,
  upperValueRangePerSqm: 16000,
  lowerValueRangePerSqm: 14000,
  upperValueRange: 3200000,
  lowerValueRange: 2800000,
  comparables: [
    {
      id: "125",
      urlAd: "http://example.com",
      surfaceTotal: 200,
      terrainSurface: 150,
      builtYear: 2020,
      numBedrooms: 2,
      numBathrooms: 1,
      numParkingLots: 1,
      isNewPropertyProb: 0.95,
      pricePerSquareMeter: 15500,
      dissimilarityToTarget: 0.02
    }
  ]
}
```

#### Getting Appraisal for House Rent

**Input:**

```typescript
import { AppraisalRequestInputVariable } from 'pe-sdk'

const request: AppraisalRequestInputVariable = {
  latitude: 19.4326,
  longitude: -99.1332,
  lotSurface: 200,
  constructionArea: 150
}
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const houseRentResult: AppraisalRequestOutput =
  await appraisal.getAppraisalHouseRent(request)
```

**Output:**

```typescript
{
  value: 25000,
  valuePerSqm: 125,
  upperValueRangePerSqm: 135,
  lowerValueRangePerSqm: 115,
  upperValueRange: 27000,
  lowerValueRange: 23000,
  comparables: [
    {
      id: "126",
      urlAd: "http://example.com",
      surfaceTotal: 200,
      terrainSurface: 150,
      builtYear: 2017,
      numBedrooms: 3,
      numBathrooms: 2,
      numParkingLots: 1,
      isNewPropertyProb: 0.85,
      pricePerSquareMeter: 130,
      dissimilarityToTarget: 0.04
    }
  ]
}
```

#### Getting Appraisal for House Sale

**Input:**

```typescript
import { AppraisalRequestInputVariable } from 'pe-sdk'

const request: AppraisalRequestInputVariable = {
  latitude: 19.4326,
  longitude: -99.1332,
  lotSurface: 200,
  constructionArea: 150
}
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const houseSaleResult: AppraisalRequestOutput =
  await appraisal.getAppraisalHouseSale(request)
```

**Output:**

```typescript
{
  value: 3500000,
  valuePerSqm: 17500,
  upperValueRangePerSqm: 18500,
  lowerValueRangePerSqm: 16500,
  upperValueRange: 3700000,
  lowerValueRange: 3300000,
  comparables: [
    {
      id: "127",
      urlAd: "http://example.com",
      surfaceTotal: 200,
      terrainSurface: 150,
      builtYear: 2016,
      numBedrooms: 3,
      numBathrooms: 2,
      numParkingLots: 1,
      isNewPropertyProb: 0.8,
      pricePerSquareMeter: 18000,
      dissimilarityToTarget: 0.03
    }
  ]
}
```

#### Getting Appraisal Report

**Input:**

```typescript
import { AppraisalReportRequestInput } from 'pe-sdk'

const request: AppraisalReportRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332,
  lotSurface: 200,
  constructionArea: 150
}
```

**Usage:**

```typescript
const appraisal = new Appraisal()
const report: Appraisal

ReportRequestOutput = await appraisal.getAppraisalReport(request)
```

**Output:**

```typescript
{
  appraisalRent: {
    value: 25000,
    valuePerSqm: 125,
    upperValueRangePerSqm: 135,
    lowerValueRangePerSqm: 115,
    upperValueRange: 27000,
    lowerValueRange: 23000,
    comparables: [
      {
        id: "126",
        urlAd: "http://example.com",
        surfaceTotal: 200,
        terrainSurface: 150,
        builtYear: 2017,
        numBedrooms: 3,
        numBathrooms: 2,
        numParkingLots: 1,
        isNewPropertyProb: 0.85,
        pricePerSquareMeter: 130,
        dissimilarityToTarget: 0.04
      }
    ]
  },
  appraisalSale: {
    value: 3500000,
    valuePerSqm: 17500,
    upperValueRangePerSqm: 18500,
    lowerValueRangePerSqm: 16500,
    upperValueRange: 3700000,
    lowerValueRange: 3300000,
    comparables: [
      {
        id: "127",
        urlAd: "http://example.com",
        surfaceTotal: 200,
        terrainSurface: 150,
        builtYear: 2016,
        numBedrooms: 3,
        numBathrooms: 2,
        numParkingLots: 1,
        isNewPropertyProb: 0.8,
        pricePerSquareMeter: 18000,
        dissimilarityToTarget: 0.03
      }
    ]
  },
  property: {
    latitude: 19.4326,
    longitude: -99.1332,
    lotSurface: 200,
    constructionArea: 150
  },
  capitalGain: {
    currentCapGain: 0.059994292088481505,
    capGainTimeSeries: {
      "2019-04": 0.766111483639908,,
      "2019-05": 0.7732951742516028,
      "2019-06": 0.776088687570223
    },
    currentPrice: 3500000,
    m2PricePerQuarter: {
      "2019 T2": 44676.65447976637,
      "2019-T3": 45095.57949290333,
      "2019-T4": 45258.4863700169,
    }
  }
}
```

### Metric API

#### Getting Traffic Metrics

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332
}
```

**Usage:**

```typescript
const metric = new Metric()
const trafficData: TrafficResponse = await metric.getTraffic(request)
```

**Output:**

```typescript
{
  traffic: TrafficLevel,
  score: 75,
  trafficIndex: [
    {
      label: "9:00",
      score: 0.5704178149565791,
      level: TrafficLevel
    },
    {
      label: "13:30",
      score: 0.5704178149565791,
      level: TrafficLevel
    }
  ]
}

type TrafficLevel = "very_high" | "high" | "moderate" | "low"

```

#### Getting Capital Gain Metrics

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332
}
```

**Usage:**

```typescript
const metric = new Metric()
const capitalGainData: CapitalGainResponse =
  await metric.getCapitalGain(request)
```

**Output:**

```typescript
{
  currentCapGain: 0.059994292088481505,
  capGainTimeSeries: {
    "2019-04": 0.059994292088481505,
    "2019-05": 0.059994292088481505,
    "2019-06": 0.059994292088481505
  },
  m2PricePerQuarter: {
    "2019-04": 0.059994292088481505,
    "2019-05": 0.059994292088481505,
    "2019-06": 0.059994292088481505
  }
}
```

#### Getting Cost of Living Metrics

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332
}
```

**Usage:**

```typescript
const metric = new Metric()
const costOfLivingData: CostOfLivingResponse =
  await metric.getCostOfLiving(request)
```

**Output:**

```typescript
{
  costOfLiving: CostLevel,
  score: 77
}

type CostLevel = "very_high" | "high" | "moderate" | "low"
```

#### Getting Walkability Metrics

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332
}
```

**Usage:**

```typescript
const metric = new Metric()
const walkabilityData: WalkabilityResponse =
  await metric.getWalkability(request)
```

**Output:**

```typescript
{
  walkability: WalkabilityLevel,
  score: 85
}

type WalkabilityLevel = "walkers_paradise" | "walkable" | "somewhat_walkable" | "car_dependent"
```

#### Getting Current Price Metrics

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332
}
```

**Usage:**

```typescript
const metric = new Metric()
const currentPriceData: CurrentPriceResponse =
  await metric.getCurrentPrice(request)
```

**Output:**

```typescript
{
  currentPrice: 3500000
}
```

#### Getting Proximity to Work Metrics

**Input:**

```typescript
import { CommonRequestInput } from 'pe-sdk'

const request: CommonRequestInput = {
  latitude: 19.4326,
  longitude: -99.1332
}
```

**Usage:**

```typescript
const metric = new Metric()
const proximityToWorkData: ProximityToWorkResponse =
  await metric.getProximityToWork(request)
```

**Output:**

```typescript
{
  proximityToWork: ProximityLevel,
  score: 90
}

type ProximityLevel = "high" | "low" | "medium"
```

## Types

The SDK uses the following types for request and response objects:

### Appraisal Types

- `AppraisalReportRequestInput`
- `AppraisalReportRequestOutput`
- `AppraisalRequestInput`
- `AppraisalRequestInputVariable`
- `AppraisalRequestOutput`
- `AppraisalOutputCoverage`
- `CommonRequestInput`

### Metric Types

- `CapitalGainResponse`
- `CostOfLivingResponse`
- `CurrentPriceResponse`
- `ProximityToWorkResponse`
- `TrafficResponse`
- `WalkabilityResponse`
- `CommonRequestInput`

## Contributing

Please read
[CONTRIBUTING.md](https://github.com/dd3tech/pe-sdk/blob/main/CONTRIBUTING.md)
for details on our code of conduct, and the process for submitting pull
requests.

## License

This project is licensed under the MIT License - see the
[LICENSE.md](https://github.com/dd3tech/pe-sdk/blob/main/LICENSE.md) file for
details.
