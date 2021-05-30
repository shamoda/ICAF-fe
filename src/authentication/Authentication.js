import axios from "axios";

class Athentication {

    // ::::::::: User roles :::::::::
    // researcher
    // workshopConductor
    // attendee
    // reviewer
    // editor
    // admin

    successfulLogin(user) {
        // this.setupAxiosInterceptors(authHead)
        sessionStorage.setItem('authenticatedUserEmail', user.email);
        sessionStorage.setItem('authenticatedUserName', user.name);
        sessionStorage.setItem('authenticatedUserContact', user.contact);
        sessionStorage.setItem('authenticatedUserRole', user.role);
    }

    logout() {
        this.ejectAxiosInterceptor()
        sessionStorage.removeItem('authenticatedUserEmail');
        sessionStorage.removeItem('authenticatedUserName');
        sessionStorage.removeItem('authenticatedUserContact');
        sessionStorage.removeItem('authenticatedUserRole');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUserEmail');
        if (user === null) return false;
        return true;
    }

    loggedUserId() {
        let id = sessionStorage.getItem('authenticatedUserEmail');
        if (id === null) return '';
        return id;
    }

    loggedUserName() {
        let name = sessionStorage.getItem('authenticatedUserName');
        if (name === null) return '';
        return name;
    }

    loggedUserRole() {
        let role = sessionStorage.getItem('authenticatedUserRole');
        if (role != null) return role;
        return null;
    }

    loggedAsResearcher() {
        let role = this.loggedUserRole()
        if (role != null && role === 'researcher') return true;
        return false;
    }

    loggedAsWorkshopConductor() {
        let role = this.loggedUserRole()
        if (role != null && role === 'workshopConductor') return true;
        return false;
    }

    loggedAsAttendee() {
        let role = this.loggedUserRole()
        if (role != null && role === 'attendee') return true;
        return false;
    }

    loggedAsReviewer() {
        let role = this.loggedUserRole()
        if (role != null && role === 'reviewer') return true;
        return false;
    }

    loggedAsEditor() {
        let role = this.loggedUserRole()
        if (role != null && role === 'editor') return true;
        return false;
    }

    loggedAsAdmin() {
        let role = this.loggedUserRole()
        if (role != null && role === 'admin') return true;
        return false;
    }

    setupAxiosInterceptors(basicAuthHeader) {
        this.id = axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = basicAuthHeader;
                return config;
            }
        )
    }

    ejectAxiosInterceptor() {
        console.log(this.id)
        axios.interceptors.request.eject(this.id)
        console.log(this.id)
    }

}

export default new Athentication();