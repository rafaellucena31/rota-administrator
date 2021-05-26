
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key:'vuex'
    ,paths: ['userLogged','isAuthenticated']
  })(store)
}