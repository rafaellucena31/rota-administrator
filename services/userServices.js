import BaseRotaServices from './baseRotaService'

export default class UserServices{
    constructor(token){
        this.token = token
        let baseRota = new BaseRotaServices(this.token)
        this.api = baseRota.api
    }
    getUsers(){
        return this.api.get('/users')
    }
}