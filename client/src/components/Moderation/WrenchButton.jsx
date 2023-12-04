import React, {useState} from 'react';
import './WrenchButton.less';
//import './ActionButtons.jsx';
//import './ActionButtons.less';

//import { <-- Import database getter/setters necessary for button function

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
  //let [status, setStatus] = useState("Unclicked");
  //let [clicked, setClicked] = useState(false);

  /*function Wrench() {
    // Mark content as appropriate and remove any restrictions on it
    alert("The content has been approved! Unique key: " + uniqueKey);
    //can I have just one click, but the click makes the approve/reject buttons pop up?
    // Use setter from requests.js to update status column as approved
    // Remove hidden status from gallery, if hidden
  }*/
  /*  I don't know if I need an unwrench function, so we'll see.
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
