import React from 'react';
import { Modal, Header } from 'semantic-ui-react';

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
            <button
                style={{float: "left"}}
                onClick={props.NegativeAction}
                className="btn btn-sm btn-outline-danger">
                <i className="icon remove"></i> Non
            </button>
            <button
                onClick={props.PositiveAction}
                className="btn btn-sm btn-outline-success">
                <i className="icon check"></i> Oui
            </button>
        </Modal.Actions>
    </Modal>
    )
}

export default ConfirmModal;
