//---------Declaration-------//
import React from 'react';

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

const newsSectionStyle=
{
    background: 'whitesmoke',
    position: 'fixed',
    right:'0',
    width: '400px'
}

const Home = (props) =>
{
    return( 
    <div style={homeStyle}>
        <BannerHome />
        <div style={newsSectionStyle}>
            <NewsColumn news={props.news}/>
        </div>
    </div>
    );
}
export default Home;