  
import axios from 'axios'

class AdminStatisticsDataService {

    getAnalytics(){
        return axios.get('http://localhost:8080/api/v1/analytics');
    }

}

export default new AdminStatisticsDataService();