import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './administrator.module.css';

//Components
import UserCreate from '../../components/userCreate/userCreate.js';
import UserUpdate from '../../components/userUpdate/userUpdate.js';
import NavigationLinks from '../navigationlinks/navigationlinks.js';

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
                    <div styleName="admin">
                        <section styleName="userSection">
                            <div styleName="sectionCard">
                                <h2>Les utilisateurs</h2>    
                                {this.state.users.map((user)=>(
                                    <div className="item-card">{user.email}</div>
                                ))}
                            </div>
                            <div styleName="sectionCard">
                                <h2>Ajouter un utilisateur</h2>
                                <UserCreate />
                            </div>
                            <div styleName="sectionCard">
                                <h2>Gérer {this.props.user.firstName} {this.props.user.lastName}</h2>
                                <UserUpdate user={this.props.user}/>
                            </div>
                        </section>
                        <NavigationLinks />
                    </div>
                </div>
    }
}

export default CSSModules(Administrator, styles, { allowMultiple: true, handleNotFoundStyleName: 'log' });
