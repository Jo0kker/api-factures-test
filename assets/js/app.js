/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React from "react";
import ReactDOM from "react-dom"
import '../css/app.css';
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore Edit me in assets/js/app.js');

const App = () => {
    return (
        <HashRouter>
            <NavBar />
            <main className="container pt-5">
                <Switch>
                    <Route path="/clients" component={CustomersPage} />
                    <Route path="/factures" component={InvoicesPage} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);