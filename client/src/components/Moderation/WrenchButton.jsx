import React, {useState} from 'react';
import './WrenchButton.less';
//import { <-- Import database getter/setters necessary for button function
//  deleteActivity
import { Button } from 'antd';

const Sidebar = ({ handleClose }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <p>Approve or deny post</p>
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
        <Button className={'wrench'} onClick={ toggleSidebar }> </Button>
        {showSidebar && <Sidebar handleClose={toggleSidebar} />}
    </span>
  );
}
