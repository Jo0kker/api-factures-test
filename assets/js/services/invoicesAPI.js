import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/factures")
        .then(response => response.data['hydra:member'])
}

function deleteInvoices(id) {
    return axios.delete("https://localhost:8000/api/facture/" + id);
}

function find(id) {
    return axios
        .get("https://localhost:8000/api/facture/" + id)
        .then(response => response.data);
}

function update(id, invoice) {
    return axios.put('https://localhost:8000/api/facture/' + id, {
        ...invoice,
        amount: parseFloat(invoice.amount),
        customer: `/api/client/${invoice.customer}`
    });
}

function create(invoice) {
    return axios.post('https://localhost:8000/api/facture', {
        ...invoice,
        amount: parseFloat(invoice.amount),
        customer: `/api/client/${invoice.customer}`
    });
}

export default {
    findAll,
    find,
    update,
    create,
    delete: deleteInvoices
}