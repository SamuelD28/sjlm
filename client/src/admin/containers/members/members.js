import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './members.module.css';
import adminStyles from '../index.module.css';

// Component Import
import MembersEdit from '../../components/membersEdit/membersEdit.js';
import MembersCreate from '../../components/membersCreate/membersCreate.js';
import Occupations from '../occupations/occupations.js';

class Members extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.GetMembers();
    }

    GetMembers = async() => {
        let request = await Ajax.GetData("/api/members");
        this.setState({ members: request.data });
    }

    DisplayMembers() {
        if (this.state.members !== undefined) {
            console.log(this.state.members);
            if(this.state.members.length > 0)
                return this.state.members.map((member) => (
                    <MembersEdit
                        key={member._id}
                        member={member}
                        RefreshDataSet={this.GetMembers}
                        />))
            else
                return <h2>Aucun membre sauvegardé</h2>
        }
    }

    render() {
        return  <div id={styles.membersPage} className={adminStyles.adminPage}>
                    <section>
                        <div className="section-row">
                            <div className="left-column">
                                <div className="section-style section-btn">
                                    <MembersCreate RefreshDataSet={this.GetMembers}/>
                                </div>
                                <Occupations />
                            </div>
                            <div className="right-column section-style">
                                <h2>Les Membres</h2>
                                <div styleName="membersContent">
                                    {this.DisplayMembers()}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>}
}

export default CSSModules(Members, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
