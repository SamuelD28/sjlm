/*global fetch*/
import React from 'react';
import CrudComponent from '../../../shared/CrudComponent.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './members.module.css';
import adminStyles from '../index.module.css';

// Component Import
import MembersCard from '../../components/membersCard/membersCard.js';
import MembersCreate from '../../components/membersCreate/membersCreate.js';
import MembersEdit from '../../components/membersEdit/membersEdit.js';

class Members extends CrudComponent{
    
    async componentDidMount()
    {
        this.ReadInTempState("/api/members");
    }
    
    DisplayMembers()
    {
        if(this.tempState.db !== undefined){
            //BUG WITH SORTING OF THE ARRAY. IT BREAKS PAST 10 ELEMENTS
            let array = this.tempState.db.slice();
            return array.map((item,index)=> (
                <div className="cardContainer">
                    <MembersCard members={item} key={item._id}/>
                    <MembersEdit />
                </div>
            ));
        }
    }
    
    render(){
    return(
    <div id={styles.membersPage} className={adminStyles.adminPage}> 
        <section>
            <div styleName="membersContent">
                <MembersCreate CreateInTempState={this.CreateInTempState}/>
                {this.DisplayMembers()}
            </div>
        </section>
    </div>
    )
    }
}

export default CSSModules(Members, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});