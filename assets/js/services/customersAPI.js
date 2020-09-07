import axios from 'axios';
import {CUSTOMERS_API, CUSTOMER_API} from "../config";

function findAll() {
    return axios
        .get(CUSTOMERS_API)
        .then(response => response.data['hydra:member'])
}

function deleteCustomers(id) {
    return axios.delete(CUSTOMER_API + id);
}

function find(id) {
    return axios
        .get(CUSTOMER_API + "/" + id)
        .then(response => response.data);
}

function update(id, customer) {
    return axios.put(CUSTOMER_API + "/" + id, customer);
}

function create(customer) {
    return axios.post(CUSTOMER_API, customer)
}

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteCustomers
}