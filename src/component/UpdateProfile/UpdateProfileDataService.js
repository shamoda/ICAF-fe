  import axios from 'axios'

class UpdateProfileDataService{

    updateUser(user){
        return axios.post('http://localhost:8080/api/v1/user', user);
    }

    updatePassword(user){
      return axios.post('http://localhost:8080/api/v1/user/changepassword', user);
    }

}

export default new UpdateProfileDataService();