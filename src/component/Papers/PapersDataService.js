import axios from 'axios'
import { HOST_URL } from '../../Api'

class PapersDataService {

    downloadPaper(){
        return axios.get(HOST_URL+`/api/v1/download/template/icaf-research-paper-template.docx`, {responseType: 'blob'});
    }

}

export default new PapersDataService();