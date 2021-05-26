import { updateField } from 'vuex-map-fields';

export default {
    saveCredentialUser: (state, payload) => {
        state.credentialUser = Object.assign({},payload)
        //console.log(state.credencialUsuario)
    },
    saveLoginSuccess: (state, {status}) => {
        state.loginSucess = status
    },
    updateField
}