import Api from '@/services/Api'

export default {
    index(){
        return Api().get('/transactions');
    },
    update(transactionId, values){
        return Api().patch(`/transactions/${transactionId}`, values)
    }
}