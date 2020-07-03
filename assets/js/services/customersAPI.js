import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/clients")
        .then(response => response.data['hydra:member'])
}

function deleteCustomers(id) {
    return axios.delete("https://localhost:8000/api/clients/" + id);
}

export default {
    findAll,
    delete: deleteCustomers
}