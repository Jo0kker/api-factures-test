/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, {useState} from "react";
import ReactDOM from "react-dom"
import '../css/app.css';
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/loginPage";
import authAPI from "./services/authAPI";
import CustomersPage from "./pages/CustomersPage";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";
import {ToastContainer, toast} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

authAPI.setup();


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated());

    const NavbarWithRouter = withRouter(NavBar)

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path={"/clients"} component={CustomersPage} />
                        <PrivateRoute path={"/client/:id"} component={CustomerPage} />
                        <PrivateRoute path={"/facture/:id"} component={InvoicePage} />
                        <PrivateRoute path={"/factures"} component={InvoicesPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer position={toast.POSITION.TOP_LEFT} />
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);