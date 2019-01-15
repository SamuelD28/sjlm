import React from 'react';

import CSSModules from 'react-css-modules';
import style from './contactInfo.module.css';
import PageHeader from '../pageHeader/pageHeader.js';


const ContactInfo = (props) =>
{
    return(
    <div style={{padding: "2vw"}}>
        <PageHeader title="Coordonnées" category="Contact"/>
        <div style={{marginTop: "2vw"}}>
            <h2>Hôtel de Ville</h2>
            <p>91 Rue Principale, <br />
            Saint-Jacques-le-Mineur, <br />
            QC J0J 1Z0 <br />
            tél: (450) 347-5446
            </p>
        </div>
        <div>
            <h2>Horaire Régulier</h2>
            <p>91 Rue Principale, <br />
            Saint-Jacques-le-Mineur, <br />
            QC J0J 1Z0 <br />
            tél: (450) 347-5446
            </p>
        </div>
        <div>
            <h2>Horaire de Saison (du 7 mai au 7 octobre)</h2>
            <p>Du Lundi au Jeudi, 8h à 16h00. <br />
            Le Vendredi, 8h à 14h.
            </p>
        </div>
    </div>
    )
}

export default CSSModules(ContactInfo, style,{handleNotFoundStyleName: "log", allowMultiple: true});