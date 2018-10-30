import React from 'react';

const pageFooter = {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '.85em',
    padding: '1.5vw',
    width: '100%',
}

const PageFooter = () =>
{
    return(
    <div style={pageFooter} className="text-primary">
        <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
        <span>Conception par <a href="">Samuel Dubé</a></span>
    </div>    
    )
}

export default PageFooter;