import React from 'react';
import ReactDOM from 'react-dom';
import Website from './website/containers';
import Admin from './admin/containers';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//----------Core Code-------//
ReactDOM.render(<Router>
                    <Switch>
                        <Route exact path="/" component={Website} />
                        <Route path="/admin" component={Admin} />
                    </Switch>
                </Router>,document.getElementById("root"));
