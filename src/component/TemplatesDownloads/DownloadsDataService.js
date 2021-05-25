  
import axios from 'axios'

class DownloadsDataService {

    downloadPaper(){
        return axios.get(`http://localhost:8080/api/v1/download/template/icaf-research-paper-template.docx`, {responseType: 'blob'});
    }

    // downloadPresentation(){
    //     return axios.get(`http://localhost:8080/api/v1/download/template/icaf-presentation-template.pptx`, {responseType: 'blob'});
    // }

    downloadProposal(){
        return axios.get(`http://localhost:8080/api/v1/download/template/icaf-workshop-proposal-template.docx`, {responseType: 'blob'});
    }

}

export default new DownloadsDataService();