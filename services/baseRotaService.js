
import axios from 'axios'

export default class BaseRotaServices{
    constructor(token){
        this.token = token
        this.api = axios.create({
            baseURL: process.env.URL_BASE_ROTA,
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}