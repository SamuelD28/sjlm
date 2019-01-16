import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './newsColumn.module.css';
import CSSModules from 'react-css-modules';
import { Transition } from 'semantic-ui-react';
import Ajax from '../../../shared/ajax.js';
import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class NewsColumn extends Component {
    state = { animationDelay: 100 }

    componentDidMount = async() => {
        let request = await Ajax.GetData("/api/news/latest");
        let itemsVisible = [];
        request.data.map(() => {
            return itemsVisible.push(false);
        });
        this.setState({ news: request.data, itemsVisible: itemsVisible });
    }

    StartNextAnimation = (index) => {
        if (index < this.state.itemsVisible.length) {
            setTimeout(() => {
                let temp = Array.from(this.state.itemsVisible);
                temp[index] = true;
                this.setState({ itemsVisible: temp })
            }, this.state.animationDelay);
        }
    }

    render() {

        if (this.state.news !== undefined)
            return this.state.news.reverse().map((item, index) => (
                <Transition
                        key={item._id}
                        transitionOnMount={true}
                        duration={1000}
                        animation="fade left">
                    <div styleName="newsCard" key={index}>
                            <span styleName="newsDate">
                                <i className="icon clock outline"></i>
                                Le {(item.DateFrom !== null)
                                ?moment(item.DateFrom).format("dddd, Do MMMM")
                                :moment(item.createdAt).format("dddd, Do MMMM")
                                }
                                </span>
                            <h1 styleName="newsTitle">{item.Title}</h1>
                            <NavLink to={`/news/${item._id}`} >
                                <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
                            </NavLink>
                    </div>
                </Transition>
            ))
    }
}

export default CSSModules(NewsColumn, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });

//  <Transition
//                     onComplete={() =>this.StartNextAnimation(index + 1 )}
//                     key={item._id}
//                     visible={this.state.itemsVisible[index]}
//                     duration={300}
//                     animation="fade left">
