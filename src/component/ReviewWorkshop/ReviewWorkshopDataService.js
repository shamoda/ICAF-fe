import axios from 'axios'
import { HOST_URL } from '../../Api'

class ReviewWorkshopDataService {

    downloadproposal() {
        return axios.get(HOST_URL+`/api/v1/download/template/sfsfsfsfsfsfsfsfsf.pdf`, { responseType: 'blob' });
    }

    getProposal(workshop) {
        return axios.post(HOST_URL+`/api/v1/getWorkshops/filter`, workshop);
    }
}
export default new ReviewWorkshopDataService()