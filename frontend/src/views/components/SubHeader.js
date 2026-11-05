import React from 'react';

const SubHeader = ({ headerName }) => {
    return (
        <div className="col-12">
            <div className="projectlist-card mb-1 flex justify-content-between">
                <h5 className="flex justify-content-center align-items-center mb-0 title">{headerName}</h5>
            </div>
        </div>
    );
};

export default SubHeader;
