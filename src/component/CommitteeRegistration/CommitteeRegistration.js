import React, { Component } from 'react';
import './CommitteeRegistration.css'

class CommitteeRegistration extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                CommitteeRegistration works

                state...
                - email
                - Name
                - Contact
                - role
                - password
                - loading 
                - error

                inputs....
                - email
                - Name
                - Contact
                - role,
                    - dropdown
                        - reviewer
                        - editor
                        - admin

                password property needs to added to the state of the component
                - javascript have methods to auto generate numbers
                - auto generate a password (6 digit number)
                - set auto generated password to the state password

                {/* this.setstate({password: Math.floor(100000 + Math.random() * 900000)}) */}
            </div>
         );
    }
}
 
export default CommitteeRegistration;