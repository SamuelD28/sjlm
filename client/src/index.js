import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import Website from './website/containers';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from './admin/hoc/auth.js';

const Login = lazy(() => import('./admin/containers/login/login.js'));
const Admin = lazy(() => import('./admin/containers'));

function loadLogin() {
    if (!(false || !!document.documentMode)) {
        return <Route path="/login" component={Login} />
    }
}

function loadAdmin() {
    if (!(false || !!document.documentMode)) {
        return <Route path="/admin" component={Auth(Admin, true)} />
    }
}

//----------Core Code-------//
ReactDOM.render(<Router>
    <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            {loadLogin()}
            {loadAdmin()}
            <Route path="/" component={Website} />
        </Switch>
    </Suspense>
</Router>, document.getElementById("root"));
