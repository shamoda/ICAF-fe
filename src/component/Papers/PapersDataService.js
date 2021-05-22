  
import axios from 'axios'

class PapersDataService {

    downloadPaper(){
        return axios.get(`http://localhost:8080/api/v1/download/template/icaf-research-paper-template.docx`, {responseType: 'blob'});
    }

}

export default new PapersDataService();