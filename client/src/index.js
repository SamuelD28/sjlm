import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './admin/containers';
import Website from './website/containers';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

//----------Core Code-------//
ReactDOM.render(<Router>
                    <Switch>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/" component={Website} />
                    </Switch>
                </Router>,document.getElementById("root"));
