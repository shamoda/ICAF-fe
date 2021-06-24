import axios from 'axios'

class EditorDataService {
    //Edit a workshop
    EditWorkshop(workshop) {
        return axios.post('http://localhost:8080/api/v1/getWorkshops/search', workshop);
    }

    getWorkshopById(id) {
        return axios.get(`http://localhost:8080/api/v1/getWorkshopById/${id}`);
    }

    publishEdit(post) {
        return axios.post(`http://localhost:8080/api/v1//editProposal`, post)
    }

    getImageUrl(fileName) {
        return axios.get(`http://localhost:8080/api/v1/getUrl/${fileName}`)
    }
}
export default new EditorDataService();
