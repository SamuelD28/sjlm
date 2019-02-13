import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import style from './contact.module.css';

import ContactForm from '../../components/contactForm/contactForm.js';
import ContactInfo from '../../components/contactInfo/contactInfo.js';
import GoogleMapReact from 'google-map-react'
import PageFooter from '../../components/pageFooter/pageFooter.js';

/**
 * Component that display the page for the contact information
 */
class Contact extends Component{

    /**
     * Method that add the marker for the city inside the map
     */
    renderMarkers(map, maps) {
    new maps.Marker({
        position: {lat: 45.277068, lng: -73.417819},
        map,
        title: 'Hôtel de ville'
      });
    }

    render()
    {
        return  <div styleName="contactBody">
                    <div styleName="map">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: "AIzaSyDc2GOcungZQS8Cm2DzH2L3BllBqMy8nOk" }}
                            defaultCenter={ {lat: 45.277068, lng: -73.417819}}
                            onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                            defaultZoom={ 14 }>
                        </GoogleMapReact>
                    </div>
                    <div styleName="info">
                        <ContactInfo />
                    </div>
                    <div styleName="form">
                        <ContactForm />
                    </div>
                    <div styleName="footer">
                        <PageFooter />
                    </div>
                </div>
    }

}

export default CSSModules(Contact, style, {handleNotFoundStyleName: "log", allowMultiple: true});