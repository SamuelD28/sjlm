import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import MembersCard from '../../components/membersCard/membersCard.js';
import PageHeader from '../../components/pageHeader/pageHeader.js';
import PageContent from '../../components/pageContent/pageContent.js';
import PageFooter from '../../components/pageFooter/pageFooter.js';

import CSSModules from 'react-css-modules';
import styles from './council.module.css';

class Council extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = async() => {
        let request = await Ajax.GetData("/api/members/");

        let council = [];

        request.data.map((member) => {
            let alias = member.Occupation.Title.toLowerCase();
            if (alias === "mairesse" ||
                alias === "maire" ||
                alias === "conseiller municipal" ||
                alias === "conseillère municipale")
                return council.push(member);
            else
                return null;
        });

        this.setState({ members: council });
    }

    DisplayMembers = () => {
        if (this.state.members !== undefined)
            return this.state.members.map((member, index) => (
                <MembersCard
                index={index}
                key={member._id}
                member={member}
                />
            ));
    }

    render() {
        return <div styleName="membersBody">
                    <div styleName="membersBanner" style={{backgroundImage: `url('https://res.cloudinary.com/dohwohspb/image/upload/v1546923475/images/members/Bandeau_Conseil.jpg')`}}>
                    </div>
                    <div styleName="membersTop">
                        <PageHeader title="Conseil municipal" category="Administration" />
                        <PageContent
                            content={"Le conseil municipal représente la population et prend les décisions sur les orientations et les priorités d’action de la municipalité. Il doit s’assurer que les services offerts dans la municipalité répondent aux besoins de la communauté. " +
                            "La séance du conseil municipal est par excellence un exercice de démocratie municipale. Les élus prennent les décisions sous la forme de résolutions ou de règlements qu’ils adoptent lors d’une telle séance." +
                            "Le conseil assume les pouvoirs et les devoirs dévolus par les principales lois, soit la Loi sur les cités et ville ou pour nous le Code municipal du Québec, de même que par certaines lois connexes. De plus, le Code civil du Québec fait en sorte que les élus doivent respecter les obligations que les lois, leur charte ou les règlements leur imposent. Ils doivent agir dans les limites des pouvoirs qui leur sont conférés. Ils doivent également agir avec prudence et diligence, honnêteté et intégrité."+
                            "Le conseil de la municipalité est composé de la mairesse et de six conseillers; trois femmes et trois hommes. La mairesse a un poste de premier dirigeant. Elle préside les séances du conseil municipal et travaille collectivement avec les autres membres du conseil. Elle supervise l’application des règlements et des résolutions et communique toute information jugée d’intérêt public. Elle représente l’ensemble de la population de la municipalité et représente la municipalité au conseil de la MRC."+
                            "Les conseillers assistent aux séances du conseil et font valoir l’intérêt de la communauté. Le conseiller participe à la prise de décision lors des séances du conseil et a l’obligation de voter. En dehors des séances du conseil, il n’a pas le pouvoir de prendre des décisions au nom de la municipalité."+
                            "Les séances ordinaires du conseil municipal se tiennent le deuxième mardi de chaque mois. Elles ont lieu au centre communautaire 119 rue Renaud. Le début de la séance est à 19h."
                            }
                        />
                    </div>
                    <div styleName="membersGrid">
                        {this.DisplayMembers()}
                    </div>
                    <PageFooter />
                </div>
    }
}

export default CSSModules(Council, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
