import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

// Css Module Import
import adminStyles from '../index.module.css';

//Components
import UserCreate from '../../components/userCreate/userCreate.js';
import UserUpdate from '../../components/userUpdate/userUpdate.js';

class Administrator extends CrudComponent{
    
    render(){
    return(
    <div className={adminStyles.adminPage}> 
        <section className={adminStyles.sectionWrapper}>
            <UserUpdate user={this.props.user}/>
            <UserCreate />
        </section>
    </div>
    )
    }
}

export default Administrator;