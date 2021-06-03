import axios from 'axios'

class WorkshopEditorDataservice {

    getProposals(search) {
        return axios.post("http://localhost:8080/getWorkshops/search", search);
    }

    getProposalById(id) {
        return axios.get(`http://localhost:8080//getWorkshops/${id}`);
    }

    reviewWorkshop(workshop) {
        return axios.post('http://localhost:8080/registerWorkshop', workshop);
    }

}
export default new WorkshopEditorDataservice()