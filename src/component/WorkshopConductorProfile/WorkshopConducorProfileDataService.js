import axios from 'axios'

class WorkshopConductorProfileDataService {
    //get workshops by conductor
    getProposal(conductor) {
        return axios.get(`http://localhost:8080/api/v1/getWorkshopsByConductor/${conductor}`);
    }

}

export default new WorkshopConductorProfileDataService();