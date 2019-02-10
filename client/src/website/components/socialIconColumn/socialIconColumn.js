import React from 'react';
import { Transition, Button} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const pageSocialStyle = {
    background: 'white',
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
                        <Button color="blue" style={pageSocialBtnStyle}><i style={{margin: "0"}} className="icon facebook f"></i></Button>
                    </a>
                    <a href="mailto:info@sjlm.ca">
                        <Button color="blue" style={pageSocialBtnStyle}><i style={{margin: "0"}} className="icon mail"></i></Button>
                    </a>
                    <NavLink to="/contact">
                        <Button color="blue" style={pageSocialBtnStyle}><i style={{margin: "0"}} className="icon phone"></i></Button>
                    </NavLink>
                </div>
                </div>
            </Transition>
}

export default SocialIconColumn;
