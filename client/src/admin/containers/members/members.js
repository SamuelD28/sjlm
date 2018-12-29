import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './members.module.css';
import adminStyles from '../index.module.css';

// Component Import
import MembersEdit from '../../components/membersEdit/membersEdit.js';
import MembersCreate from '../../components/membersCreate/membersCreate.js';

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
        await this.setState({ members: request.data });
    }

    DisplayMembers() {
        if (this.state.members !== undefined) {
            return this.state.members.map((member, index) => (
                <MembersEdit
                    key={member._id}
                    member={member}
                    RefreshDataSet={this.GetMembers}
                    />
            ));
        }
    }

    render() {
        return (
            <div id={styles.membersPage} className={adminStyles.adminPage}>
        <section>
            <div styleName="membersContent">
                <MembersCreate
                    RefreshDataSet={this.GetMembers}
                    />
                {this.DisplayMembers()}
            </div>
        </section>
    </div>
        )
    }
}

export default CSSModules(Members, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
