import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/factures")
        .then(response => response.data['hydra:member'])
}

function deleteInvoices(id) {
    return axios.delete("https://localhost:8000/api/factures/" + id);
}

export default {
    findAll,
    delete: deleteInvoices
}