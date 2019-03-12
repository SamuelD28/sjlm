import React from 'react';

import BannerHome from '../../components/bannerHome/bannerHome.js';
import NewsColumn from '../../components/newsColumn/newsColumn.js'

/**
 * Functionnal component used to display the home page.
 */
const Home = (props) =>{
    return <div className="home fill-height">
                <BannerHome history={props.history}/>
                <div className="home-latest">
                    <NewsColumn/>
                </div>
            </div>
}

export default Home;
