
import RotaServices from '~/services/rotaServices'
import UserServices from '~/services/userServices'
import {STORE_NAME as ROTA_STORE_NAME} from './register'

export default {
    loadRotaData: async ({commit, getters ,rootGetters, dispatch}) => {
        commit('setLoading', true)
        let rotaServicesObject = new RotaServices(rootGetters.userLogged.token)
        rotaServicesObject.getRotas().then(response => {
            commit(`${ROTA_STORE_NAME}/updateField`, { path: 'rotasData.rotas', value: response.data.rotas }, {root:true})
            commit(`${ROTA_STORE_NAME}/updateField`, { path: 'rotasData.users', value: response.data.users }, {root:true})
            commit(`${ROTA_STORE_NAME}/updateField`, { path: 'resultSearch', value: getters.GetRotasLeftJoinUser }, {root:true})
            dispatch('success')
            
        }).catch(error=> {
            console.log(error)
            commit(`${ROTA_STORE_NAME}/updateField`, { path: 'resultSearch', value: undefined }, {root:true})
            dispatch('error', error)
        })
    },
    loadUserData: async ({commit, rootGetters, dispatch}) => {
        commit('setFirstLoading', false)
        commit('setLoading', true)
        let userServicesObject = new UserServices(rootGetters.userLogged.token)
        userServicesObject.getUsers().then(response => {
            commit(`${ROTA_STORE_NAME}/updateField`, { path: 'usersData', value: response.data.users }, {root:true})
            dispatch('success', 'Users Loaded in Combobox')
        }).catch(error=> {
            console.log(error)
            dispatch('error', error)
        })
    },
    generateNewRota: async ({commit, getters, rootGetters, dispatch}) => {
        debugger
        commit('setLoading', true)
        let rotaServicesObject = new RotaServices(rootGetters.userLogged.token)
        let userServicesObject = new UserServices(rootGetters.userLogged.token)
        const users = await userServicesObject.getUsers()
        
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'usersData', value: users.data.users }, {root:true})
        rotaServicesObject.generateNewRota().then(response => {
            if (response.data.status == "OK") {
                rotaServicesObject.getRota(response.data.rotaId).then(res => {
                    commit('addRota', res.data)
                    let totalAdded = getters['getField']('totalGenerated')
                    if(totalAdded > 0){
                        dispatch('success', `success, ${totalAdded} Added`)
                    } else{
                        dispatch('success',  `success, but ${totalAdded} Added`)
                    }
                }).catch(err=>{
                    console.log(err)
                    commit(`${ROTA_STORE_NAME}/updateField`, { path: 'resultSearch', value: undefined }, {root:true})
                    dispatch('error', err)
                })
                
            } else {
                dispatch('error', 'Error trying generate new rota')
            }
            
            
        }).catch(error=> {
            console.log(error)
            commit(`${ROTA_STORE_NAME}/updateField`, { path: 'resultSearch', value: undefined }, {root:true})
            dispatch('error', error)
        })
    },
    success: ({commit}, message = 'Loaded Success!') => {
        commit('setLoading', false)
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'colorSnackbar', value: 'success' }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'snackbar', value: true }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'textSnackbar', value: message }, {root:true})
    },
    error: ({commit}, errorMessage) => {
        commit('setLoading', false)
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'rotasData.rotas', value: undefined }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'rotasData.users', value: undefined }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'usersData', value: undefined }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'colorSnackbar', value: 'error' }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'snackbar', value: true }, {root:true})
        commit(`${ROTA_STORE_NAME}/updateField`, { path: 'textSnackbar', value: errorMessage }, {root:true})
    },
}