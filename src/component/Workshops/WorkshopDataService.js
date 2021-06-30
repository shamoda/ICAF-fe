import axios from 'axios'
import { HOST_URL } from '../../Api'

class WorkshopDataService {

    downloadproposal() {
        return axios.get(HOST_URL+`/api/v1/download/template/icaf-workshop-proposal-template.docx`, { responseType: 'blob' });
    }

    getProposal(workshop) {
        return axios.post(HOST_URL+`/api/v1/getWorkshops/search`, workshop);
    }

    getWorkshopById(id) {
        return axios.get(HOST_URL+`/api/v1/getWorkshopById/${id}`);
    }

    getConductorData(conductor) {
        return axios.get(HOST_URL+`/api/v1/getConductor/${conductor}`);
    }
}

export default new WorkshopDataService();