import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { productSchema } from 'App/Schemas/productSchema'
import ProductsService from 'App/Services/ProductsService'

export default class UserProductsController {
  productService: ProductsService

  constructor() {
    this.productService = new ProductsService()
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (!!!user) return response.status(401)
      const data = await request.validate({ schema: productSchema })
      const product = await this.productService.add({ ...data, user_id: user.id })
      return response.json(product)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async show({ response, auth }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (!!!user) return response.status(401)
      const products = await this.productService.getByUser(user.id)
      return response.json(products)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (!!!user) return response.status(401)
      const product = await this.productService.getByUserAndId(request.param('id'), user.id)[0]
      if (!product) return response.status(404)
      const data = await request.validate({ schema: productSchema })
      return response.json(await this.productService.update(product, data))
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async destroy({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.use('api').user
      if (!!!user) return response.status(401)
      const product = await this.productService.getByUserAndId(request.param('id'), user.id)[0]
      if (!product) return response.status(404)
      this.productService.delete(product)
      return response.status(200)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}
