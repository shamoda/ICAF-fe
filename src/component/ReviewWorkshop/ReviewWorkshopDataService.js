import axios from 'axios'

class ReviewWorkshopDataService {

    downloadproposal() {
        return axios.get(`http://localhost:8080/api/v1/download/template/sfsfsfsfsfsfsfsfsf.pdf`, { responseType: 'blob' });
    }

    getProposal(workshop) {
        return axios.post(`http://localhost:8080/api/v1/getWorkshops/search`, workshop);
    }
}
export default new ReviewWorkshopDataService()