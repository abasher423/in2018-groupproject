import Api from '@/services/Api'

export default {
    index(){
        return Api().get('/transactions');
    },
    update(transactionId, values){
        return Api().patch(`/transactions/${transactionId}`, values)
    },
    getSingleByBlank(blankId){
        return Api().get(`/transactions/getByBlankId/${blankId}`)
    },
    create(transaction){
        return Api().post('/transactions', transaction)
    },
    updateRefunded(id, values){
        return Api().patch(`/transactions/${id}`, values)
    },
    getDiscount(customer){
        return Api().get(`/transactions/calculateDiscount/${customer}`)
    },
    getIndDomReport(info){
        return Api().get(`/transactions/report/IndDomReport/${info}`)
    }
}