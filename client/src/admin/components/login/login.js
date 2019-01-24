import React, {Component} from 'react';
import {Utility, Forms} from '../../../shared/utility.js';
import Ajax from '../../../shared/ajax.js';
import {Form, Button, Input} from 'semantic-ui-react';
import {FormError, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';

//Css modules
import CSSModules from 'react-css-modules';
import styles from './login.module.css';

class Login extends Component{

    constructor(props)
    {
        super(props);
        let formStatus = new FormStatus();
        formStatus.errorsHeader = "Des erreurs sont survenues";
        this.state = {FormStatus: formStatus}
        this.formData = {};
    }

    HandleChange = (e) =>
    {
        try{
            let inputValue = Forms.RetrieveValueFromInput(e.target);
            Utility.IsValuesUndefinedOrNull(inputValue);
            Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }

    HandleSubmit = async() =>{
        
        let temp = Object.assign({}, this.state.FormStatus, {loading: true});
        await this.setState({FormStatus: temp});
        
        let user = await Ajax.PostData("/api/user/login", this.formData);
        if(user.success){
            this.props.history.push("/admin");
        }
        else{
            let temp = Object.assign({}, this.state.FormStatus, {errors: [user.message], loading: false});
            await this.setState({FormStatus: temp});
        }
    }
    
    GoHome = () =>{
        this.props.history.push("/");
    }

    render(){
        return(
        <div styleName="loginContainer">
            <div styleName="login">
                <div styleName="loginBack">
                    <button 
                        onClick={this.GoHome}
                        className="btn btn-outline-warning">
                        <i className="icon reply"></i>
                    </button>
                </div>
                <div styleName="loginFormContainer">
                    <div styleName="loginImage">
                        <img className="img-full" src="/logo2_bga.png" alt="logo" />
                    </div>
                    <Form
                        styleName="loginForm"
                        loading={this.state.FormStatus.loading}
                        onSubmit={this.HandleSubmit}>
                        <FormError errorHandler={this.state.FormStatus} />
                        <Form.Field>
                            <label styleName="loginLabel">Nom Utilisateur</label>
                            <input required name="email" type="text" placeholder="Nom..." onChange={this.HandleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label styleName="loginLabel">Mot de passe</label>
                            <input required name="password" type="password" placeholder="Mot de passe..." onChange={this.HandleChange}/>
                        </Form.Field>
                        <Button style={{marginTop: ".5vw"}} type="submit" color="teal">Se Connecter</Button>
                        <a style={{marginTop: "1vw"}} href="mailto:samuel_personnel@outlook.com">Besoin d'aide?</a>
                    </Form>
                </div>
            </div>
            <div styleName="loginBg" style={{backgroundImage : `url('https://res.cloudinary.com/dohwohspb/image/upload/v1548293527/images/website/fall-autumn-red-season.jpg')`}}></div>
        </div>
        );
    }
}

export default CSSModules(Login, styles, {handleNotFoundStyleName: "log", allowMultiple: true});
