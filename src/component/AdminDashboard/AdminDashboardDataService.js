import axios from 'axios'
import { HOST_URL } from '../../Api'

class AdminDashboardDataService {

    getWorkshop(workshop) {
        return axios.post(HOST_URL+`/api/v1/getWorkshops/filter`, workshop);
    }

    getWorkshopById(id) {
        return axios.get(HOST_URL+`/api/v1/getWorkshopById/${id}`);
    }

    getConductorData(conductor) {
        return axios.get(HOST_URL+`/api/v1/getConductor/${conductor}`);
    }
    reviewPost(id, posts) {
        return axios.post(HOST_URL+`/api/v1/publishPost/${id}`, posts)
    }

    deleteWorkshop(email) {
        return axios.delete(HOST_URL+`/api/v1/workshop/${email}`);
    }

}
export default new AdminDashboardDataService()
