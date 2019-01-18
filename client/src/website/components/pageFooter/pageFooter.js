import React from 'react';

const pageFooter = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '.85em',
    padding: '1.5vw',
    width: '100%',
}

const pageFooterBlock = {
    backgroundColor: 'whitesmoke',
    height: "5vw",
    display: 'flex',
    width: '75%',
}

const PageFooter = (props) => {
    return <div>
                {
                (props.template >= 1)
                ?<div style={pageFooterBlock}></div>
                :<span></span>
                }
                <div style={pageFooter} className="text-primary">
                    <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
                    <span>Conception par <a href="">Samuel Dubé</a></span>
                </div>
            </div>
}

export default PageFooter;
