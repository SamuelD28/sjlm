import React, {Component} from 'react';
import Ajax from '../../../shared/ajax.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './members.module.css';
import adminStyles from '../index.module.css';

// Component Import
import MembersEdit from '../../components/membersEdit/membersEdit.js';

import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MemberSchema} from '../../formSchema/memberSchema.js';

class Members extends Component{

    constructor(props)
    {
        super(props);
        this.state = {};
        this.PostConfig = MemberSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    componentDidMount()
    {
        this.GetMembers();
    }

    GetMembers = async() =>
    {
        let request = await Ajax.GetData("/api/members");
        await this.setState({members : request.data});
    }

    DisplayMembers()
    {
        if(this.state.members !== undefined){
            return this.state.members.map((member,index)=> (
                <MembersEdit
                    key={member._id}
                    member={member}
                    RefreshDataSet={this.GetMembers}
                    />
            ));
        }
    }

    ModalOpener = () =>
    {
        return(
        <div className="cardContainer cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
        )
    }

    render(){
    return(
    <div id={styles.membersPage} className={adminStyles.adminPage}>
        <section>
            <div styleName="membersContent">
                <FormGenerator
                    Inputs={MemberSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={MemberSchema.GetEmptyEditor()}
                    RefreshDataSet={this.GetMembers}
                    />
                {this.DisplayMembers()}
            </div>
        </section>
    </div>
    )
    }
}

export default CSSModules(Members, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});