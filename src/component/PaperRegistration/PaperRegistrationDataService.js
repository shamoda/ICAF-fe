import axios from 'axios'
import { HOST_URL } from '../../Api'

class PaperRegistrationDataService{

    registerResearcher(researcher){
        return axios.post(HOST_URL+'/api/v1/researcher', researcher);
    }

}

export default new PaperRegistrationDataService();