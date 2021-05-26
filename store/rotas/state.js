export const state = function() {
    return {
        firstloading: true,
        loading: false,
        rotasData: {rotas: undefined, users: undefined},
        usersData: undefined,
        userselected: undefined,
        colorSnackbar: 'success',
        snackbar: false,
        timeout: 4000,
        textSnackbar: '',
        tab: undefined,
        resultSearch: undefined,
        dataSelected: undefined,
        showdialog: false,
        totalGenerated: 0,
    }
}
