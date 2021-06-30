import axios from 'axios'
import { HOST_URL } from '../../Api'

class ManageUsersDataService {

    getUsers(example){
        return axios.post(HOST_URL+'/api/v1/user/filter/admin', example);
    }

    deleteUser(email){
        return axios.delete(HOST_URL+`/api/v1/user/${email}`);
    }

    deleteAttendee(email){
        return axios.delete(HOST_URL+`/api/v1/attendee/${email}`);
    }

    deleteResearcher(email){
        return axios.delete(HOST_URL+`/api/v1/researcher/${email}`);
    }

    deleteWorkshopConductor(email){
        return axios.delete(HOST_URL+`/api/v1/workshop/${email}`);
    }

}

export default new ManageUsersDataService();