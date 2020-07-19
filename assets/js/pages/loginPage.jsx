import React, {useState, useContext} from 'react';
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";

const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("")

    //Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    }

    //Gestion du submit
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await authAPI.authenticate(credentials);
            setError('');
            setIsAuthenticated(true);
            history.replace('/');
        }catch (e) {
            setError("Erreur lors de la connexion, veuillez vérifier vos données.");
        }
    }

    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <Field label={"Adresse email"} name={"username"} value={credentials.username} onChange={handleChange} placeholder={"Adresse mail de connexion"} error={error} />
                <Field name={"password"} label={"Mot de passe"} value={credentials.password} onChange={handleChange} type={"password"} error={""} />
                <div className="form-group">
                    <button className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;