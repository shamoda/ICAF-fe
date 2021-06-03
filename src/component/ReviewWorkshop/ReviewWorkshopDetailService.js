import axios from 'axios'

class ReviewWorkshopDetailDataService {

    getWorkshop(id) {
        return axios.get(`http://localhost:8080//getWorkshops/${id}`);
    }

    downloadProposal(fileName) {
        return axios.get(`http://localhost:8080/api/v1/download/proposal/${fileName}`, { responseType: 'blob' });
    }

    reviewWorkshop(review) {
        return axios.post(`http://localhost:8080/reviewWorkshop`, review);
    }

}

export default new ReviewWorkshopDetailDataService();