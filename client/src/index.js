import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './admin/containers';
import Website from './website/containers';
import Login from './admin/components/login/login.js';
import Auth from './admin/hoc/auth.js';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//----------Core Code-------//
ReactDOM.render(<Router>
                    <Switch>
                        <Route path="/admin" component={Auth(Admin, true)}/>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Website} />
                    </Switch>
                </Router>,document.getElementById("root"));

