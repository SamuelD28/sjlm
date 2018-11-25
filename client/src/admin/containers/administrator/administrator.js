import React, {Component} from 'react';
import {Accordion} from 'semantic-ui-react';

// Css Module Import
import adminStyles from '../index.module.css';
import CSSModules from 'react-css-modules';
import styles from './administrator.module.css';

//Components
import UserCreate   from '../../components/userCreate/userCreate.js';
import UserUpdate   from '../../components/userUpdate/userUpdate.js';

class Administrator extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    render(){
    const { activeIndex } = this.state;
    return(
    <div className={adminStyles.adminPage}>
        <div styleName="admin">
            <section styleName="userSection">
                <h1>Gérer les Utilisateurs</h1>
                <Accordion fluid styled style={{margin: '1vw 0'}}>
                    <Accordion.Title active={activeIndex === 0}  index={0} onClick={this.handleClick}>
                          <i className="icon dropdown" ></i>
                          <h3 style={{display: 'inline'}}>Ajouter un Utilisateur</h3>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <UserCreate />
                    </Accordion.Content>
                </Accordion>
                <div styleName="sectionCard">
                    <UserUpdate user={this.props.user}/>
                </div>
            </section>
        </div>
    </div>
    )
    }
}

export default CSSModules(Administrator, styles, {allowMultiple: true, handleNotFoundStyleName: 'log'});