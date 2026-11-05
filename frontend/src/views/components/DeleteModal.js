import React from 'react';
import { Dialog } from 'primereact/dialog';

const DeleteModal = ({ isOpenDialog, modalFooter, hideModal, modalDescription }) => {
    return (
        <>
            <Dialog visible={isOpenDialog} style={{ width: '370px' }} header="Confirmation" modal footer={modalFooter} onHide={hideModal}>
                <div className="flex align-items-center justify-content-center mt-1">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>{modalDescription}</span>
                </div>
            </Dialog>
        </>
    );
};

export default DeleteModal;
