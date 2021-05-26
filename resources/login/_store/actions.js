import LoginService from '../_services/loginServices'

export default {
    doAuthentication: async ({commit, state, dispatch}) => {
        try{
            debugger
            const response =  await LoginService.postAutentication(state.credentialUser)
            
            if (response.message === 'VALID_USERNAME_PASSWORD'){
                const getPermissions = await LoginService.postGetPermissions({token: response.token})
                if (getPermissions.message === 'SUCCESS'){
                    const userLogged = {
                        userId : response.userId,
                        name: response.name,
                        userName: response.userName,
                        Roles: response.Roles,
                        Permissions: getPermissions.Permissions,
                        token: response.token
                    }
                    debugger
                    commit('UserStore/resetState', undefined,{ root: true })
                    commit('RotaStore/resetState',undefined, { root: true })

                    commit('saveLoggedUser', userLogged, { root: true })
                    commit('saveLoginSuccess', {status: true})
                }
                else{
                    dispatch('error', 'Invalid Username or Password')
                }
                
            }
        }
        catch (error) {
            dispatch('error', error)
        }
    },
    error: ({commit},errorMessage) => {
        commit('updateField', { path: 'colorSnackbar', value: 'error' })
        commit('updateField', { path: 'snackbar', value: true })
        commit('updateField', { path: 'textSnackbar', value: errorMessage })
    },
}