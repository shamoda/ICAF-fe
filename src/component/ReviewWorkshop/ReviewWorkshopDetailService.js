import axios from 'axios'
import { HOST_URL } from '../../Api'

class ReviewWorkshopDetailDataService {

    reviewWorkshop(review) {
        return axios.post(HOST_URL+`/api/v1/reviewProposal`, review);
    }

    downloadProposal(fileName) {
        return axios.get(HOST_URL+`/api/v1/download/proposal/${fileName}`, { responseType: 'blob' });
    }

    getWorkshop(id) {
        return axios.get(HOST_URL+`/api/v1/getWorkshopById/${id}`);
    }
}
export default new ReviewWorkshopDetailDataService();