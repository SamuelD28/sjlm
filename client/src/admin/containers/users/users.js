import React, {Component} from 'react';

import {Divider} from 'semantic-ui-react';
import UserCreate from '../../components/userCreate/userCreate.js';
import UserUpdate from '../../components/userUpdate/userUpdate.js';

class Users extends Component{
    
    DisplayUsers = () =>{
        return  this.props.users.map((user)=>(
                    <UserUpdate key={user._id} user={user} />
                ))
    }
    
    render(){
        return  <div className="component-card medium-gutters rounded">
                    <h2>Les Utilisateurs</h2>    
                    <UserCreate />
                    <Divider />
                    {this.DisplayUsers()}
                </div>
    }
}

export default Users;