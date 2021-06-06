import axios from 'axios'

class ManageUsersDataService {

    getUsers(example) {
        return axios.post('http://localhost:8080/api/v1/user/filter/admin', example);
    }

    deleteUser(email) {
        return axios.delete(`http://localhost:8080/api/v1/user/${email}`);
    }

    deleteAttendee(email) {
        return axios.delete(`http://localhost:8080/api/v1/attendee/${email}`);
    }

    deleteResearcher(email) {
        return axios.delete(`http://localhost:8080/api/v1/researcher/${email}`);
    }

    deleteWorkshopConductor(email) {
        return axios.delete(`http://localhost:8080/api/v1/workshop/${email}`);
    }

}

export default new ManageUsersDataService();