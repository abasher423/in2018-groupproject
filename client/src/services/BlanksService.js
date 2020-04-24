import Api from '@/services/Api'

export default {
    index(){
        return Api().get('/blanks')
    },
    create(blank){
        return Api().post('/blanks', blank)
    },
    remove(uniqueNumber){
        return Api().delete(`blanks/deleteBlankByNo/${uniqueNumber}`)
    },
    getSingleByUniqueNo(uniqueNumber){
        return Api().get(`blanks/byUniqueNo/${uniqueNumber}`)
    },
    updateBlank(uniqueNumber, values){
        return Api().patch(`blanks/${uniqueNumber}`, values)
    },
    getReportData(dates){
        return Api().get(`blanks/report/generateReport/${dates}`)
    }
}