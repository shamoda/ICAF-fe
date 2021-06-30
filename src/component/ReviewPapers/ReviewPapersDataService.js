import axios from 'axios'
import { HOST_URL } from '../../Api'

class PapersListDataService{

    getResearchPapers(example){
        return axios.post(HOST_URL+'/api/v1/researcher/filter', example);
    }

    downloadPaper(fileName){
        return axios.get(HOST_URL+`/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

    reviewPaper(obj){
        return axios.post(HOST_URL+'/api/v1/researcher/review', obj);
    }

    retrieveAllPapersForAdmin() {
        return axios.get(HOST_URL+'/api/v1/researcher');
    }

}

export default new PapersListDataService();