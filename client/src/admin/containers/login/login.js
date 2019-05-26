//Library
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import { NavLink } from 'react-router-dom';

//Components
import { Form, Button, Transition, Image } from 'semantic-ui-react';
import { FormError, FormStatus, TextInput } from '../../../shared/FormGenerator/formGenerator.js';

//CSS modules
import CSSModules from 'react-css-modules';
import styles from './login.module.css';

/**
 * Component used for logging in a new user to access
 * the administration section of the website.
 */
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { FormStatus: new FormStatus(), email: "", password: "" }
    }

    async componentWillMount() {
        let user = await Ajax.GetData("/api/user/auth");

        if (user !== null && user.isAuth) {
            this.props.history.push("/admin");
        }
    }

    /**
     * Handle the changes in the input
     */
    HandleChange = (data) => {
        this.setState({ [data.name]: data.value })
    }

    /**
     * Handle the submission of the form to the server.
     * Redirect back to the administration section if the
     * request was successfull.
     */
    HandleSubmit = async () => {
        //Display a loading icon on top of the form top
        //show user feedback
        let temp = Object.assign({}, this.state.FormStatus, { loading: true });
        await this.setState({ FormStatus: temp });

        //Retrieve the form data and sends it to the server
        let formData = { email: this.state.email, password: this.state.password };
        let user = await Ajax.PostData("/api/user/login", formData);

        //Handles the response receive by the server
        if (user.success) {
            this.props.history.push("/admin");
        }
        else {
            let temp = Object.assign({}, this.state.FormStatus, { errors: [user.message], loading: false });
            await this.setState({ FormStatus: temp });
        }
    }

    render() {
        return <div style={{ height: "100%" }}>
            <Transition
                animation="fly right"
                duration={1000}
                transitionOnMount={true}>
                <div styleName="login" className="fill-height">
                    <NavLink to="/">
                        <Button styleName="loginBack" color="orange" inverted>
                            <i style={{ margin: "0" }} className="icon reply"></i>
                        </Button>
                    </NavLink>
                    <div>
                        <Image
                            size="medium"
                            centered
                            styleName="loginImage"
                            src="https://res.cloudinary.com/dohwohspb/image/upload/v1548355121/images/website/logo2_bga.png"
                            alt="logo"
                        />
                        <Form
                            styleName="loginForm"
                            onSubmit={this.HandleSubmit}>
                            <FormError errorHandler={this.state.FormStatus} />
                            <TextInput
                                input={{
                                    name: "email",
                                    type: "text",
                                    label: "Nom d'utilisateur",
                                    required: true,
                                    value: this.state.email
                                }}
                                handleChange={this.HandleChange}
                            />
                            <TextInput
                                input={{
                                    name: "password",
                                    type: "password",
                                    label: "Mot de passe",
                                    required: true,
                                    value: this.state.password
                                }}
                                handleChange={this.HandleChange}
                            />
                            <Button loading={this.state.FormStatus.loading} style={{ marginTop: ".5vw" }} type="submit" color="teal">Se Connecter</Button>
                            <a style={{ marginTop: "1vw" }} href="mailto:samuel_personnel@outlook.com">Besoin d'aide?</a>
                        </Form>
                    </div>
                </div>
            </Transition>
            <div
                styleName="loginBg"
                className="fill-height"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dohwohspb/image/upload/v1548351784/images/website/pexels-photo-1668246.jpg')`,
                }}>
            </div>
        </div>
    }
}

export default CSSModules(Login, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
