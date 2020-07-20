import axios from 'axios';
import {INVOICE_API, INVOICES_API} from "../config";

function findAll() {
    return axios
        .get(INVOICES_API)
        .then(response => response.data['hydra:member'])
}

function deleteInvoices(id) {
    return axios.delete(INVOICE_API + "/" + id);
}

function find(id) {
    return axios
        .get(INVOICE_API + "/" + id)
        .then(response => response.data);
}

function update(id, invoice) {
    return axios.put(INVOICE_API + "/" + id, {
        ...invoice,
        amount: parseFloat(invoice.amount),
        customer: `/api/client/${invoice.customer}`
    });
}

function create(invoice) {
    return axios.post(INVOICE_API, {
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