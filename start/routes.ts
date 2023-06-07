import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.resource('products', 'ProductsController')
}).as('api')
