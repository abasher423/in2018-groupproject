import Api from '@/services/Api'
export default {
    index(){
        return Api().get('/commission');
    },
    create(formData){
        return Api().post('/commission', formData);
    }
}
