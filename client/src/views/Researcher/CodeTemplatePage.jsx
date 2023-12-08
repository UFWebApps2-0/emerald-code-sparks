import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { Button, Input } from 'antd';
import BlocklyCanvasPanel from '../../components/ActivityPanels/BlocklyCanvasPanel/BlocklyCanvasPanel'; // Importing the BlocklyCanvasPanel
import './CodeTemplatePage.less';

const CodeTemplatePage = () => {
  return (
    <div className='container nav-padding'>
      <NavBar />
      <div className='main-content'>
        <h1>Code Template Generator</h1>
        <Input placeholder="Student Search" />
        <Button type="primary">Input your file</Button>
        <BlocklyCanvasPanel /> {/* Integrated BlocklyCanvasPanel */}
        <Button type="primary" size="large">Submit</Button>
      </div>
    </div>
  );
};

export default CodeTemplatePage;
