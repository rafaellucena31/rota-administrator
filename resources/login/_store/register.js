import loginStore from './index'

const STORE_NAME = 'loginStore'

export default (rootStore) => {
    if (!(STORE_NAME in rootStore._modules.root._children)){
        rootStore.registerModule(STORE_NAME, loginStore)
    }
}