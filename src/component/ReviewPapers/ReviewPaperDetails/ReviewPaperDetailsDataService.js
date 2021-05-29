  
import axios from 'axios'

class ReviewPaperDetailsDataService {

    getResearchPaper(email){
        return axios.get(`http://localhost:8080/api/v1/researcher/${email}`);
    }

    reviewPaper(obj){
        return axios.post('http://localhost:8080/api/v1/researcher/review', obj);
    }

    downloadPaper(fileName){
        return axios.get(`http://localhost:8080/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

}

export default new ReviewPaperDetailsDataService();