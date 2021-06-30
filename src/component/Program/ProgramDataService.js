import axios from 'axios'
import { HOST_URL } from '../../Api'

class ProgramDataService {

    downloadproposal() {
        return axios.get(HOST_URL+`/api/v1/download/template/sfsfsfsfsfsfsfsfsf.pdf`, { responseType: 'blob' });
    }

    getWorkshop(workshop) {
        return axios.post(HOST_URL+`/api/v1/getWorkshops/search`, workshop);
    }

    getWorkshopById(id) {
        return axios.get(HOST_URL+`/api/v1/getWorkshopById/${id}`);
    }
}
export default new ProgramDataService()