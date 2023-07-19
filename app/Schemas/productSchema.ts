import { schema } from '@ioc:Adonis/Core/Validator'

export const productSchema = schema.create({
  name: schema.string(),
  description: schema.string(),
  thumbnail: schema.string(),
  price: schema.number(),
})
