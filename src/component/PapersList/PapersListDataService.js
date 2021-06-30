import axios from 'axios'
import { HOST_URL } from '../../Api'

class PapersListDataService{

    getResearchPapers(example){
        return axios.post(HOST_URL+'/api/v1/researcher/filter', example);
    }

    downloadPaper(fileName){
        return axios.get(HOST_URL+`/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

}

export default new PapersListDataService();