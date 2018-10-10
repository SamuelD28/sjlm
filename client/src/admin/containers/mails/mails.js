import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

// Css Module Import
import adminStyles from '../index.module.css';

class Mails extends CrudComponent{
    
    render(){
    return(
    <div className={adminStyles.adminPage}> 
        <section>
            <h1>Mails Section</h1>
        </section>
    </div>
    )
    }
}

export default Mails;