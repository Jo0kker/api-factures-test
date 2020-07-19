import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import axios from "axios";
import usersApi from "../services/usersApi";

function RegisterPage({history}) {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setUser({...user, [name] : value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiErrors = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = 'Différence dans les mots de passe';
            setError(apiErrors);
            return;
        }
        try {
            await usersApi.register(user);
            setError({});
            history.replace('/login');
        } catch (e) {
            const {violations} = e.response.data;
            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setError(apiErrors);
            }
        }
    }


    return (
        <div>
            <h1>Création d'un compte utilisateur</h1>
            <form onSubmit={handleSubmit}>
                <Field name={"firstName"} label={"Nom de famille"} placeholder={"Votre nom de famille"} value={user.firstName} onChange={handleChange} error={error.firstName} />
                <Field name={"lastName"} label={"Prénom"} placeholder={"Votre prénom"} value={user.lastName} onChange={handleChange} error={error.lastName} />
                <Field name={"email"} type={"email"} label={"Adresse mail"} placeholder={"Votre adresse mail"} value={user.email} onChange={handleChange} error={error.email} />
                <Field name={"password"} type={"password"} label={"Mot de passe"} placeholder={"Mot de passse"} value={user.password} onChange={handleChange} error={error.password} />
                <Field name={"passwordConfirm"} type={"password"} label={"Confirmation du mot de passe"} placeholder={"Confirmation du mot de passse"} value={user.passwordConfirm} onChange={handleChange} error={error.passwordConfirm} />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to={"/login"} className={"btn btn-link"}>Me connecter</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;