import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Route, Router, Switch, withRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Login from "./rms/container/Login";
import history from "./utils/history";
import 'semantic-ui-css/semantic.min.css';
import Manager from "./rms/container/Manager";
import Server from "./rms/container/Server";
import Cook from "./rms/container/Cook";

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
                    <Route path="/cook-panel" component={withRouter(Cook)}/>
                    <Route path="/server-panel" component={withRouter(Server)}/>
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
