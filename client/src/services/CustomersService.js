import Api from '@/services/Api'

export default {
    index(){
        return Api().get('/customers');
    },
    update(customerId, values){
        return Api().patch(`/customers/${customerId}`, values)
    },
    getById(customer){
        return Api().get(`/customers/${customer}`)
    }
}