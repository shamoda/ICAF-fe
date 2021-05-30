import axios from 'axios'

class CommitteeRegistrationDataService{

    committeRegistration(committemember){
        return axios.post('http://localhost:8080/api/v1/', committemember);
    }


}

export default new CommitteeRegistrationDataService();