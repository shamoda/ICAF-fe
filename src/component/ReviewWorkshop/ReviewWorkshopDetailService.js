import axios from 'axios'

class ReviewWorkshopDetailDataService {

    reviewWorkshop(review) {
        return axios.post(`http://localhost:8080/api/v1/reviewProposal`, review);
    }

    downloadProposal(fileName) {
        return axios.get(`http://localhost:8080/api/v1/download/proposal/${fileName}`, { responseType: 'blob' });
    }

    getWorkshop(id) {
        return axios.get(`http://localhost:8080/api/v1//getWorkshopById/${id}`);
    }
}
export default new ReviewWorkshopDetailDataService();