import axios from 'axios'
import { HOST_URL } from '../../Api'

class WorkshopConductorDataService {
    //Register a workshop
    registerWorkshop(workshop) {
        return axios.post(HOST_URL+'/api/v1/registerConductor', workshop);
    }

    getConductorData(conductor) {
        return axios.get(HOST_URL+`/api/v1/getConductor/${conductor}`);
    }
}

export default new WorkshopConductorDataService();