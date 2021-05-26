import getters from './getters'

export const state = function() {
    return {
        userLogged: {
            userId: '',
            userName: '',
            Roles: [],
            Permissions: [],
            token: ''
        },
        isAuthenticated: false,
        layout: {
            fillHeight: true,
            fluid: true,
        },
    }
}

const mutations = {
    saveLoggedUser: (state, payload) => {
        state.userLogged = Object.assign({}, payload)
        state.isAuthenticated = true
    },
    
    doLogoff: (state) => {
        let user = {
            userId: '',
            userName: '',
            Roles: [],
            Permissions: [],
        }
        
        state.userLogged = Object.assign({}, user)
        state.isAuthenticated = false
    },

    setLayout: (state, layout) => {
        state.layout = Object.assign({}, layout)
    }
}
const actions = {
    doLogoffWithClearVuex: async ({commit}) => {
        commit('UserStore/resetState', { root: true })
        commit('RotaStore/resetState', { root: true })
        commit('doLogoff', { root: true })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
