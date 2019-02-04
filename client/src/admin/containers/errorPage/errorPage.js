import React from 'react';
import {NavLink} from 'react-router-dom';
import {Segment, Header, Icon, Button} from 'semantic-ui-react';

const ErrorPage = () =>{
    
    return <Segment placeholder style={{width: "100%", height: "-webkit-fill-available", margin: "0 auto", textAlign: "center"}}>
                <Header icon>
                    <Icon name='server'/>
                    Le serveur ne peut vous authentifier.
                </Header>
                <p>
                Ce type d'erreur signifie que votre navigateur n'a pas conserver de biscuit utilisé pour authentifier un utilisateur. Veuillez vous assurer d'utiliser un navigateur à jour tel que google chrome.
                </p>
                <br />
                <NavLink to="/login">
                    <Button color="teal">Se Connecter</Button>
                </NavLink>
                <br />
                <a href='mailto:samuel_personnel@outlook.com'>Besoin d'aide?</a>
            </Segment>
}

export default ErrorPage;
