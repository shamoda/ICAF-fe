import axios from 'axios'
import { HOST_URL } from '../../Api'

class WorkshopConductorProfileDataService {
    //get workshops by conductor
    getProposal(conductor) {
        return axios.get(HOST_URL+`/api/v1/getWorkshopsByConductor/${conductor}`);
    }

}

export default new WorkshopConductorProfileDataService();