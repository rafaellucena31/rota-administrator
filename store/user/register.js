import UserStoreModule from './index'

export let STORE_NAME = 'UserStore'

export function registerUserStore(rootStore) {
    if (!(STORE_NAME in rootStore._modules.root._children)){
        rootStore.registerModule(STORE_NAME, UserStoreModule)
    }
}