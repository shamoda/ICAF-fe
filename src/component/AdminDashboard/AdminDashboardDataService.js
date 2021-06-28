import axios from 'axios'

class AdminDashboardDataService {

    getWorkshop(workshop) {
        return axios.post(`http://localhost:8080/api/v1/getWorkshops/filter`, workshop);
    }

    getWorkshopById(id) {
        return axios.get(`http://localhost:8080/api/v1/getWorkshopById/${id}`);
    }

    getConductorData(conductor) {//test
        return axios.get(`http://localhost:8080/api/v1/getConductor/${conductor}`);
    }
    reviewPost(id, posts) {
        return axios.post(`http://localhost:8080/api/v1/publishPost/${id}`, posts)
    }

    deleteWorkshop(email) {
        return axios.delete(`http://localhost:8080/api/v1/workshop/${email}`);
    }

}
export default new AdminDashboardDataService()
