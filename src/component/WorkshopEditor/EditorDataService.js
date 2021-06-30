import axios from 'axios'
import { HOST_URL } from '../../Api'

class EditorDataService {
    //Edit a workshop
    EditWorkshop(workshop) {
        return axios.post(HOST_URL+'/api/v1/getWorkshops/search', workshop);
    }

    getWorkshopById(id) {
        return axios.get(HOST_URL+`/api/v1/getWorkshopById/${id}`);
    }

    publishEdit(post) {
        return axios.post(HOST_URL+'/api/v1/editProposal', post)
    }

    getImageUrl(fileName) {
        return axios.get(HOST_URL+`/api/v1/getUrl/${fileName}`)
    }
}
export default new EditorDataService();
