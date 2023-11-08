// CodePopup.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../ActivityLevels.less';

Modal.setAppElement('#root'); // Set the root element for accessibility

const CodePopup = ({ isOpen, onClose, onSubmit }) => {
    const [code, setCode] = useState('void foo(){\n\t// Write Here\n\t\n} foo();');

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(code);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <button className="close-button" onClick={onClose}>X</button>
            <h2 className="center-text">Enter Your Code</h2>
            <textarea className="code-textarea textarea-style" value={code}
                      onChange={handleInputChange} placeholder="Write Code here"
            />
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </Modal>
    );
};

export default CodePopup;
