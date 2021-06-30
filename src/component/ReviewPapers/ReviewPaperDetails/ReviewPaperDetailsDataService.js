import axios from 'axios'
import { HOST_URL } from '../../../Api'

class ReviewPaperDetailsDataService {

    getResearchPaper(email){
        return axios.get(HOST_URL+`/api/v1/researcher/${email}`);
    }

    reviewPaper(obj){
        return axios.post(HOST_URL+'/api/v1/researcher/review', obj);
    }

    downloadPaper(fileName){
        return axios.get(HOST_URL+`/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

    deleteResearcher(email){
        return axios.delete(HOST_URL+`/api/v1/researcher/${email}`);
    }

}

export default new ReviewPaperDetailsDataService();