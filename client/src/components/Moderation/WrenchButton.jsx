import React, {useState} from 'react';
import './WrenchButton.less';


import { Button } from 'antd';

const Sidebar = ({uniqueKey, handleClose }) => {
  function Approve(){
    alert('The content has been approved! Unique Key = '+ uniqueKey);
    handleClose();
  }

  function Reject(){
    alert('The content has been rejected! Unique Key = '+ uniqueKey);
    handleClose();
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        
        <button onClick={Approve}>Approve</button>
        <button onClick={Reject}>Reject</button>
        <p>

        </p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default function WrenchButton({uniqueKey}) {
  const [showSidebar, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar(!showSidebar);
  };

  return (
    <span className="WrenchButton">
      <div className = "relative-container">
        <Button className={'wrench'} onClick={ toggleSidebar }> </Button>
        {showSidebar && (
          <div className="sidebar-wrapper">
            <Sidebar uniqueKey = {uniqueKey} handleClose={() => setSidebar(false)} />
          </div>
        )}
        </div>
    </span>
  );
}
