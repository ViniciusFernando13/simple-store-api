import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

const signInSchema = schema.create({
  email: schema.string([rules.email()]),
  password: schema.string(),
})

const signUpSchema = schema.create({
  name: schema.string(),
  birthdate: schema.date({ format: 'sql' }, [rules.before('today')]),
  email: schema.string([
    rules.email(),
    rules.normalizeEmail({ allLowercase: true }),
    rules.unique({ table: 'users', column: 'email' }),
  ]),
  password: schema.string([rules.confirmed('passwordConfirmation')]),
})

const updateSchema = schema.create({
  name: schema.string(),
  birthdate: schema.date({ format: 'sql' }, [rules.before('today')]),
  email: schema.string([
    rules.email(),
    rules.normalizeEmail({ allLowercase: true }),
    rules.unique({ table: 'users', column: 'email', where: { id: ['id'] } }),
  ]),
  password: schema.string.optional([rules.confirmed('passwordConfirmation')]),
})

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate({ schema: signUpSchema })
      const user = await User.create(data)
      return response.json(user)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async show({ response, auth }: HttpContextContract) {
    try {
      return response.json(auth.use('api').user)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      const user = await User.find(auth.use('api').user?.id)
      if (!user) return response.status(404)
      const data = await request.validate({ schema: updateSchema })
      user.merge(data)
      await user.save()
      return response.json(user)
    } catch (error) {
      return response.status(400).send(error)
    }
  }

  public async signIn({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate({ schema: signInSchema })
      const token = await auth.use('api').attempt(data.email, data.password)
      return response.json(token)
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}
