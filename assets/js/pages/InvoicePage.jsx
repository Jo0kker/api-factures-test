import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import {Link} from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import InvoicesAPI from "../services/invoicesAPI";
import axios from "axios";

const InvoicePage = ({history, match}) => {
    const {id = "new"} = match.params;
    const [invoice , setInvoice] = useState({
        amount : 0,
        customer : "",
        status : "SENT"
    });
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status:""
    });
    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);
    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setInvoice({...invoice, [name] : value })
    }
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
            if (!invoice.customer && id === "new") {
                setInvoice({...invoice, customer: data[0].id});
            }
        } catch ({response}) {
            console.log(response);
            history.replace('/factures');
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editing) {
                await InvoicesAPI.update(id, invoice);
            }else{
                await InvoicesAPI.create(invoice);
                history.replace("/factures");
            }
        }catch ({response}) {
            const { violations } = response.data
            console.log(response)
            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                })
                setErrors(apiErrors);
            }
        }
    }
    const fetchInvoice = async id => {
        try {
            const {amount, status, customer} = await InvoicesAPI.find(id)
            setInvoice({amount, status, customer: customer.id});
        } catch (e) {
            console.log(e.response);
            history.replace('/factures');
        }
    }
    useEffect(() => {
        fetchCustomers();
    }, []);
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);
    

    return (
        <div>
            {editing && <h1>Modification d'une factures</h1> || <h1>Création d'une facture</h1> }
            <form onSubmit={handleSubmit}>
                <Field name={"amount"} type={"number"} placeholder={'Montant de la facture'} label={"Montant"} onChange={handleChange} value={invoice.amount} error={errors.amount} />
                <Select onChange={handleChange} name={"customer"} label={"Client"} value={invoice.customer} error={errors.customer} >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName + " " + customer.lastName}</option>)}
                </Select>
                <Select error={errors.status} value={invoice.status} label={"Status"} name={"status"} onChange={handleChange} >
                    <option value="SENT">Envoye</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type={"submit"} className={"btn btn-success"}>Enregistrer</button>
                    <Link to={"/factures"} className={"btn btn-link"}>Retour aux factures</Link>
                </div>
            </form>
        </div>
    );
};

export default InvoicePage;