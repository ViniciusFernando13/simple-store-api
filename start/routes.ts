import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
  Route.resource('products', 'ProductsController')
  Route.group(() => {
    Route.post('', 'UsersController.store').as('signUp')
    Route.get('', 'UsersController.show').as('getLoggedUser').middleware('auth:api')
    Route.put('', 'UsersController.update').as('updateLoggedUser').middleware('auth:api')
    Route.post('sign_in', 'UsersController.signIn').as('signIn')
    Route.group(() => {
      Route.get('', 'UserProductsController.show').as('getProductByUser').middleware('auth:api')
      Route.post('', 'UserProductsController.store').as('addProductByUser').middleware('auth:api')
      Route.put('', 'UserProductsController.update')
        .as('updateProductByUser')
        .middleware('auth:api')
      Route.delete('', 'UserProductsController.destroy')
        .as('deleteProductByUser')
        .middleware('auth:api')
    }).prefix('/products')
  }).prefix('/user')
}).as('api')
