import Api from '@/services/Api'
export default {
    index(){
        return Api().get('/commission');
    },
    create(type, rate){
        return Api().post('/commission', {type, rate});
    }
}
