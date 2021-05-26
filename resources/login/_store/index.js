import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const state = () => ( {
    credentialUser: {
        username : '',
        password: ''
    },
    loginSucess: false,
    colorSnackbar: 'success',
    snackbar: false,
    timeout:5000,
    textSnackbar: '',
} )

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
