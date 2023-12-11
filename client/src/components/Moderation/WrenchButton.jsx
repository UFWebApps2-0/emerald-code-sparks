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
  function UnWrench() {
    // Mark content as inappropriate and restrict it from being displayed publically
    alert("The content has been rejected! Unique key: " + uniqueKey);
    //setStatus("Unclicked");
    //setClicked(false);
    // Use setter from requests.js to update status column as rejected

    // Enabling hiding post from gallery if not already hidden
    
  }*/

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
