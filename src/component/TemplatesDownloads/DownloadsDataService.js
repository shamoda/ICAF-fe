import axios from 'axios'
import { HOST_URL } from '../../Api'

class DownloadsDataService {

    downloadPaper(){
        return axios.get(HOST_URL+`/api/v1/download/template/icaf-research-paper-template.docx`, {responseType: 'blob'});
    }

    downloadPresentation(){
        return axios.get(HOST_URL+`/api/v1/download/template/icaf-presentation-template.pptx`, {responseType: 'blob'});
    }

    downloadProposal(){
        return axios.get(HOST_URL+`/api/v1/download/template/icaf-workshop-proposal-template.docx`, {responseType: 'blob'});
    }

}

export default new DownloadsDataService();