import BaseRotaServices from './baseRotaService'

export default class RotaServices{
    constructor(token){
        this.token = token
        let baseRota = new BaseRotaServices(this.token)
        this.api = baseRota.api
    }
    getRotas(){
        debugger
        return this.api.get('/rotas')
    }
    generateNewRota() {
        return  this.api.get('/generate')
    }
    getRota(rotaId) {
        return  this.api.get('/rota/' + rotaId)
    }
}