import axios from 'axios'

class WorkshopConductorDataService {
    //Register a workshop
    registerWorkshop(workshop) {
        return axios.post('http://localhost:8080/api/v1/registerConductor', workshop);
    }

    getConductorData(conductor) {
        return axios.get(`http://localhost:8080/api/v1/getConductor/${conductor}`);
    }
}

export default new WorkshopConductorDataService();