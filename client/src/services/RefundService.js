import Api from '@/services/Api'
export default {
    create(amount, blank){
        return Api().post('/refund', { amount, blank });
    }
}