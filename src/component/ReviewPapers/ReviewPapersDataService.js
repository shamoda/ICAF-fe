
import axios from 'axios'

class PapersListDataService {

    getResearchPapers(example) {
        return axios.post('http://localhost:8080/api/v1/researcher/filter', example);
    }

    downloadPaper(fileName) {
        return axios.get(`http://localhost:8080/api/v1/download/paper/${fileName}`, { responseType: 'blob' });
    }

    reviewPaper(obj) {
        return axios.post('http://localhost:8080/api/v1/researcher/review', obj);
    }

}

export default new PapersListDataService();