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
                
            let user = await Ajax.GetData("/api/user/auth");
            if(!user.isAuth && isPrivate)
                    this.props.history.push('/admin/login');

            this.setState({loading:false})
        }

        render() {
            if(this.state.loading)
                return <div> Loading </div>;
            else
                return <ComposedClass {...this.props} user={this.props.user}/>
        }
    }

    return AuthenticationCheck;
}


