import axios from 'axios'
import { HOST_URL } from '../../Api'

class ResearcherDashboardDataService{

    getResearcher(email){
        return axios.get(HOST_URL+`/api/v1/researcher/${email}`);
    }

    downloadPaper(fileName){
        return axios.get(HOST_URL+`/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

    updatePayment(email){
        return axios.post(HOST_URL+`/api/v1/researcher/pay/${email}`);
    }

}

export default new ResearcherDashboardDataService();