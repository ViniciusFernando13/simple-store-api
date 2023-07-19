import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { productSchema } from 'App/Schemas/productSchema'
import ProductsService from 'App/Services/ProductsService'

export default class ProductsController {
  productService: ProductsService
  constructor() {
    this.productService = new ProductsService()
  }
  public async index({ response }: HttpContextContract) {
    return response.json(await this.productService.getAll())
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate({ schema: productSchema })
      const product = await this.productService.add(data)
      return response.json(product)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const product = await this.productService.getById(request.param('id'))
      if (!product) return response.status(404)
      return response.json(product)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    try {
      const product = await this.productService.getById(request.param('id'))
      if (!product) return response.status(404)
      const data = await request.validate({ schema: productSchema })
      return response.json(await this.productService.update(product, data))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const product = await this.productService.getById(request.param('id'))
      if (!product) return response.status(404)
      this.productService.delete(product)
      return response.status(200)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}
