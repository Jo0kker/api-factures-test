import axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_API} from "../config";

/**
 * Permet de faire une authentification
 * @param credentials
 * @returns {Promise<boolean>}
 */
function authenticate(credentials) {
    return axios
        .post(LOGIN_API, credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            //on previent axios que l'on a un header par défault sur toutes not future requette
            setAxiosToken(token);
            return true;
        })
}

/**
 * Permet la déconnexion
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers['Authorization'];
}

/**
 * Met le token dans les prochaines requette axios
 * @param token
 */
function setAxiosToken(token) {
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

/**
 * Permet de tester le token si il est présent et a jour
 */
function setup() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp : expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

/**
 * Test si la personne est authentifiée
 * @returns {boolean}
 */
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp : expiration} = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            console.log(new Date().getTime())
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};