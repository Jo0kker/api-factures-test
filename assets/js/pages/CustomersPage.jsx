import React, {useEffect, useState} from "react";
import Pagination from "../components/Pagination";
import CustomersAPI from '../services/customersAPI';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    // permet d'aller récup les custmers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);
        } catch (e) {
            toast.error("Impossible de charger les clients")
        }
    }

    // au chargement du composent on va chercher les data
    useEffect(() => {
        fetchCustomers();
    }, [])

    // création de la suppression d'un customers
    const handleDelete = async id => {

        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        try {
            await CustomersAPI.delete(id)
            toast.success("Clients supprimée")
        } catch (e) {
            setCustomers(originalCustomers)
            toast.error("Erreur lors de la suppréssion du clients")
        }
    }
    // action au changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // action pour la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // filtrage des customers en fonction de la recherche
    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase())))
    const itemsPerPage = 8;
    // pagination des données
    const paginatedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage);

    return (
        <>
            <div className="d-flex mb-3 justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to={"/client/new"} className={"btn btn-primary"} >Créer un client</Link>
            </div>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className={"text-center"}>Factures</th>
                    <th className={"text-center"}>Montant Total</th>
                    <th className={"text-center"} />
                </tr>
                </thead>
                <tbody>
                {paginatedCustomers.map(customer => <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td><Link to={"/client/"+customer.id}>{customer.firstName} {customer.lastName}</Link></td>
                    <td>{customer.email}</td>
                    <td>{customer.company}</td>
                    <td className={"text-center"}>
                        <span className="badge badge-light">{customer.invoices.length}</span>
                    </td>
                    <td className={"text-center"}>{customer.totalAmount.toLocaleString()} €</td>
                    <td className={"text-center"}>
                        <button onClick={() => handleDelete(customer.id)} disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger">Supprimer</button>
                    </td>
                </tr>)}

                </tbody>
            </table>
            {loading && <TableLoader /> }
            {itemsPerPage < filteredCustomers.length && <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredCustomers.length} onPageChanged={handlePageChange} />}
        </>
    );
}

export default CustomersPage;