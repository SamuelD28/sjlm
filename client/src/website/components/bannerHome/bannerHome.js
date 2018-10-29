import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './bannerHome.module.css';

const BannerHome = () => 
{
    return (
    <div>
        <video styleName="bannerVideo" autoPlay muted loop>
            <source src="/sjlm.mp4" type="video/mp4">
            </source>
        </video>
        <div styleName='bannerContent'>
            <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
            <span styleName='bannerKeyword'>Accueillante</span>
            <form styleName='bannerSearch'>
                <input styleName='bannerInput' placeholder='Que recherchez-vous?' type='text' />
                <i className='icon search'></i>
            </form>
        </div>
    </div>
    )    
}

export default CSSModules(BannerHome, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});