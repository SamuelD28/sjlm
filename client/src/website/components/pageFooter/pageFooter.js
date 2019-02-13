import React from 'react';

/**
 * Method that display a spacer based on the template used.
 */
const DisplaySpacer = (props) => {

    if (props.template >= 1)
        return <div className="page-footer-block"></div>
}

/**
 * Functionnal component used to display the page footer.
 */
const PageFooter = (props) => {
    return <div>
                {DisplaySpacer(props)}
                <div className="page-footer">
                    <span><i className="copyright outline icon"></i>2018 Saint-Jacques-le-Mineur. Tous droits réservés</span>
                    <span>Conception par <a href="">Samuel Dubé</a></span>
                </div>
            </div>
}

export default PageFooter;
