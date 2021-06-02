  
import axios from 'axios'

class ManageResearchersDataService{

    getUsers(example){
        return axios.post('http://localhost:8080/api/v1/researcher/filter', example);
    }

    downloadPaper(fileName){
        return axios.get(`http://localhost:8080/api/v1/download/paper/${fileName}`, {responseType: 'blob'});
    }

}

export default new ManageResearchersDataService();