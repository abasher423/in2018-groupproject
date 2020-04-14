import Api from '@/services/Api'

export default {
    index(){
        return Api().get('/blanks');
    },
    create(blank){
        return Api().post('/blanks', blank);
    },
    remove(uniqueNumber){
        return Api().delete(`blanks/deleteBlankByNo/${uniqueNumber}`);
    },
    getSingleByUniqueNo(uniqueNumber){
        return Api().get(`blanks/byUniqueNo/${uniqueNumber}`);
    },
    updateBlank(blankId, values){
        return Api().patch(`blanks/${blankId}`, values)
    }
}