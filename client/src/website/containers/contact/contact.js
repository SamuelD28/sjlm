import React, {Component} from 'react';
import Ajax from '../../../shared/ajax.js';

import ContactForm from '../../components/contactForm/contactForm.js';
import ContactInfo from '../../components/contactInfo/contactInfo.js';

class Contact extends Component{

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <ContactInfo />
    }

}

export default Contact;