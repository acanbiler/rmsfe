import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, Router, Switch, withRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Login from "./rms/container/Login";
import history from "./utils/history";
import 'semantic-ui-css/semantic.min.css';
import Manager from "./rms/container/Manager";

ReactDOM.render(
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={withRouter(Login)}/>
                <Route path="/manager-panel" component={withRouter(Manager)}/>
            </Switch>
        </Router>
        <ToastContainer />
    </>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
