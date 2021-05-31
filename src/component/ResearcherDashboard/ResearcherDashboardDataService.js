  
import axios from 'axios'

class ResearcherDashboardDataService{

    getResearcher(email){
        return axios.get(`http://localhost:8080/api/v1/researcher/${email}`);
    }

    downloadPaper(fileName){
        return axios.get(`http://localhost:8080/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

    updatePayment(email){
        return axios.post(`http://localhost:8080/api/v1/researcher/pay/${email}`);
    }

}

export default new ResearcherDashboardDataService();