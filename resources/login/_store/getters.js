import { getField } from 'vuex-map-fields';
export default {
    credentialUser: (state) => {
        return state.credentialUser
    },
    loginSucess: (state) => {
        return state.loginSucess
    },
    getField,
}