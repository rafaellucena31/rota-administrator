export const state = function() {
    //Is Possible to create a factory to eliminate duplicate in mutation (resetState).
    return {
        loading: false,
        colorSnackbar: 'success',
        snackbar: false,
        timeout:1000,
        textSnackbar: '',
        resultSearch: undefined,
        headers: [
            { text: 'User Id', value: 'userId' },
            {
                text: 'User',
                align: 'start',
                value: 'user',
            },
        ]
    }
}
