import axios from 'axios'
import { HOST_URL } from '../../Api'

class CommitteeRegistrationDataService{

    committeRegistration(committemember){
        return axios.post(HOST_URL+'/api/v1/committee', committemember);
    }


}

export default new CommitteeRegistrationDataService();