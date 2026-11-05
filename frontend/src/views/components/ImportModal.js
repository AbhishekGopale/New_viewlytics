import { Dialog } from 'primereact/dialog'
import { FileUpload } from 'primereact/fileupload'
import React from 'react'

const ImportModal = ({ modalopen, hideModal, readExcel, sampleExcel }) => {
    return (
        <div className="p-dialog-header">
            <Dialog visible={modalopen} style={{ width: '50vw' }} header="Import Excel" modal className="p-fluid usercreation" onHide={hideModal}>
                <div md="12" sm="12" className="my-3">
                    <div className="mb-3 p-3" style={{ 'background-color': '#e0e0e0' }}>
                        <h6 style={{ color: 'red' }}>NOTE *</h6>

                        <p className="font-medium mb-5">Kindly download the sample excel file and import the excel data as per the excel file otherwise data will not import properly it might give you an error </p>
                    </div>
                    <div
                        style={{
                            marginBottom: '1rem'
                        }}
                    >
                        <strong>Download : </strong>
                        <a href={sampleExcel} style={{ textDecoration: 'underline' }}>
                            sample.xlsx
                        </a>
                    </div>
                    <FileUpload mode="basic" accept="file/*" name="demo[]" maxFileSize={1000000} label="Import" chooseLabel="Import Excel" className="m-2 inline-block" customUpload uploadHandler={readExcel} />

                </div>
            </Dialog>
        </div>
    )
}

export default ImportModal