import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/clients")
        .then(response => response.data['hydra:member'])
}

function deleteCustomers(id) {
    return axios.delete("https://localhost:8000/api/client/" + id);
}

function find(id) {
    return axios
        .get("https://localhost:8000/api/client/" + id)
        .then(response => response.data);
}

function update(id, customer) {
    return axios.put("https://localhost:8000/api/client/" + id, customer);
}

function create(customer) {
    return axios.post("https://localhost:8000/api/client", customer)
}

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteCustomers
}