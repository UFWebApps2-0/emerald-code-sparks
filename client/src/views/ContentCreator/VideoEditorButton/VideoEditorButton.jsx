import {Link} from "react-router-dom";

import "./VideoEditorButton.less"

export default function VideoEditorButton() {
  return (
    <div>
      <Link to="/videoedit">
        <button id="edit-video-btn">
          Edit Videos
        </button>
      </Link>
    </div>
  )
}
