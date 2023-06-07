import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Product from 'App/Models/Product'

const productSchema = schema.create({
  name: schema.string(),
  description: schema.string(),
  thumbnail: schema.string(),
  price: schema.number(),
})

export default class ProductsController {
  public async index({ response }: HttpContextContract) {
    console.log('a')

    return response.json(await Product.all())
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate({ schema: productSchema })
      const product = await Product.create(data)
      return response.json(product)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const product = await Product.find(request.param('id'))
      if (!product) return response.status(404)
      return response.json(product)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const product = await Product.find(request.param('id'))
      if (!product) return response.status(404)
      const data = await request.validate({ schema: productSchema })
      product.merge(data)
      await product.save()
      return response.json(product)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const product = await Product.find(request.param('id'))
      if (!product) return response.status(404)
      await product.delete()
      return response.status(200)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}
