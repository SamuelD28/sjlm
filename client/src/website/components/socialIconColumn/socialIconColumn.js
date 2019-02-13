import React from 'react';
import { Transition, Button} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/**
 * Functionnal component used to display the social icons
 */
const SocialIconColumn = () => {
    return <Transition
                animation="fade right"
                duration={1000}
                transitionOnMount={true}>
                <div >
                    <div className="page-social-column">
                        <a href="https://www.facebook.com/pages/Saint-Jacques-le-Mineur/109329122419446">
                            <Button color="blue">
                                <i style={{margin: "0"}} className="icon facebook f"></i>
                            </Button>
                        </a>
                        <a href="mailto:info@sjlm.ca">
                            <Button color="blue">
                                <i style={{margin: "0"}} className="icon mail"></i>
                            </Button>
                        </a>
                        <NavLink to="/contact">
                            <Button color="blue">
                                <i style={{margin: "0"}} className="icon phone"></i>
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </Transition>
}

export default SocialIconColumn;
