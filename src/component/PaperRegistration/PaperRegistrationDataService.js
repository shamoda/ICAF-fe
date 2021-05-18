  
import axios from 'axios'

class PaperRegistrationDataService{

    registerResearcher(researcher){
        return axios.post('http://localhost:8080/api/v1/researcher', researcher);
    }

    // updateResearcher(researcher){
    //     return axios.put('http://localhost:8080/api/v1/product/update', product);
    // }

    // getResearcher(email){
    //     return axios.get(`http://localhost:8080/api/v1/product/${productId}`);
    // }

}

export default new PaperRegistrationDataService();