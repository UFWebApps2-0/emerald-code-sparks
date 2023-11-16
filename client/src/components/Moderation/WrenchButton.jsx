import React from 'react';
import './WrenchButton.less';
//import { <-- Import database getter/setters necessary for button function
//  createActivity,
//  deleteActivity,
//  getLessonModuleActivities,
//} from "../../Utils/requests";
import { Button } from 'antd';

export default function WrenchButton({uniqueKey}) {
  let [status, setStatus] = useState("Unclicked");
  let [clicked, setClicked] = useState(false);

    function HandleClick() {
        if (!clicked) {
          Wrench();
        } else if (clicked) {
          UnWrench();
        }
      }

  function Wrench() {
    // Mark content as appropriate and remove any restrictions on it
    alert("The content has been approved! Unique key: " + uniqueKey);
    
    // Use setter from requests.js to update status column as approved

    // Remove hidden status from gallery, if hidden

  }

  function UnWrench() {
    // Mark content as inappropriate and restrict it from being displayed publically
    alert("The content has been rejected! Unique key: " + uniqueKey);

    // Use setter from requests.js to update status column as rejected

    // Enabling hiding post from gallery if not already hidden
    
  }

  return (
    <span className="WrenchButton">
        <Button className={'click'} onClick={ HandleClick }> </Button>
    </span>
  );
}
