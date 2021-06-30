import axios from 'axios'
import { HOST_URL } from '../Api'

class AthenticationDataService {

    login(email, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(email + ":" + password);
        return axios.get(HOST_URL+`/api/v1/user/login/${email}`, { headers: { authorization: basicAuthHeader } });
    }

}

export default new AthenticationDataService();