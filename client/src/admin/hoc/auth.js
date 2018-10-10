import React, { Component } from 'react';
import {Ajax} from '../../shared/utility.js';

export default function(ComposedClass,isPrivate)
{
    class AuthenticationCheck extends Component {

        constructor(props){
            super(props);
            this.state = {loading: true};
        }

        async componentDidMount()
        {
            try{
                let user = await Ajax.GetData("/api/user/auth");
                
                if(!user.isAuth && isPrivate)
                    this.props.history.push('/login');
                else
                    this.setState({loading:false , user: user});
            }
            catch(error)
            {
                console.log("~An error occured while authentificating the user : " +  error);
                this.props.history.push('/');
            }
        }

        render() {
            if(this.state.loading)
                return <div> Loading </div>;
            else
                return <ComposedClass user={this.state.user}/>
        }
    }

    return AuthenticationCheck;
}


