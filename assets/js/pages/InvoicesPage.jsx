import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import moment from "moment";
import InvoicesAPI from "../services/invoicesAPI";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}
const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("")
    const [invoices, setInvoices] = useState([]);
    const itemsPerPage = 10;

    // récup des factues après de l'api
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data);
        } catch (e) {
            console.log(e.response);
        }
    }

    //charger les data
    useEffect(() => {
        fetchInvoices();
    }, [])

    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoicesAPI.delete(id)
        } catch (e) {
            console.log(e.response);
            setInvoices(originalInvoices);
        }
    }

    // action au changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // action pour la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    const filteredInvoices = invoices.filter(i =>
        i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        i.amount.toString().includes(search.toLowerCase()) ||
        STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    )

    // pagination des données
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    return (<>
        <h1>Liste des factures</h1>
        <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
        </div>
        <table className="table table-hover">
            <thead>
            <tr>
                <th>Numéro</th>
                <th>Client</th>
                <th className={"text-center"}>Date d'envoi</th>
                <th className={"text-center"}>Status</th>
                <th className={"text-center"}>Montant</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                <td>{invoice.chrono}</td>
                <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                <td className={"text-center"}>{formatDate(invoice.sendAt)}</td>
                <td className={"text-center"}><span className={"badge badge-" + STATUS_CLASSES[invoice.status] }>{STATUS_LABELS[invoice.status]}</span></td>
                <td className={"text-center"}>{invoice.amount.toLocaleString()} €</td>
                <td>
                    <button className="btn btn-sm btn-primary mr-1">Editer</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                </td>
            </tr>)}
            </tbody>
        </table>
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange} length={filteredInvoices.length} />
    </>);
}

export default InvoicesPage;