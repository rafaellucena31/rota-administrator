export default function ({ store, redirect, $apiAuth, $apiRota}) {
  debugger
    if (!store.state.isAuthenticated) {
      return redirect('/login')
    } else {
      let token = `bearer ${store.getters.userLogged.token}`
      $apiAuth.setToken(token)
      $apiRota.setToken(token)
    }
  }