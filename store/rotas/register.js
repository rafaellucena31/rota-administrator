import RotaStoreModule from './index'

export let STORE_NAME = 'RotaStore'

export function registerRotaStore(rootStore) {
    if (!(STORE_NAME in rootStore._modules.root._children)){
        rootStore.registerModule(STORE_NAME, RotaStoreModule)
    }
}