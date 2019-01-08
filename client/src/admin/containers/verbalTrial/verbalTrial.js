//Initial Declaration and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

//Css Module
import CSSModules from 'react-css-modules';
import styles from './verbalTrial.module.css';
import adminStyles from '../index.module.css';

import VerbalCreate from '../../components/verbalCreate/verbalCreate.js';
import VerbalCard   from '../../components/verbalCard/verbalCard.js';

class VerbalTrial extends Component {

    constructor(props)
    {
        super(props);
        this.state = {};
    }

    componentDidMount()
    {
        this.GetVerbal();
    }

    GetVerbal = async() =>
    {
        let request = await Ajax.GetData("/api/verbal/");
        this.setState({verbals  : request.data});
    }

    DisplayVerbal = () =>
    {
        if(this.state.verbals !== undefined)
            return this.state.verbals.map((verbal, index) =>(
                <VerbalCard verbal={verbal} RefreshDataSet={this.GetVerbal}/>
            ));
    }

    render() {
        return (
        <div className={adminStyles.adminPage}>
            <section className="section-row">
                <div className="left-column">
                    <div styleName="verbalCreate">
                        <VerbalCreate RefreshDataSet={this.GetVerbal}/>
                    </div>
                </div>
                <div className="right-column section-style">
                    <h2>Les Procès-Verbaux</h2>
                    <div styleName="pagesContainer">
                        {this.DisplayVerbal()}
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default CSSModules(VerbalTrial, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
