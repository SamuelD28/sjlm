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

const DisplaySpacer = (props) => {

    if (props.template >= 1)
        return <div style={pageFooterBlock}></div>
}

const PageFooter = (props) => {
    return <div>
                <div style={pageFooter} className="text-primary">
                {DisplaySpacer(props)}
                    <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
                    <span>Conception par <a href="">Samuel Dubé</a></span>
                </div>
            </div>
}

export default PageFooter;
