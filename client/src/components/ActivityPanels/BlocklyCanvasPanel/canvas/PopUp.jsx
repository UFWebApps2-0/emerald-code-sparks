// CodePopup.js
import React, { useState } from 'react';
//import Modal from 'react-modal';
import '../../ActivityLevels.less';

 // Set the root element for accessibility
// This is code for the Pop-up that allows you to write code into
const CodePopup = ({ isOpen, onClose, onSubmit }) => {
    const [code, setCode] = useState('void custom(){\n\t// Write Here\n\t\n} custom();');

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = () => {
        let codeWithoutLeftStrip = code.replace(/^void custom\(\)\{/, '');
        let finalCode = codeWithoutLeftStrip.replace(/}\s*custom\(\);$/, '');
        onSubmit(finalCode);
        onClose();
    };

    return (
        <div isOpen={isOpen} onRequestClose={onClose}>
            <button className="close-button" onClick={onClose}>X</button>
            <h2 className="center-text">Enter Your Code</h2>
            <textarea className="code-textarea textarea-style" value={code}
                      onChange={handleInputChange} placeholder="Write Code here"
            />
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CodePopup;
