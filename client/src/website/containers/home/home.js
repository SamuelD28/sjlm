//---------Declaration-------//
import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';

// Component Import
import BannerHome from '../../components/bannerHome/bannerHome.js';
import NewsColumn from '../../components/newsColumn/newsColumn.js'

//Basic style for the main div of this component
const homeStyle = {
    alignItems: "center",
    position: "relative",
    height: "-webkit-fill-available",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
};
//Need to extract this
const newsSectionStyle = {
    position: 'fixed',
    right: '0',
    width: '400px'
}

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillAppear() {
        console.log("Component  appeared");
    }

    render() {
        return <div style={homeStyle}>
                <BannerHome/>
                <div style={newsSectionStyle}>
                    <NewsColumn/>
                </div>
            </div>
    }
}

export default Home;
