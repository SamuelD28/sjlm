import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import { NavLink } from 'react-router-dom';

import { Transition, Button, Icon} from 'semantic-ui-react';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

/**
 * Component used to display the 3 latest news
 * inside a column
 */
class NewsColumn extends Component {
    
    state = {}

    componentDidMount = async() => {
        let request = await Ajax.GetData("/api/news/latest");
        this.setState({ news: request.data});
    }
    
    render() {

        if (this.state.news !== undefined)
            return this.state.news.map((item, index) => (
                <Transition
                        key={item._id}
                        transitionOnMount={true}
                        duration={1000}
                        animation="fade left">
                    <div className="large-gutters news-column-card" key={index}>
                            <h3 style={{margin: "0"}}>
                                <i className="icon clock outline"></i>
                                Le {moment(item.DateFrom).format("dddd, Do MMMM")}
                            </h3>
                            <h1 style={{margin: "1.5vw 0"}}>{item.Title}</h1>
                            <NavLink to={`/news/${item._id}`} >
                                <Button basic>
                                    Lire la suite...
                                </Button>
                            </NavLink>
                    </div>
                </Transition>
            ))
        else
            return <span></span>
    }
}

export default NewsColumn;
