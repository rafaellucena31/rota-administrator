import { updateField } from 'vuex-map-fields';
import { RotasLeftJoinUserByData } from './rotaUtil'

export default {
    setFirstLoading: (state, newvalue) => {
        state.firstloading = newvalue
    },
    setLoading: (state, newvalue) => {
        state.loading = newvalue
    },
    addRota: (state, rotainfo) => {
        let retorno = RotasLeftJoinUserByData(rotainfo, state.userselected, state.usersData, state.dataSelected)
        if (state.resultSearch != undefined){
            for (let index = 0; index < retorno.length; index++) {
                const element = retorno[index]
                state.resultSearch.push(element)
            }
        }
        else{
            state.resultSearch = retorno
        }
        
        state.totalGenerated = retorno.length
    },
    resetState:(state) => {
        state.firstloading = true
        state.loading = false
        state.rotasData = {rotas: undefined, users: undefined}
        state.usersData = undefined
        state.userselected = undefined
        state.colorSnackbar = 'success'
        state.snackbar = false
        state.timeout = 4000
        state.textSnackbar = ''
        state.tab = undefined
        state.resultSearch = undefined
        state.dataSelected = undefined
        state.showdialog = false
        state.totalGenerated = 0
    },
    updateField
}