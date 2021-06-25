import axios from 'axios'

class AthenticationDataService {

    login(email, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(email + ":" + password);
        return axios.get(`http://localhost:8080/api/v1/user/login/${email}`, { headers: { authorization: basicAuthHeader } });
    }

}

export default new AthenticationDataService();