import Api from '@/services/Api'
export default {
    create(blank, amount){
        return Api().post('/refund', blank, amount);
    }
}