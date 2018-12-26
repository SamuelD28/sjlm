/*global fetch*/
import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './members.module.css';
import adminStyles from '../index.module.css';

// Component Import
import MembersCard from '../../components/membersCard/membersCard.js';
import MembersCreate from '../../components/membersCreate/membersCreate.js';
import MembersEdit from '../../components/membersEdit/membersEdit.js';

import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MemberSchema} from '../../formSchema/memberSchema.js';

class Members extends CrudComponent{

    constructor(props)
    {
        super(props);
        this.TextEditor = MemberSchema.GetEmptyEditor();
        this.Inputs = MemberSchema.GetEmptyInputs();
        this.PostConfig = MemberSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
        this.state = {};
    }

    async componentDidMount()
    {
        await this.GetMembers();
    }

    GetMembers = async() =>
    {
        await this.ReadInTempState("/api/members");
    }

    DisplayMembers()
    {
        if(this.tempState.db !== undefined){
            let array = this.tempState.db.slice();
            return array.map((item,index)=> (
                <div className="cardContainer"  key={item._id}>
                    <MembersCard members={item}/>
                    <MembersEdit
                        members={item}
                        UpdateTempState={this.UpdateTempState}
                        RemoveFromTempState={this.RemoveFromTempState}/>
                </div>
            ));
        }
    }

    ModalOpener = () =>
    {
        return <h1>Open Me</h1>
    }

    render(){
    return(
    <div id={styles.membersPage} className={adminStyles.adminPage}>
        <section>
            <div styleName="membersContent">
                <FormGenerator
                    Inputs={this.Inputs}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={this.TextEditor}
                    RefreshDataSet={this.GetMembers}/>
                {this.DisplayMembers()}
            </div>
        </section>
    </div>
    )
    }
}

export default CSSModules(Members, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});