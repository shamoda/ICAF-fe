import axios from 'axios'

class ProgramDataService {

    downloadproposal() {
        return axios.get(`http://localhost:8080/api/v1/download/template/sfsfsfsfsfsfsfsfsf.pdf`, { responseType: 'blob' });
    }

    getWorkshop(workshop) {
        return axios.post(`http://localhost:8080/api/v1/getWorkshops/search`, workshop);
    }

    getWorkshopById(id) {
        return axios.get(`http://localhost:8080/api/v1/getWorkshopById/${id}`);
    }
}
export default new ProgramDataService()