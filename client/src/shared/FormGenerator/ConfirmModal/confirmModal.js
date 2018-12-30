import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

/**
 * Component for creating a confirm dialog when
 * requesting the suppresion of a data set
 */
const ConfirmModal = (props) => {
    return (
        <Modal
        open={props.open}
        size='mini'
        trigger={props.trigger()}>
        <Header icon='trash alternate outline' content='Supprimer le Contenu' />
        <Modal.Content>
            <p>Êtes-vous sûr de vouloir supprimer le contenu suivant?</p>
        </Modal.Content>
        <Modal.Actions>
            <Button
                style={{float: "left"}}
                onClick={props.NegativeAction}
                color="red"
                inverted
                >
                <i className="icon remove"></i> Non
            </Button>
            <Button
                onClick={props.PositiveAction}
                color="blue"
                inverted
                >
                <i className="icon check"></i> Oui
            </Button>
        </Modal.Actions>
    </Modal>
    )
}

export default ConfirmModal;
