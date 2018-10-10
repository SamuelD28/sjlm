import React, {Component} from 'react';
import {Ajax, Utility, Forms} from '../../../shared/utility.js';
import {Form} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

//Css modules
import CSSModules from 'react-css-modules';
import styles from './login.module.css';

class Login extends Component{
    
    constructor(props)
    {
        super(props);
        this.formData = {};
    }
    
    HandleChange = (e) =>
    {
        try{
            let inputValue = Forms.RetrieveValueFromInput(e);
            Utility.IsValuesUndefinedOrNull(inputValue);
            Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    
    HandleSubmit = async() =>{
        let user = await Ajax.PostData("/api/user/login", this.formData);
        
        if(user.success)
            this.props.history.push("/admin");
    }
    
    render(){
        return(
        <div styleName="loginContainer">
            <div styleName="loginBack">
                <NavLink  to="/">
                    <button className="btn btn-outline-warning">
                        <i className="icon reply"></i>
                    </button>
                </NavLink>
            </div>
            <div styleName="loginImage">
                <img className="img-full" src="/logo2_bga.png" alt="logo" />
            </div>
            <Form styleName="loginForm" onSubmit={this.HandleSubmit}>
                <h2 styleName="loginTitle">Connexion à Saint-Jacques-le-Mineur</h2>
                <Form.Field>
                    <label styleName="loginLabel">Email</label>
                    <input required name="email" type="email" placeholder="Email" onChange={this.HandleChange}/>
                </Form.Field>
                <Form.Field>
                    <label styleName="loginLabel">Mot de passe</label>
                    <input required name="password" type="password" placeholder="Mot de passe" onChange={this.HandleChange}/>
                </Form.Field>
                <div styleName="loginBtn">
                    <button type="submit" className="btn btn-outline-primary">Se Connecter</button>
                </div>
            </Form>
        </div>
        );
    }
}

export default CSSModules(Login, styles, {handleNotFoundStyleName: "log", allowMultiple: true});
