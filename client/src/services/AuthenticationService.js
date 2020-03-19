import Api from '@/services/Api'

export default {
    login(credentials){
        return Api().post('/users/login', credentials);
    }
}