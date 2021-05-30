import axios from 'axios'

class AthenticationDataService {

    login(user) {
        return axios.post('http://localhost:8080/api/v1/user/login', user);
    }

}

export default new AthenticationDataService();