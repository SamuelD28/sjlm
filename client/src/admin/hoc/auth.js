import React, { Component } from 'react';
import Ajax from '../../shared/ajax.js';
import {Message, Icon } from 'semantic-ui-react';

export default function(ComposedClass,isPrivate)
{
    class AuthenticationCheck extends Component {

        constructor(props){
            super(props);
            this.state = {loading: true, errors : []};
        }

        async componentDidMount()
        {
            let user = await Ajax.GetData("/api/user/auth");
            if(user.error !== undefined){
                this.setState({loading: false, errors : this.state.errors.push(user.error)});
            }
            else if(!user.isAuth && isPrivate){
                this.props.history.push('/login');
            }
            else{
                this.setState({loading:false , user: user});
            }
        }

        render() {
            if(this.state.loading)
                return <div> Loading </div>;
            else if(!this.state.loading && this.state.errors.length === 0)
                return <ComposedClass {...this.props} user={this.state.user}/>
            else 
                return <Message error
                            >
                            <h3>Le serveur n'a pas reçu de biscuit!</h3>
                            <span>
                            Ce type d'erreur signifie que votre navigateur n'a pas conserver de biscuit utilisé pour authentifier un utilisateur.
                            <br />
                            Veuillez vous assurer d'utiliser un navigateur à jour tel que google chrome.
                            </span>
                            <br />
                            <a href='https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DDesktop&hl=fr'>Mettre à jour Chrome</a>
                            <br />
                            <a href='mailto:samuel_personnel@outlook.com'>Besoin d'aide?</a>
                        </Message>
        }
    }

    return AuthenticationCheck;
}


