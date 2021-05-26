
import UserServices from '~/services/userServices'
import {STORE_NAME} from './register'

export default {
    loadUserData: async ({commit, rootGetters, dispatch}) => {
        commit('setLoading', true)
        debugger
        let userServicesObject = new UserServices(rootGetters.userLogged.token)
        userServicesObject.getUsers().then(response => {
            dispatch('success',{'records' : response})
        }).catch(error=> {
            console.log(error)
            dispatch('error',{'errorMessage' : error})
        })
    },
    success: ({commit},{records}) => {
        commit('setLoading', false)
        commit(`${STORE_NAME}/updateField`, { path: 'resultSearch', value: records.data.users }, {root:true})
        commit(`${STORE_NAME}/updateField`, { path: 'colorSnackbar', value: 'success' }, {root:true})
        commit(`${STORE_NAME}/updateField`, { path: 'snackbar', value: true }, {root:true})
        commit(`${STORE_NAME}/updateField`, { path: 'textSnackbar', value: 'Loaded Success!' }, {root:true})
      },
    error: ({commit}, errorMessage) => {
        commit('setLoading', false)
        commit(`${STORE_NAME}/updateField`, { path: 'resultSearch', value: undefined }, {root:true})
        commit(`${STORE_NAME}/updateField`, { path: 'colorSnackbar', value: 'error' }, {root:true})
        commit(`${STORE_NAME}/updateField`, { path: 'snackbar', value: true }, {root:true})
        commit(`${STORE_NAME}/updateField`, { path: 'textSnackbar', value: errorMessage }, {root:true})
    },
}