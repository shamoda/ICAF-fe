import axios from 'axios'
import { HOST_URL } from '../../Api'

class AttendeeRegistrationDataService{

    registerAttendee(attendee){
        return axios.post(HOST_URL+'/api/v1/attendee', attendee);
    }

}

export default new AttendeeRegistrationDataService();