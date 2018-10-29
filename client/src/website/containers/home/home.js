//---------Declaration-------//
import React from 'react';

// Component Import
import BannerHome from '../../components/bannerHome/bannerHome.js';
import NewsColumn from '../../components/newsColumn/newsColumn.js'

//Basic style for the main div of this component
const style = {
    alignItems: "center",
    position: "relative",
    height: "-webkit-fill-available",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
};

const Home = (props) =>
{
    return( 
    <div style={style}>
        <BannerHome />
        <NewsColumn news={props.news}/>
    </div>
    );
}
export default Home;