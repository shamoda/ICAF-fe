import axios from 'axios'
import { HOST_URL } from '../../Api'

class WorkshopRegistrationDataService {
    //Register a workshop
    registerWorkshop(workshop) {
        return axios.post(HOST_URL+'/api/v1/registerWorkshop', workshop);
    }
}
export default new WorkshopRegistrationDataService();