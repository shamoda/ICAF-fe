import axios from 'axios'

class ReviewWorkshopDataService {

    getProposal(search) {
        return axios.post("http://localhost:8080/getWorkshops/search", search);
    }

    reviewProposal(workshop) {
        return axios.post('http://localhost:8080/reviewWorkshop', workshop);
    }



}
export default new ReviewWorkshopDataService()