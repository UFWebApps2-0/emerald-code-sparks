import React from 'react';
import './WrenchButton.less';
//import { <-- Import database getter/setters necessary for button function
//  deleteActivity
import { Button } from 'antd';

export default function WrenchButton({uniqueKey}) {
  //let [status, setStatus] = useState("Unclicked");
  //let [clicked, setClicked] = useState(false);

  function Wrench() {
    // Mark content as appropriate and remove any restrictions on it
    alert("The content has been approved! Unique key: " + uniqueKey);
    //setStatus("Clicked");
    //setClicked(true);
    // Use setter from requests.js to update status column as approved

    // Remove hidden status from gallery, if hidden

  }

  function UnWrench() {
    // Mark content as inappropriate and restrict it from being displayed publically
    alert("The content has been rejected! Unique key: " + uniqueKey);
    //setStatus("Unclicked");
    //setClicked(false);
    // Use setter from requests.js to update status column as rejected

    // Enabling hiding post from gallery if not already hidden
    
  }

  return (
    <span className="WrenchButton">
        <Button className={'wrench'} onClick={ Wrench }>a</Button>
    </span>
  );
}
