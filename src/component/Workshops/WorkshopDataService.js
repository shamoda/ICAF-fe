import axios from 'axios'

class WorkshopDataService {

    downloadproposal() {
        return axios.get(`http://localhost:8080/api/v1/download/template/sfsfsfsfsfsfsfsfsf.pdf`, { responseType: 'blob' });
    }

    getProposal(workshop) {
        return axios.post(`http://localhost:8080/api/v1/getWorkshops/search`, workshop);
    }

    getWorkshopById(id) {
        return axios.get(`http://localhost:8080/api/v1/getWorkshopById/${id}`);
    }

    getConductorData(conductor) {//test
        return axios.get(`http://localhost:8080/api/v1/getConductor/${conductor}`);
    }
}

export default new WorkshopDataService();