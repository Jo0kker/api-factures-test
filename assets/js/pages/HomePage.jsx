import React from "react";
import {Link} from "react-router-dom";

const HomePage = (props) => {
    return (<div className="jumbotron">
        <h1 className="display-3">Application de facture</h1>
        <p className="lead">Créer vous un compte, créer des cliens et editées leur des factures.</p>
        <hr className="my-4" />
            <p>Site de mise en pratique pour un front en React, à distance un api sous symfony.</p>
            <p className="lead">
                <Link to={"/login"} className="btn btn-primary btn-lg" href="#" role="button">Crée un compte</Link>
            </p>
    </div>);
}

export default HomePage;