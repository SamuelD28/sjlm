import React from 'react';
import { Transition } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const pageSocialStyle = {
    background: 'white',
    padding: '1vw 0',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '1.5vw'
}

const pageSocialBtnStyle = {
    boxSizing: 'border-box',
    margin: '1vw 0',
    textAlign: 'center',
    fontSize: '1.5em'
}

const SocialIconColumn = () => {
    return <Transition
                animation="fade right"
                duration={1000}
                transitionOnMount={true}>
                <div >
                <div style={pageSocialStyle}>
                    <a href="https://www.facebook.com/pages/Saint-Jacques-le-Mineur/109329122419446">
                        <button className="btn btn-md btn-outline-info" style={pageSocialBtnStyle}><i className="icon facebook f"></i></button>
                    </a>
                    <a href="mailto:info@sjlm.ca">
                        <button className="btn btn-md btn-outline-info" style={pageSocialBtnStyle}><i className="icon mail"></i></button>
                    </a>
                    <NavLink to="/contact">
                        <button className="btn btn-md btn-outline-info" style={pageSocialBtnStyle}><i className="icon phone"></i></button>
                    </NavLink>
                </div>
                </div>
            </Transition>
}

export default SocialIconColumn;
