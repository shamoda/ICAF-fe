import axios from 'axios'

class WorkshopDataService {

    downloadproposal() {
        return axios.get(`http://localhost:8080/api/v1/download/template/sfsfsfsfsfsfsfsfsf.pdf`, { responseType: 'blob' });
    }

}

export default new WorkshopDataService();