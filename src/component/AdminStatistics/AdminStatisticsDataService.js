import axios from 'axios'
import { HOST_URL } from '../../Api'

class AdminStatisticsDataService {

    getAnalytics(){
        return axios.get(HOST_URL+'/api/v1/analytics');
    }

}

export default new AdminStatisticsDataService();