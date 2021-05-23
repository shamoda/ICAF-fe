  
import axios from 'axios'

class AttendeeRegistrationDataService{

    registerAttendee(attendee){
        return axios.post('http://localhost:8080/api/v1/attendee', attendee);
    }

}

export default new AttendeeRegistrationDataService();