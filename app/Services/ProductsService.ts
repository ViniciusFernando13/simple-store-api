import Product from 'App/Models/Product'

export default class ProductsService {
  public async getAll() {
    return await Product.all()
  }

  public async add(data: any) {
    try {
      return await Product.create(data)
    } catch (error) {
      console.log(error)

      throw error
    }
  }

  public async getById(id: number) {
    try {
      return await Product.find(id)
    } catch (error) {
      throw error
    }
  }

  public async getByUser(userId: number) {
    try {
      return await Product.query().where((productQuery) => {
        productQuery.where('user_id', userId)
      })
    } catch (error) {
      throw error
    }
  }

  public async getByUserAndId(id: number, userId: number) {
    try {
      return await Product.query().where((productQuery) => {
        productQuery.where('user_id', userId)
        productQuery.where('id', id)
      })
    } catch (error) {
      throw error
    }
  }

  public async update(product: Product, data: any) {
    try {
      product.merge(data)
      await product.save()
      return product
    } catch (error) {
      throw error
    }
  }

  public async delete(product: Product) {
    try {
      await product.delete()
    } catch (error) {
      throw error
    }
  }
}
