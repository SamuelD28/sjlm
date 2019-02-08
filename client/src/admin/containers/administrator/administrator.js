import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

//Components
import NavigationLinks from '../navigationlinks/navigationlinks.js';
import Users from '../users/users.js';

/**
 * Component used for the admnistrator section
 * of the backend section fo the website.
 */
class Administrator extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount()
    {
        let users = await Ajax.GetData("/api/user/");
        
        if(users.success)
            this.setState({users : users.data});
    }

    render() {
    if(this.state.users !== undefined)
        return <div className="admin-page">
                    <div className="section-row">
                        <section className="section-left-column">
                            <Users users={this.state.users}/>
                        </section>
                        <section className="section-right-column">
                            <NavigationLinks />
                        </section>
                    </div>
                </div>
    else
        return<h1>ok</h1>
    }
}

export default Administrator;
