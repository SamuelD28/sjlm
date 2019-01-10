import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './bannerHome.module.css';
import { Transition } from 'semantic-ui-react';

const BannerHome = () => {
    return <div>
                <video styleName="bannerVideo" autoPlay muted loop>
                    <source src="/sjlm.mp4" type="video/mp4">
                    </source>
                </video>
                <Transition
                    transitionOnMount={true}
                    animation="fade up"
                    duration={1000}
                    >
                    <div>
                        <div styleName="bannerContent">
                            <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
                            <span styleName='bannerKeyword'>Accueillante</span>
                            <form styleName='bannerSearch'>
                                <input styleName='bannerInput' placeholder='Que recherchez-vous?' type='text' />
                                <i className='icon search'></i>
                            </form>
                        </div>
                    </div>
                </Transition>
            </div>
}

export default CSSModules(BannerHome, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
