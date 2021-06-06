import axios from 'axios'

class WorkshopRegistrationDataService {
    //Register a workshop
    registerWorkshop(workshop) {
        return axios.post('http://localhost:8080/api/v1/registerWorkshop', workshop);
    }
}
export default new WorkshopRegistrationDataService();