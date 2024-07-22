import Joi from 'joi'

export const baseRequestInputSchema = Joi.object({
  region: Joi.string().description(
    'The region where the property is located. If present along with address, latitude and longitude are not required.'
  ),

  address: Joi.string().description(
    'The address of the property. If present along with region, latitude and longitude are not required.'
  ),

  latitude: Joi.number().description(
    'The latitude of the property. Required if region and address is not present.'
  ),

  longitude: Joi.number().description(
    'The longitude of the property. Required if region and address is not present.'
  ),

  lotSurface: Joi.number()
    .required()
    .description(
      'The surface of the property in square meters. Must be greater than constructionArea.'
    ),

  constructionArea: Joi.number()
    .required()
    .max(Joi.ref('lotSurface'))
    .description(
      'The surface of the property in square meters. Must be less than lotSurface.'
    )
})
  .unknown(true)
  .custom((obj, helpers) => {
    if (obj.address && obj.region && (obj.latitude || obj.longitude)) {
      return helpers.error('object.xor', {
        peers: ['address/region', 'latitude/longitude']
      })
    }
    if ((!obj.address || !obj.region) && (!obj.latitude || !obj.longitude)) {
      return helpers.error('object.missing', {
        peers: ['address/region', 'latitude/longitude']
      })
    }
    return obj
  })
