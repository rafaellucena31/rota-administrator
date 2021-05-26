import {AdjustMenu} from '~/resources/helpers/ACL'
import {Permissions as P} from '~/resources/helpers/ACL'

export default  {
    userLogged: (state) => {
        return state.userLogged
    },
    menuDataConditional: (state) => {
        let menuSystemDefault = [
            {
                action: '/',
                title: 'Home',
                icon: 'mdi-home',
                activate: true,
                items: [],
                visible: true,
                permission: 'all'
            },
            {
                action: '/rotas',
                title: 'Rotas',
                icon: 'mdi-road-variant',
                activate: false,
                items: [],
                visible: true,
                permission: [P.Rota_List,P.Rota_Generate,P.Rota_Get]
            },
            {
                action: '/users',
                title: 'User',
                icon: 'mdi-account-group',
                activate: false,
                items: [],
                visible: true,
                permission: [P.User_List]
            },
        ]
        let PermissionGranted = state.userLogged.Permissions
        debugger
        let retorno = AdjustMenu(menuSystemDefault, PermissionGranted)
        return retorno
    },
    layout: (state) => {
        return state.layout
    }   
}