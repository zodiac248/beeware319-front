import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import {AzureAD} from "react-aad-msal";
import Routes from './routes';
import {authProvider} from "./Auth/authProvider";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AzureAD
                provider={authProvider}
                reduxStore={store}
                forceLogin={true}>
                <Router>
                    <Routes/>
                </Router>
            </AzureAD>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
