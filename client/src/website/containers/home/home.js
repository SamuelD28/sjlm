//---------Declaration-------//
import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';
import {Form, Label, Grid, Input} from 'semantic-ui-react';

//Css Module import
import CSSModules from 'react-css-modules';
import styles from './home.module.css';

// Component Import
import NewsCard from '../../components/newsCard/newsCard.js';
import MembersCard from '../../components/membersCard/membersCard.js';

class Home extends Component{
    
    componentDidMount()
    {
        Utility.AdjustFullHeight(this.refs.websiteContent);
        Utility.AdjustFullHeight(this.refs.banner);
    }
    
    render(){
    return( 
        <div id={styles.websiteContent} ref="websiteContent">
            <div styleName='banner' ref="banner">
                <video styleName="bannerVideo" autoPlay muted loop>
                    <source src="/sjlm.mp4" type="video/mp4">
                    </source>
                </video>
                <div styleName='bannerContent'>
                    <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
                    <span styleName='bannerKeyword'>Accueillante</span>
                    <form styleName='bannerSearch'>
                        <input styleName='bannerInput' placeholder='Que recherchez-vous?' type='text' />
                        <button styleName="searchBtn"><i className='icon search'></i></button>
                    </form>
                </div>
            </div>
            <section styleName='news'>
                <div styleName='sectionTitle'>
                    <h1>Les Actualités</h1>
                </div>
                <div styleName='newsContent'>
                    <NewsCard />
                </div>
            </section>
            <section styleName="members">
                <div styleName='sectionTitle'>
                    <h1>Le Conseil</h1>
                </div>
                <div styleName="membersContent">
                    <MembersCard />
                </div>
            </section>
            <section styleName="contact">
                <Grid column={2}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <div styleName='sectionTitle'>
                                <h1>Nos Coordonnées</h1>
                            </div>
                            <div styleName="contactInfo">
                                <div>
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
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div styleName='sectionTitle'>
                                <h1>Nous Joindre</h1>
                            </div>
                            <Form styleName="contactForm">
                                <Form.Group>
                                    <Form.Field width={8}>
                                        <input type="text" placeholder="Nom"/>
                                    </Form.Field>
                                    <Form.Field width={8}>
                                        <input type="text" placeholder="Prénom"/>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field width={8}>
                                        <Input labelPosition='left' type='email' placeholder='Adresse Courriel'>
                                            <Label basic><i className="icon at"></i></Label>
                                            <input/>
                                        </Input>
                                    </Form.Field>
                                    <Form.Field width={8}>
                                        <Input labelPosition='left' type='tel' placeholder='Téléphone'>
                                            <Label basic><i className="icon phone"></i></Label>
                                            <input />
                                        </Input>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <select defaultValue="default">
                                        <option value="default">Sujet*</option>
                                        <option value="information">Demande d'information</option>
                                        <option value="comment">Commentaire et suggestion</option>
                                        <option value="maintenance">Entretiens des rues</option>
                                        <option value="sewer">Aqueduc et egout</option>
                                        <option value="complaint">Plainte</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <textarea placeholder="Description"></textarea>
                                </Form.Field>
                                <button className="btn btn-primary"><i className="icon send"></i> Envoyer</button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </section>
        </div>
        );
    }
}
export default CSSModules(Home, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});