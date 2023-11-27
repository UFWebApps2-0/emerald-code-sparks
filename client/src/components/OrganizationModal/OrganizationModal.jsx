import React, { useState } from 'react';
import "./OrganizationModal.less"

const OrganizationModal = ({ isOpen, closeModal, submitOrg }) => {
    const [orgTitle, setOrgTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if(orgTitle){
            submitOrg(orgTitle);
            setOrgTitle('');
            closeModal();
        }
    }

    if (!isOpen){
        return null;
    }

    return (
        <div className={"modal"}>
            <div className={"modal-content"}>
                <span className="close-button" onClick={closeModal}>x</span>
                <h2>Organization Creation Form</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={orgTitle} placeholder={"Please Enter Organization Name"} onChange={(e) => setOrgTitle(e.target.value)} />
                    <input type="submit" onClick={handleSubmit}></input>
                </form>
            </div>
        </div>
    );
};

export default OrganizationModal;