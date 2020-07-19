import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from 'axios';
import CustomersAPI from "../services/customersAPI";

const CustomerPage = ({match, history}) => {
    const [editing, setEditing] = useState(false);
    const {id = "new"} = match.params;

    //récuperation du customers en fonction de l'id
    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await CustomersAPI.find(id)
            setCustomer({firstName, lastName, company, email});
        } catch (e) {
            console.log(e.response)
        }
    }
    //chargement du customer au besoin
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id])
    const [customer, setCustomer] = useState({
        lastName: '',
        firstName: '',
        email:'',
        company:''
    })
    const [errors, setErrors] = useState({
        lastName : "",
        firstName: "",
        email: "",
        company: ""
    })
    //pour le changement des input
    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setCustomer({...customer, [name] : value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editing) {
                await CustomersAPI.update(id, customer)
            }else {
                await CustomersAPI.create(customer)
                history.replace("/clients");
            }
            setErrors({});
        } catch ({response}) {
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


    return (<>
        {!editing && <h1>Création d'un client</h1> || <h1>Modification du client</h1>}
        <form onSubmit={handleSubmit}>
            <Field name={"lastName"} label={"Nom de famille"} placeholder={"Nom de famille du client"} value={customer.lastName} onChange={handleChange} error={errors.lastName} />
            <Field name={"firstName"} label={"Prénom"} placeholder={"Prénom du client"} value={customer.firstName} onChange={handleChange} error={errors.firstName} />
            <Field name={"email"} label={"Email"} placeholder={"Adresse mail du client"} type={"email"} value={customer.email} onChange={handleChange} error={errors.email} />
            <Field name={"company"} label={"Entreprise"} placeholder={"Entreprise du client"} value={customer.company} onChange={handleChange} error={errors.company} />
            <div className="form-group">
                <button type={"submit"} className="btn btn-success">Enregistrer</button>
                <Link to={"/clients"} className={"btn btn-warning ml-3"} >Retour à la liste</Link>
            </div>
        </form>
    </>);
}

export default CustomerPage;