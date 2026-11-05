import { Dialog } from 'primereact/dialog'
import { Image } from 'primereact/image'
import React from 'react'

const ViewImageModal = ({ modalopen, hideModal, image }) => {
    return (
        <Dialog visible={modalopen} style={{ width: '50vw' }} header="View Image" modal onHide={hideModal}>
            <div className="flex align-items-center justify-content-center m-5">
                <Image src={image} alt="image" width="400px" height="400px" className="shadow-4" />

            </div>
        </Dialog>
    )
}

export default ViewImageModal