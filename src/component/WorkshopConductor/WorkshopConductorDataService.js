
import axios from 'axios'

class WorkshopConductorDataService {
    //Register a workshop
    registerWorkshop(workshop) {
        return axios.post('http://localhost:8080/registerConductor', workshop);
    }
}

export default new WorkshopConductorDataService();