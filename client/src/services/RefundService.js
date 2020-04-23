import Api from '@/services/Api'
export default {
    create(date, blank){
        return Api().post('/refund', { date, blank });
    }
}