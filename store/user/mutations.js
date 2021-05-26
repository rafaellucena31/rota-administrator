import { updateField } from 'vuex-map-fields';

export default {
    setLoading: (state, newvalue) => {
        debugger
        state.loading = newvalue
    },
    resetState:(state) => {
        state.loading = false
        state.colorSnackbar = 'success'
        state.snackbar = false
        state.timeout = 1000
        state.textSnackbar = ''
        state.resultSearch = undefined
    },
    updateField
}