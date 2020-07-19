import Axios from "axios";

function register(user) {
    return Axios.post('https://localhost:8000/api/users', user);
}

export default {
    register
};