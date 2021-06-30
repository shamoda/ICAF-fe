import axios from 'axios'
import { HOST_URL } from '../../Api'

class UpdateProfileDataService{

    updateUser(user){
        return axios.post(HOST_URL+'/api/v1/user', user);
    }

    updatePassword(user){
      return axios.post(HOST_URL+'/api/v1/user/changepassword', user);
    }

}

export default new UpdateProfileDataService();