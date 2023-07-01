import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.resource('products', 'ProductsController')
  Route.group(() => {
    Route.post('', 'UsersController.store').as('signUp')
    Route.get('', 'UsersController.show').as('getLoggedUser').middleware('auth:api')
    Route.put('', 'UsersController.update').as('updateLoggedUser').middleware('auth:api')
    Route.post('sign_in', 'UsersController.signIn').as('signIn')
  }).prefix('/user')
}).as('api')
